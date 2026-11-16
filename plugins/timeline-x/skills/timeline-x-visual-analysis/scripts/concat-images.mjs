#!/usr/bin/env node

import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { captionLayout } from "./caption-layout.mjs";

const parsed = parseArgs(process.argv.slice(2));
const outputPath = resolve(parsed.output);
const outputExtension = extname(outputPath).toLowerCase();

if (![".jpg", ".jpeg", ".png", ".webp"].includes(outputExtension)) {
  fail("--output must end in .jpg, .jpeg, .png, or .webp");
}
if (parsed.inputs.length === 0 || parsed.inputs.length > 25) {
  fail("Pass between 1 and 25 input images");
}
if (parsed.captions.length && parsed.captions.length !== parsed.inputs.length) {
  fail("Pass exactly one --caption per input image, or omit captions entirely");
}

const inputs = parsed.inputs.map((input) => resolve(input));
for (const input of inputs) {
  if (!existsSync(input)) fail(`Input image does not exist: ${input}`);
  if (input === outputPath) fail("--output must not overwrite an input image");
}
if (parsed.fontFile && (!existsSync(parsed.fontFile) || !statSync(parsed.fontFile).isFile())) {
  fail("--font-file must name an existing local font file");
}
if (parsed.captions.some((caption) => Buffer.byteLength(caption, "utf8") > 4096)) {
  fail("Each --caption must be at most 4096 UTF-8 bytes");
}

const captions = parsed.captions.length
  ? parsed.captions
  : inputs.map((input) => basename(input));
const columns = parsed.columns ?? Math.ceil(Math.sqrt(inputs.length));
const fontSize = parsed.fontSize ?? Math.max(12, Math.min(28, Math.round(parsed.tileWidth * 0.035)));
if (fontSize * 2 > parsed.tileWidth - 24) {
  fail("--font-size is too large for --tile-width");
}
const fontFile = parsed.fontFile ? resolve(parsed.fontFile) : resolveSystemFont();
const captionDisplay = captionLayout(captions, parsed.tileWidth, fontSize);
const displayLabels = captionDisplay.labels.map((label) => label.text);
const backend = resolveBackend();
mkdirSync(dirname(outputPath), { recursive: true });
const temporaryDirectory = mkdtempSync(join(dirname(outputPath), ".concat-images-"));

try {
  if (backend.kind === "imagemagick") {
    composeWithImageMagick(backend, inputs, displayLabels, outputPath, temporaryDirectory);
  } else {
    composeWithFfmpeg(backend.command, inputs, displayLabels, outputPath, temporaryDirectory);
  }

  process.stdout.write(`${JSON.stringify({
    backend: backend.kind,
    columns,
    crop: parsed.crop ?? null,
    fontFile,
    fontSize,
    inputs: inputs.map((input, index) => ({
      caption: captions[index],
      displayedCaption: displayLabels[index],
      captionTruncated: captionDisplay.labels[index].truncated,
      path: input,
    })),
    outputPath,
    rows: Math.ceil(inputs.length / columns),
  }, null, 2)}\n`);
} finally {
  rmSync(temporaryDirectory, { force: true, recursive: true });
}

function composeWithImageMagick(backend, sourceImages, labels, target, scratch) {
  const prepared = sourceImages.map((input, index) => {
    const preparedPath = join(scratch, `${index}.png`);
    const args = backend.prefix.concat([
      input,
      ...(parsed.crop ? ["-crop", parsed.crop, "+repage"] : []),
      "-auto-orient",
      "-resize",
      `${parsed.tileWidth}x${parsed.tileWidth}>`,
      preparedPath,
    ]);
    run(backend.command, args, `prepare ${input}`);
    return preparedPath;
  });

  const montageArgs = backend.montagePrefix.concat([
    ...(fontFile ? ["-font", fontFile] : []),
    ...prepared.flatMap((input, index) => ["-label", labels[index].replaceAll("%", "%%"), input]),
    "-tile",
    `${columns}x`,
    "-geometry",
    `+${parsed.gap}+${parsed.gap}`,
    "-background",
    "#111111",
    "-fill",
    "#ffffff",
    "-stroke",
    "none",
    "-pointsize",
    String(fontSize),
    target,
  ]);
  const executable = backend.command === "convert" ? "montage" : backend.command;
  run(executable, montageArgs, "compose contact sheet");
}

