// Conservative display wrapping; original evidence labels stay in the receipt.
const graphemes = new Intl.Segmenter(undefined, { granularity: "grapheme" });
const wide = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Emoji_Presentation}]/u;
const split = (value) => Array.from(graphemes.segment(value), (part) => part.segment);
const width = (value) => split(value).reduce((sum, glyph) => sum + (wide.test(glyph) ? 2 : 1), 0);

export function captionLayout(captions, tileWidth, fontSize) {
  const maxUnits = Math.max(2, Math.floor((tileWidth - 24) / (fontSize * 0.8)));
  const labels = captions.map((caption) => wrapCaption(caption, maxUnits));
  const lineCount = Math.max(1, ...labels.map((label) => label.text.split("\n").length));
  return { labels, captionHeight: Math.ceil(lineCount * fontSize * 1.5) + 24 };
}

export function wrapCaption(caption, maxUnits, maxLines = 3) {
  if (!Number.isInteger(maxUnits) || maxUnits < 2 || !Number.isInteger(maxLines) || maxLines < 1) {
    throw new Error("Caption width and line count must be positive bounded integers");
  }
  const words = caption.replace(/\p{Cc}/gu, " ").trim().split(/\s+/u).filter(Boolean);
  const lines = [];
  let current = "";
  for (const word of words) {
    if (current && width(`${current} ${word}`) <= maxUnits) {
      current += ` ${word}`;
      continue;
    }
    if (current) { lines.push(current); current = ""; }
    for (const glyph of split(word)) {
      if (current && width(current + glyph) > maxUnits) {
        lines.push(current);
        current = "";
      }
      current += glyph;
    }
  }
  if (current) lines.push(current);
  const truncated = lines.length > maxLines;
  if (truncated) {
    lines.length = maxLines;
    const tail = split(lines[maxLines - 1]);
    while (tail.length && width(tail.join("") + "…") > maxUnits) tail.pop();
    lines[maxLines - 1] = `${tail.join("").trimEnd()}…`;
  }
  return { text: lines.join("\n"), truncated };
}
