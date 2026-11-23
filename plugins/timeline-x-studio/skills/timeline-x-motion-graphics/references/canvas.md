# Canvas: raster display lists

Use `<Canvas>` when a graphic needs hundreds to thousands of small marks, soft
light or blending: confetti, snow, embers, sparks, bokeh, starfields, glows,
light leaks, data dot clouds. Use `<Surface>` (SVG) for a few dozen shapes and
for anything a person may need to inspect or select; use DOM elements for copy.

The Library already holds twelve such effects from the Efekt kiti starter
pack (confetti, snow, embers, fireflies, bokeh, fireworks, rain, sparkles, gold
dust, bubbles, petals, speed lines). Place or adapt one of those before writing
a new effect; each takes amount (0-1), speed and its colours.

The Geçiş kiti pack adds twelve cover transitions (ink drop, smoke, hex
tiles, checker, zigzag, hearts, sun burst, shutter and more). They do not blend clips: each starts
empty, covers the whole frame at its middle and is clear on its last frame.
Place one on a track above the cut with its middle on the cut; use a Timeline
transition instead when the two shots should blend.

For titles and copy, the Yazı kiti pack holds sixteen ready text animations
(neon sign, glitch, typewriter, countdown, news strap, ticker, rolling credits
and more). They keep copy as DOM text, so the review still audits it.

## Contract

```jsx
const Component = ({item}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const t = frame / fps;
  const sparks = Array.from({length: 600}, (_, i) => {
    const angle = random(`a${i}`) * Math.PI * 2;
    const speed = 120 + random(`s${i}`) * 520;
    const life = (t + random(`o${i}`) * 2) % 2;
    return {
      type: 'circle',
      cx: width / 2 + Math.cos(angle) * speed * life,
      cy: height / 2 + Math.sin(angle) * speed * life + 180 * life * life,
      r: 2 + random(`r${i}`) * 4,
      fill: interpolateColors(random(`c${i}`), [0, 1], ['#ffd166', '#ef476f']),
      opacity: Math.max(0, 1 - life / 2),
    };
  });
  return <div style={{width: '100%', height: '100%'}}>
    <Canvas motionId="sparks" commands={[
      {type: 'rect', width, height, fill: {type: 'radial', cx: width / 2, cy: height / 2, r: width * 0.6,
        stops: [[0, '#1d2b53'], [1, '#05070d']]}},
      {type: 'group', blend: 'lighter', commands: sparks},
    ]} />
  </div>;
};
```

- Props: commands, width and height (CSS px; default the composition
  size), style, `className`, `ariaLabel`, `motionId`. The canvas is a block
  box: position it with a style object like any element.
- Commands use the Surface vocabulary: `type: 'group'` with nested commands,
  `type: 'rect'` (x, y, width, height, rx, ry), circle, ellipse, line,
  polyline, polygon, `type: 'path'` (d, fillRule) and `type: 'text'` (x, y,
  text, fontSize, fontFamily, fontWeight, textAnchor, dominantBaseline,
  letterSpacing). Every shape takes fill, stroke, strokeWidth, opacity,
  transform, strokeLinecap, strokeLinejoin and strokeDasharray. As in SVG,
  shapes fill black unless fill is given or `'none'`, and stroke only when a
  stroke is given.
- Raster-only fields on any command or group: `blur: px` (0-500),
  `blend: 'lighter'` (also screen, multiply, overlay, soft-light, difference,
  destination-out and the other composite modes; never copy), and
  `shadow: {color, blur, x, y}`.
- A fill or stroke may be a gradient: `{type: 'linear', x1, y1, x2, y2, stops}`
  or `{type: 'radial', cx, cy, r, fx, fy, fr, stops}`, with 1-32
  `[offset, colour]` stops.
- Budgets per frame: 20,000 commands, 16 canvases, 64 Mpx of backing store,
  8192 px per side, group depth 16.

## Rules that keep it correct

- Commands are data, recomputed from the frame every time. There is no context,
  no draw callback and nothing left from the previous frame: a particle's
  position is a closed-form function of time (`life = (t + offset) % period`),
  never an integration step.
- Build command lists with `Array.from`, `.map()`, `.flatMap()`, `.concat()` or
  spread: a for loop and `.push()` are refused (MG_LOOP,
  MG_COLLECTION_MUTATION; see source-refusals.md).
- Seed every random value with a stable key per particle (`random(\`x${i}\`)`),
  so the same frame always draws the same sparks.
- Blur and blend are expensive at full HD: prefer one blurred group of soft
  shapes over a blur on each of thousands of marks.
- Canvas pixels are not audited for clipped text or contrast. Keep readable
  copy in DOM elements above the canvas.
- `review_motion_graphic` draws every sampled time twice in different orders;
  an order_dependent finding means some value depends on earlier frames.