function composeWithFfmpeg(ffmpeg, sourceImages, labels, target, scratch) {
  const captionHeight = captionDisplay.captionHeight;
  const tileHeight = parsed.tileWidth + captionHeight;
  const inputArgs = sourceImages.flatMap((input) => ["-i", input]);
  const filters = sourceImages.map((_, index) => {
    const labelPath = join(scratch, `caption-${index}.txt`);
    writeFileSync(labelPath, labels[index], "utf8");
    const crop = parsed.crop ? `${ffmpegCrop(parsed.crop)},` : "";
    return [
      `[${index}:v]${crop}`,
      `scale=${parsed.tileWidth}:${parsed.tileWidth}:force_original_aspect_ratio=decrease,`,
      `pad=${parsed.tileWidth}:${parsed.tileWidth}:(ow-iw)/2:(oh-ih)/2:color=0x111111,`,
      `pad=${parsed.tileWidth}:${tileHeight}:0:0:color=0x111111,`,
      `drawtext=textfile='${escapeFilterPath(labelPath)}':fontcolor=white:fontsize=${fontSize}:`,
      ...(fontFile ? [`fontfile='${escapeFilterPath(fontFile)}':`] : []),
      `expansion=none:line_spacing=${Math.round(fontSize * 0.25)}:`,
      `x=(w-text_w)/2:y=${parsed.tileWidth}+(${captionHeight}-text_h)/2`,
      `[tile${index}]`,
    ].join("");
  });

  const stackInputs = sourceImages.map((_, index) => `[tile${index}]`).join("");
  if (sourceImages.length === 1) {
    filters.push(`${stackInputs}null[stacked]`);
  } else {
    const layout = sourceImages.map((_, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);
      return `${column * (parsed.tileWidth + parsed.gap)}_${row * (tileHeight + parsed.gap)}`;
    }).join("|");
    filters.push(`${stackInputs}xstack=inputs=${sourceImages.length}:layout=${layout}:fill=0x111111[stacked]`);
  }

  const outputArgs = outputExtension === ".jpg" || outputExtension === ".jpeg"
    ? ["-q:v", "2"]
    : [];
  run(ffmpeg, [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    ...inputArgs,
    "-filter_complex",
    filters.join(";"),
    "-map",
    "[stacked]",
    "-frames:v",
    "1",
    ...outputArgs,
    target,
  ], "compose contact sheet with ffmpeg");
}

function ffmpegCrop(value) {
  const match = /^(\d+)x(\d+)\+(\d+)\+(\d+)$/.exec(value);
  if (!match) fail("--crop must use WIDTHxHEIGHT+X+Y pixel geometry");
  return `crop=${match[1]}:${match[2]}:${match[3]}:${match[4]}`;
}

function escapeFilterPath(value) {
  return value
    .replaceAll("\\", "/")
    .replaceAll(":", "\\:")
    .replaceAll("'", "\\'")
    .replaceAll(",", "\\,");
}

function parseArgs(args) {
  const result = {
    captions: [],
    columns: undefined,
    crop: undefined,
    fontFile: undefined,
    fontSize: undefined,
    gap: 16,
    inputs: [],
    output: undefined,
    tileWidth: 720,
  };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--caption") result.captions.push(requiredValue(args, ++index, arg));
    else if (arg === "--columns") {
      result.columns = boundedInteger(requiredValue(args, ++index, arg), arg, 1, 9);
    } else if (arg === "--crop") result.crop = requiredValue(args, ++index, arg);
    else if (arg === "--font-file") result.fontFile = requiredValue(args, ++index, arg);
    else if (arg === "--font-size") {
      result.fontSize = boundedInteger(requiredValue(args, ++index, arg), arg, 10, 72);
    } else if (arg === "--gap") {
      result.gap = boundedInteger(requiredValue(args, ++index, arg), arg, 0, 100);
    } else if (arg === "--output") result.output = requiredValue(args, ++index, arg);
    else if (arg === "--tile-width") {
      result.tileWidth = boundedInteger(requiredValue(args, ++index, arg), arg, 100, 2000);
    } else if (arg === "--help" || arg === "-h") usage(0);
    else if (arg.startsWith("-")) fail(`Unknown option: ${arg}`);
    else result.inputs.push(arg);
  }
  if (!result.output) fail("--output is required");
  if (result.crop && !/^\d+x\d+\+\d+\+\d+$/.test(result.crop)) {
    fail("--crop must use WIDTHxHEIGHT+X+Y pixel geometry");
  }
  return result;
}

