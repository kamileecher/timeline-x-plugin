# Third-party notices

## Manifold 3D 3.5.3 (boolean solver)

Source: https://github.com/elalish/manifold and npm/manifold-3d@3.5.3.
Copyright the Manifold contributors. Apache License 2.0:
https://www.apache.org/licenses/LICENSE-2.0.
Bundled as WASM for mesh boolean union, difference and intersection in the 3D Studio mesh editor.

## three-gpu-pathtracer 0.0.28 and three-mesh-bvh 0.9.18

Source: https://github.com/gkjohnson/three-gpu-pathtracer and
https://github.com/gkjohnson/three-mesh-bvh; npm/three-gpu-pathtracer@0.0.28
and npm/three-mesh-bvh@0.9.18, exact npm lock/integrity retained.
Copyright (c) 2021 Garrett Johnson (three-gpu-pathtracer) and Copyright (c)
2018 Garrett Johnson (three-mesh-bvh). MIT License: permission is hereby
granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions: the above copyright notice and this
permission notice shall be included in all copies or substantial portions of
the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
Bundled as JavaScript and shader source for the explicitly requested
path-traced final render lane of the 3D Studio (ADR 0132).

## meshoptimizer 1.1.1 and glTF-Transform 4.5.1

Source: https://github.com/zeux/meshoptimizer and npm/meshoptimizer@1.1.1;
https://github.com/donmccurdy/glTF-Transform and npm/@gltf-transform/core@4.5.1,
npm/@gltf-transform/extensions@4.5.1 (with property-graph 4.1.0 and ktx-parse
1.1.0); exact npm lock/integrity retained. Copyright (C) 2016-2026 Arseny
Kapoulkine (meshoptimizer) and Copyright (c) Don McCurdy (glTF-Transform,
property-graph, ktx-parse). MIT License: permission is hereby granted, free of
charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the
following conditions: the above copyright notice and this permission notice
shall be included in all copies or substantial portions of the Software. THE
SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
Bundled as JavaScript and embedded WASM in the main process for local polygon
reduction of 3D Studio model assets (ADR 0144).

## lottie-web 5.12.2 (light player build)

Source: https://github.com/airbnb/lottie-web and npm/lottie-web@5.12.2, exact
npm lock/integrity retained. Copyright (c) 2015 Bodymovin. MIT License: the
permission notice quoted for meshoptimizer and glTF-Transform above applies
with this copyright line; the package's own LICENSE.md ships beside the file.
Only the unmodified `build/player/lottie_light.min.js` is packaged (into
`motifs/lottie`) and loaded into offline Motion Graphic capture pages to draw
Lottie animations users import (ADR 0201). The light build has no After
Effects expression engine. Animation files are not distributed with the app.

## pngjs 7.0.0

Source: https://github.com/pngjs/pngjs and npm/pngjs@7.0.0, exact npm
lock/integrity retained. pngjs original work Copyright (c) 2015 Luke Page &
Original Contributors; pngjs derived work Copyright (c) 2012 Kuba Niegowski.
MIT License: the permission notice quoted for meshoptimizer and glTF-Transform
above applies with these copyright lines. Bundled as JavaScript in the main
process to decode and encode PNG textures when 3D Studio shrinks model
textures (ADR 0144).

## oidn-webgpu 0.6.0, @petamoriken/float16 3.9.3 and Open Image Denoise weights

Source: https://github.com/pissang/oidn-webgpu and npm/oidn-webgpu@0.6.0
(Copyright (c) 2024 pissang), npm/@petamoriken/float16@3.9.3 (Copyright (c)
2017-2025 Kenta Moriuchi); exact npm lock/integrity retained. MIT License: the permission notice
quoted for meshoptimizer and glTF-Transform below applies with these copyright
lines. Bundled as JavaScript and WGSL to denoise frames of the 3D Studio
path-traced final lane (ADR 0146).