function resolveBackend() {
  if (commandExists("magick")) {
    return { kind: "imagemagick", command: "magick", montagePrefix: ["montage"], prefix: [] };
  }
  if (commandExists("convert") && commandExists("montage")) {
    return { kind: "imagemagick", command: "convert", montagePrefix: [], prefix: [] };
  }
  const ffmpeg = resolveFfmpeg();
  if (ffmpeg) return { kind: "ffmpeg", command: ffmpeg };
  fail("No image compositor is available; install ImageMagick or set TIMELINE_X_FFMPEG_PATH to Timeline X Studio's ffmpeg binary");
}

function resolveFfmpeg() {
  const explicit = process.env.TIMELINE_X_FFMPEG_PATH;
  if (explicit && existsSync(explicit)) return explicit;
  if (commandExists("ffmpeg")) return "ffmpeg";

  const executable = process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg";
  const platformFolder = process.platform === "win32"
    ? "win"
    : process.platform === "darwin" ? "mac" : "linux";
  const candidates = [];
  let ancestor = dirname(fileURLToPath(import.meta.url));
  for (let depth = 0; depth < 9; depth += 1) {
    candidates.push(join(ancestor, "apps", "desktop", "resources", "ffmpeg", platformFolder, executable));
    candidates.push(join(ancestor, "resources", "ffmpeg", executable));
    const parent = dirname(ancestor);
    if (parent === ancestor) break;
    ancestor = parent;
  }

  if (process.platform === "darwin") {
    candidates.push("/Applications/TimelineX.app/Contents/Resources/ffmpeg/ffmpeg");
    candidates.push("/Applications/Timeline X Studio.app/Contents/Resources/ffmpeg/ffmpeg");
  } else if (process.platform === "win32" && process.env.LOCALAPPDATA) {
    candidates.push(join(process.env.LOCALAPPDATA, "Programs", "Timeline X Studio", "resources", "ffmpeg", "ffmpeg.exe"));
    candidates.push(join(process.env.LOCALAPPDATA, "Programs", "TimelineX", "resources", "ffmpeg", "ffmpeg.exe"));
  } else if (process.platform === "linux") {
    if (process.env.APPDIR) candidates.push(join(process.env.APPDIR, "resources", "ffmpeg", "ffmpeg"));
    candidates.push("/opt/Timeline X Studio/resources/ffmpeg/ffmpeg");
    candidates.push("/opt/TimelineX/resources/ffmpeg/ffmpeg");
  }
  return candidates.find((candidate) => existsSync(candidate));
}

function resolveSystemFont() {
  const candidates = [
    "/System/Library/Fonts/Menlo.ttc",
    "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
    "/usr/share/fonts/truetype/liberation2/LiberationMono-Regular.ttf",
    ...(process.platform === "win32" && process.env.WINDIR
      ? [join(process.env.WINDIR, "Fonts", "consola.ttf")]
      : []),
  ];
  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}

function commandExists(command) {
  return spawnSync("sh", ["-c", `command -v ${command}`], { stdio: "ignore" }).status === 0;
}

function run(command, args, step) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.status !== 0) {
    fail(`${step} failed: ${(result.stderr || result.stdout || "unknown error").trim()}`);
  }
}

function requiredValue(args, index, option) {
  const value = args[index];
  if (!value) fail(`${option} requires a value`);
  return value;
}

function boundedInteger(value, option, minimum, maximum) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < minimum || number > maximum) {
    fail(`${option} must be an integer from ${minimum} to ${maximum}`);
  }
  return number;
}

function fail(message) {
  process.stderr.write(`concat-images: ${message}\n`);
  process.exit(1);
}

function usage(exitCode) {
  process.stdout.write(
    "Usage: concat-images.mjs --output <image> [--columns N] [--crop WxH+X+Y] [--font-file path] [--font-size N] [--caption text ...] <images...>\n",
  );
  process.exit(exitCode);
}