Open Image Denoise weights `rt_hdr_alb_nrm.tza` from
https://github.com/RenderKit/oidn-weights at commit
`28883d1769d5930e13cf7f1676dd852bd81ed9e7`: trained weights of Intel® Open Image
Denoise, licensed under the Apache License, Version 2.0; the full text in "Rapier
Apache-2.0 license text" below applies, and the upstream `LICENSE.txt` ships
beside the weights in the source tree. The weights are used unmodified.

## HyperFrames shader transitions (@hyperframes/shader-transitions 0.9.44)

Source: https://github.com/heygen-com/hyperframes,
`packages/shader-transitions/src/shaders/registry.ts` and `common.ts`.
Copyright 2026 HeyGen, Inc. Licensed under the Apache License, Version 2.0;
the full text in "Rapier Apache-2.0 license text" below applies. The upstream
repository ships no NOTICE file.

The Timeline X Studio transition kinds `DomainWarp`, `RidgedBurn`,
`GravitationalLens`, `SwirlVortex`, `RippleWaves` and `SdfIris` (presets
`domain-warp`, `ridged-burn`, `gravitational-lens`, `swirl-vortex`,
`ripple-waves`, `sdf-iris`) are adapted from the HyperFrames shaders of the same
names and their shared value-noise / FBM helpers, in
`apps/desktop/src/renderer/render/transitions/transitionSources.ts`. They were
modified: translated to GLSL ES 3.0 and WGSL, given premultiplied-alpha output
and exact progress endpoints, fixed to HyperFrames' default accent colors, and
adjusted as described in that file's header comment. No HyperFrames package is
installed or bundled; only these shader sources were ported.

## Rapier 3D 0.30.1

Source: https://github.com/dimforge/rapier and crates.io/rapier3d/0.30.1.
Copyright the Rapier contributors. Apache License 2.0:
https://www.apache.org/licenses/LICENSE-2.0.
Bundled in the native core for offline rigid-body animation baking.

## Rapier JavaScript/WASM 0.21.0

Package: @dimforge/rapier3d-compat, exact npm lock/integrity retained.
Source: https://github.com/dimforge/rapier, https://rapier.rs.
Copyright the Rapier contributors. Apache License 2.0; the full text in
“Rapier Apache-2.0 license text” below also applies to this package.
Bundled as embedded WASM/JS for live kinematic character collision; this is
separate from the native Rust offline baker.

Timeline X Studio's source code is licensed under the [MIT License](LICENSE),
copyright Timeline X Studio contributors. The original MIT copyright notice is
retained in that file as required. Packaged distributions (installers)
additionally bundle the third-party
components below, each under its own license. None of them changes the license
of Timeline X Studio's own code — see [docs/licensing.md](docs/licensing.md) for how the
boundaries work.

## Context Studio — Markdown editor and relationship graph

Context Studio includes CodeMirror 6 and React Flow (`@xyflow/react`), both MIT,
and their MIT/ISC/BSD-3-Clause dependencies. Exact versions and integrity hashes
are recorded in `package-lock.json`. Full upstream copyright and license texts
ship at `legal/CONTEXT-STUDIO.txt` (source copy:
`apps/desktop/resources/licenses/CONTEXT-STUDIO.txt`).

## FFmpeg — LGPL shared libraries (in-process decode)

The `@timeline-x/native-decode` addon dynamically links FFmpeg shared libraries
(`libavcodec`, `libavformat`, `libavutil`, `libswscale`, `libswresample`,
`libavfilter`, `libavdevice`) built **without** `--enable-gpl` or
`--enable-nonfree`. These libraries are licensed under the
**GNU Lesser General Public License v2.1 or later**.

- License text ships in the app package at `resources/native-decode/LICENSE.txt`.
- The exact build (asset name, download URL, SHA-256, full `configuration:`
  banner) is recorded in `resources/native-decode/manifest.json`.
- Source code: <https://ffmpeg.org/download.html> /
  <https://git.ffmpeg.org/ffmpeg.git> (the manifest identifies the exact
  version). Windows/Linux binaries come from
  [BtbN/FFmpeg-Builds](https://github.com/BtbN/FFmpeg-Builds) (`-lgpl-shared`
  assets); macOS libraries are built from the pinned FFmpeg release tarball.
- LGPL §6: the libraries are shipped as separate, user-replaceable files
  (DLLs / `.so` / `.dylib`) resolved by the dynamic linker — you may replace
  them with your own compatible FFmpeg build.

## FFmpeg — GPL command-line binaries (encode/transcode sidecar)

Timeline X Studio bundles stock `ffmpeg` and `ffprobe` command-line binaries and runs
them strictly as **separate subprocesses** (proxy transcodes, audio conform,
export encode/mux). These builds enable GPL components (x264, x265, …) and are
licensed under the **GNU General Public License version 3**.

- License text ships in the app package at `resources/ffmpeg/LICENSE.txt`.
- The exact build (version string, full `configuration:` banner, download URL)
  is recorded in `resources/ffmpeg/manifest.json`, and
  `resources/ffmpeg/SOURCE-OFFER.txt` states where to obtain the complete
  corresponding source code.
- Binary providers: [gyan.dev](https://www.gyan.dev/ffmpeg/builds/) (Windows),
  [BtbN/FFmpeg-Builds](https://github.com/BtbN/FFmpeg-Builds) (Linux),
  [martin-riedl.de](https://ffmpeg.martin-riedl.de/) (macOS).

## libva (Linux only)

Linux packages bundle `libva.so.2` and `libva-drm.so.2` (VA-API dispatcher)
beside the native-decode addon so VA-API copy-back works on distributions that
ship an older libva. libva is licensed under the **MIT (Expat) License**; its
notice ships at `resources/native-decode/LIBVA-LICENSE.txt`.
Source: <https://github.com/intel/libva>.

## uv and first-use managed Python runtimes

Timeline X Studio bundles the official **uv 0.11.16** command-line executable
and invokes it as a separate provisioning subprocess. uv is dual-licensed
under **MIT OR Apache License 2.0**. Both license texts and the exact target
manifest ship at `resources/uv/`. uv downloads managed **CPython 3.12.13** on
first use for the app-owned runtimes described below; those components are
not bundled in the installer.

## Managed WhisperX / Faster-Whisper speech runtime

The installer carries Timeline X Studio's MIT-licensed `runner.py` adapter and
hash-pinned platform lock files, but no Python interpreter, wheel, or model
weight. On first use the bundled uv executable creates CPython 3.12.13 and
installs the locked runtime under the user-selected data root. Direct pins are
WhisperX 3.7.4, Faster-Whisper 1.2.1, pyannote-audio 3.4.0, and setuptools
79.0.1, with their transitive dependencies recorded in the corresponding
`requirements.<platform>.lock` files. Installed packages retain their own
upstream license files and metadata; the lock is regenerated and reviewed on
runtime updates. The full profile includes WhisperX alignment and optional
pyannote diarization. The macOS x64 lock is Faster-Whisper-only because the
full PyTorch wheel lane does not support that target, so it cannot produce
managed `speaker_id` values. Model downloads and any Hugging Face/pyannote
terms remain user-controlled first-use requirements.

The managed runner is not copied from VoiceStudio or any AGPL application
code. See [ADR 0094](docs/adr/0094-whisperx-speaker-aware-local-transcription.md)
and [the sidecar contract](docs/whisperx-sidecar.md).

## Electron / Chromium

The application shell is [Electron](https://www.electronjs.org/) (MIT), which
embeds Chromium and Node.js. Their license texts are included by the packager
at the application root (`LICENSE.electron.txt`, `LICENSES.chromium.html`).

## Inter font

The built-in "lower-third" Motif bundles the Inter typeface
(© The Inter Project Authors, <https://github.com/rsms/inter>) under the
**SIL Open Font License 1.1** — see
`apps/desktop/src/shared/motifs/builtin/lower-third/assets/LICENSE`.

## UI heading and monospace fonts

The application UI bundles unmodified Latin and Latin Extended variable WOFF2
assets from `@fontsource-variable/stack-sans-notch@5.3.0` and
`@fontsource-variable/jetbrains-mono@5.3.0`, distributed by
[Fontsource](https://github.com/fontsource/font-files). Both are licensed under
the **SIL Open Font License 1.1**.

- Stack Sans Notch: Copyright 2025 The Stack Sans Project Authors
  (<https://github.com/DylanYoungKoto/Stack-Sans>).
- JetBrains Mono: Copyright 2020 The JetBrains Mono Project Authors
  (<https://github.com/JetBrains/JetBrainsMono>).

The same two families, plus the Latin and Latin Extended variable WOFF2 files
of `@fontsource-variable/inter@5.3.0` (Inter: Copyright 2016 The Inter Project
Authors, <https://github.com/rsms/inter>, SIL Open Font License 1.1), are
packaged unmodified as shared Motif fonts in `motifs/shared-fonts` and served
to Motif documents.

Full upstream notices and license texts are in
`apps/desktop/resources/licenses/UI-FONTS.txt`, included in packaged apps as
`legal/UI-FONTS.txt`. Exact package versions, registry archives and SHA-512
integrities are recorded in the canonical `package-lock.json`.

## Shared Motif fonts

Motif documents and the Project design style can also use unmodified Latin
and Latin Extended WOFF2 files of nine families distributed by
[Fontsource](https://github.com/fontsource/font-files), packaged in
`motifs/shared-fonts`, all under the **SIL Open Font License 1.1**:

- Fraunces: Copyright 2020 The Fraunces Project Authors (<https://github.com/undercasetype/Fraunces>).
- Newsreader: Copyright 2020 The Newsreader Project Authors (<https://github.com/productiontype/Newsreader>).
- Instrument Sans: Copyright 2022 The Instrument Sans Project Authors (<https://github.com/Instrument/instrument-sans>).
- Bricolage Grotesque: Copyright 2022 The Bricolage Grotesque Project Authors (<https://github.com/ateliertriay/bricolage>).
- Space Grotesk: Copyright 2020 The Space Grotesk Project Authors (<https://github.com/floriankarsten/space-grotesk>).
- Archivo: Copyright 2020 The Archivo Project Authors (<https://github.com/Omnibus-Type/Archivo>).
- Big Shoulders: Copyright 2019 The Big Shoulders Project Authors (<https://github.com/xotypeco/big_shoulders>).
- Unbounded: Copyright 2022 The Unbounded Project Authors (<https://github.com/googlefonts/unbounded>).
- Kalam: Copyright (c) 2014 Indian Type Foundry.

Full notices, archive URLs, integrities and the license text are in
`apps/desktop/resources/licenses/MOTIF-FONTS.txt`, included in packaged apps
as `legal/MOTIF-FONTS.txt`.

The Motion Graphic `handwrite` helper draws single-line strokes traced from
Kalam Regular (`apps/desktop/src/shared/motifs/handwriting/kalamStrokes.ts`).
That stroke data is a modified version of Kalam, Copyright (c) 2014 Indian
Type Foundry, and is distributed under the same SIL Open Font License 1.1.

## Motion Graphic map data (Natural Earth via world-atlas 2.0.2)

Motion Graphics that use the map helpers (`geoPath`, `geoCountry` and related)
embed country outlines from `apps/desktop/src/shared/motifs/geo/world110m.ts`,
generated by `apps/desktop/scripts/build-world-geo.mjs`. The outlines are
Natural Earth 1:110m Admin 0 countries (public domain,
<https://www.naturalearthdata.com>), taken from the TopoJSON in
world-atlas 2.0.2 (<https://github.com/topojson/world-atlas>), decoded and
rounded to 0.01 degree. world-atlas is distributed under the ISC license:

```
Copyright 2013-2019 Michael Bostock

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.
```

## Kenney sound effects (CC0 1.0)

The sound-effect library in `apps/desktop/resources/sfx-library/kenney`
(Impact Sounds, Interface Sounds, UI Audio, Digital Audio, RPG Audio, Casino
Audio and Sci-fi Sounds) is created and distributed by Kenney
(<https://www.kenney.nl>) under Creative Commons Zero 1.0
(<https://creativecommons.org/publicdomain/zero/1.0/>). No credit is required;
Timeline X Studio credits Kenney as a courtesy.

## RIFE and Anime4K local video models

The optional local frame-interpolation path downloads the MIT-licensed RIFE
ONNX graph from [walterlow/RIFE_fp32_timestep](https://huggingface.co/walterlow/RIFE_fp32_timestep)
at immutable revision `ee09066f9822f8b28b8477a1b4cc30f19d607590`
(21,604,567 bytes, SHA-256 `4da60c1f20d42dba4f21503140940aa48a488585ead977532bf22e95a0319327`).
It is derived from FuryTMP/RIFE_fp32, an export of the MIT-licensed
[hzwer/Practical-RIFE](https://github.com/hzwer/Practical-RIFE) models
(Copyright © 2021 hzwer; original method
[megvii-research/ECCV2022-RIFE](https://github.com/megvii-research/ECCV2022-RIFE),
Copyright © Megvii Inc.), and keeps its MIT terms. The installed copy keeps the
model card and both upstream licence texts beside the weights.

Timeline X Studio bundles three 12.7 KB Anime4K CNN 2x (M) ONNX graphs generated
from the MIT-licensed [bloc97/Anime4K](https://github.com/bloc97/Anime4K)
(Copyright © 2019 bloc97) and [sb2702/websr](https://github.com/sb2702/websr)
(Copyright © 2023 Sam Bhattacharyya) weights. The animation, live-action, and
3D variants retain those MIT notices.

## CLIP ViT-B/32 image encoder (semantic shot pass)

Every build bundles `shot-models/clip-vit-b32-vision-fp16.onnx`, the fp16 ONNX
export of OpenAI's `clip-vit-base-patch32` image encoder published as
[`Xenova/clip-vit-base-patch32`](https://huggingface.co/Xenova/clip-vit-base-patch32)
at revision `6b7c523703ae26e39be4b03774966f8571c7f523` (MIT). The original
[OpenAI CLIP](https://github.com/openai/CLIP) code and weights are
Copyright (c) 2021 OpenAI under the MIT License; the full notice ships as
`shot-models/LICENSE.txt` and `legal/CLIP-MODEL.txt`. It is run on the CPU by
`tract-onnx` 0.23.10 (MIT OR Apache-2.0). See
[ADR 0195](docs/adr/0195-shot-detection-can-verify-cuts-with-local-clip-embeddings.md).

## Free local Agent dictation

On first use, Agent composer voice typing can download the multilingual q8 ONNX
conversion from [`Xenova/whisper-base`](https://huggingface.co/Xenova/whisper-base)
at immutable revision
`64da57285918e20ea79ea5c88eed7197933abaa8`. The model repository declares the
**Apache License 2.0**; the source OpenAI Whisper code and weights are
MIT-licensed. The model is not bundled in the installer: its seven required
files, exact byte counts, and SHA-256 values are recorded in
[`ADR 0074`](docs/adr/0074-agent-dictation-defaults-to-verified-local-whisper-onnx.md)
and verified before the downloaded cache is used.

Inference uses `@huggingface/transformers` (Apache-2.0) and
`onnxruntime-node` (MIT), distributed as npm dependencies with their license
files and package metadata.

## npm and Rust dependencies

The MCP client/server/core 2.3.1 and Node adapter 2.1.1 declare Apache-2.0.
Their upstream license files also retain MIT terms for older contributions that
were not relicensed. Desktop retains those package license files; the gateway
copies their complete text into its generated `THIRD-PARTY-NOTICES.txt`.
Sharp 0.35.5 is Apache-2.0 and its existing dynamically loaded libvips 1.3.4
runtime is LGPL-3.0-or-later; platform packages retain their upstream licenses.

Bundled JavaScript/TypeScript dependencies (npm) and statically linked Rust
crates (Cargo) are used under their respective licenses (MIT, Apache-2.0,
BSD, ISC, …) as declared in each package's manifest. The full dependency set
is enumerated by `package-lock.json` and `apps/desktop/native/Cargo.lock` in
the source repository.

## Three.js — native 3D Studio and shot design

The lazy-loaded native 3D Studio and shot design viewports use `three@0.185.1` (MIT), including GLTFLoader, HDRLoader and RectAreaLight addons.
Source: https://github.com/mrdoob/three/tree/r185

The MIT License

Copyright © 2010-2026 three.js authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


## ws — Desktop relay transport

`ws@8.22.0` is licensed under MIT, copyright Einar Otto Stangvik and contributors.
Source: <https://github.com/websockets/ws>. Its upstream LICENSE ships with the
Desktop dependency and in the gateway bundle notices. Optional native compression
addons are not required; per-message compression is disabled.

## shadcn UI styles

Timeline X Studio includes the unchanged `dist/tailwind.css` from `shadcn`
4.16.0, sourced from https://registry.npmjs.org/shadcn/-/shadcn-4.16.0.tgz.
Only the stylesheet is bundled; its SHA-256 is
`bc7d83425702955b4cb67cb14ede9d603f9d912376d57a2d81d661094d2a782a`.
The complete upstream MIT license follows.

MIT License

Copyright (c) 2023 shadcn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## LTC BRDF lookup tables — RectAreaLight

The existing Three.js RectAreaLight addon includes lookup data based on the LTC work by Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt. Reference: *Real-Time Polygonal-Light Shading with Linearly Transformed Cosines*, ACM Transactions on Graphics (Proceedings of ACM SIGGRAPH 2016) 35(4), 2016.
Upstream source and retained terms: <https://github.com/selfshadow/ltc_code>, <https://raw.githubusercontent.com/selfshadow/ltc_code/master/LICENSE>. The following upstream attribution terms are retained conservatively alongside the Three.js MIT notice.

Copyright (c) 2017, Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* If you use (or adapt) the source code in your own work, please include a
  reference to the paper:

  Real-Time Polygonal-Light Shading with Linearly Transformed Cosines.
  Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt.
  ACM Transactions on Graphics (Proceedings of ACM SIGGRAPH 2016) 35(4), 2016.
  Project page: https://eheitzresearch.wordpress.com/415-2/

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


### Rapier Apache-2.0 license text

                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright 2020 Sébastien Crozet

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

## Google Drive ZIP archive libraries

### yazl 3.3.1

Source: https://www.npmjs.com/package/yazl/v/3.3.1.

The MIT License (MIT)

Copyright (c) 2014 Josh Wolfe

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


### yauzl 3.4.0

Source: https://www.npmjs.com/package/yauzl/v/3.4.0.

The MIT License (MIT)

Copyright (c) 2014 Josh Wolfe

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


### buffer-crc32 1.0.0

Source: https://www.npmjs.com/package/buffer-crc32/v/1.0.0.

The MIT License

Copyright (c) 2013-2024 Brian J. Brennan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


### pend 1.2.0

Source: https://www.npmjs.com/package/pend/v/1.2.0.

The MIT License (Expat)

Copyright (c) 2014 Andrew Kelley

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation files
(the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
