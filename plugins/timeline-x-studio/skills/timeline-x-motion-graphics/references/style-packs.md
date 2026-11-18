# Style packs: ready scenes for named styles

Read this when the user picks one of the nine styles below, or an approved look
maps to one. Eighty-one more styles (art deco to woodcut, neon to ukiyo-e) ship
the same way; find them in the [style pack catalogue](style-pack-catalog.md). Each style ships in every user's Library as one shared module
(palette, type, easing and the style's signature parts) and four template
scenes built on it. Start from them instead of writing the look from scratch:
the scenes already pass the frame and motion review at their defaults.

## Choose a pack by purpose

When the user names a purpose instead of a style ("a science explainer", "a
product launch", "a news short"), call `list_motion_graphic_modules` with
`style_uses` (and `style_category` for a visual family) and offer two or three
of the packs it returns, by their Turkish names. Use tags: haber, belgesel,
bilim, egitim, urun, marka, veri, harita-seyahat, cocuk, muzik, oyun-fragman,
acilis-jenerik, etkinlik, sosyal-medya, teknoloji, kultur-sanat, spor. Every
listed style module carries its category and uses with labels.

When the user describes a look in their own words ("neon olsun", "belgesel
gibi", "minimal", "çocuklara yönelik", "80'ler anime", a known studio or
show), pass those words as `style_query`: the packs come back best first with
`style_match`. A studio or show name maps to the nearest grammar; build an
original piece in that pack, never a copy of the named work.

## How to use a pack

1. Find the scenes in `list_motifs` (their names start with the style's name
   below) and the module in `list_motion_graphic_modules`.
2. When a scene fits as it is, place it with `add_motif` and set its
   properties per instance; nothing else is needed.
3. When the piece needs a scene the pack lacks, read a template with
   `get_motif_source`, write a new asset that lists the style's module in
   its modules argument, and use the module's parts so every scene keeps one look. Do not
   copy the module source into the asset.
4. Review each new or changed scene with `review_motion_graphic`. Rolling
   numbers report text_too_brief while they count; that finding is expected
   only for a counter that lands and then holds.

The user's own colours, fonts or channel name go into instance properties or a
new asset. Never edit a pack module in place unless the user asks for it:
`update_motion_graphic_module` republishes every asset that uses it, in every
project.

## Make a style your own

When the user wants a pack in their brand ("my colours", "our font", "my
channel's version"), copy it instead of editing it:

1. `inspect_style_pack` with the pack's module id. Show the user the palette
   by role (the names field tells which colour is the accent, the ink, the paper)
   and the fonts, and ask one question at a time: brand colours for which
   roles, which bundled font for titles and body (available_fonts in the result), default
   copy such as a channel name, and a name for the new style.
2. `customize_style_pack` with that mapping. Keep the pack's contrast logic:
   a dark ink stays dark, a light paper stays light, the accent stays the one
   loud colour.
3. Review two or three new scenes with `review_motion_graphic`; fix a
   low_contrast finding by choosing a darker or lighter brand shade, then run
   the tool again under a new name (or delete the copy first).
4. Place the new scenes as usual. Sound cues and layer fitting come with them.

The base pack never changes, and the copy is the user's: later pack updates do
not touch it. rgba() tints of a replaced colour follow it and keep their alpha.

## Length

Pack scenes fit their layer: drag or set a layer longer than the scene's
default and the entrances keep their timing, the exit moves to the layer end
and the middle holds with its ambient motion (grain, drift, flicker). Place
one instance per beat at the beat's length instead of writing a longer copy.
A new scene of your own does the same when you create it with fitsLayer true
and key its exit to useVideoConfig().durationInFrames.

## Sound effects

Every pack scene carries sound cues: the stamp, counter, card drop, marker,
chalk or projector sound its motion calls for, timed to its default content.
After placing a scene, call `add_motion_graphic_sfx` with the layer id (and
the timeline's `sequence_id` when the scene is on a reusable timeline): the
sounds are synthesized on this computer, cost nothing and land as one sfx
Audio layer at the layer start. A trimmed or split instance only gets the
cues it shows, and exit sounds marked from_end follow a longer layer to its end. For a new scene, give your own asset soundCues when you create
it, or pass them to the tool. Duck music under narration as usual; the sfx
role gain sets their level against it. Board scenes time their marker and
chalk sounds for the default copy, so check a much longer line by ear.

All scenes are 1920×1080; a vertical bar separates list items inside one text property.

## Altyazılı haber (sound-off social news)

Module: stil-altyazili-haber. A news short that reads with the sound off: the
caption is the shot. Huge white captions slam in a chunk at a time, one keyword
sits on an amber block, a source tag slides in whenever a figure appears, and
data lands on a dark ruled sheet with a rolling number. Amber means the point
or a gain, red a loss.

- Altyazılı haber: açılış (4 s, transparent): an amber page wipes in over the
  footage with the title, subline and date chip, then wipes off and leaves the
  channel bug.
- Altyazılı haber: altyazı kartı (4 s, transparent): caption over footage.
  Write the line as chunks, Bir yılda|{1,3 milyon} koloni|kayboldu: braces
  mark the one keyword. Empty source hides the tag.
- Altyazılı haber: sayı kartı (5 s, opaque): label, rolling figure with unit,
  optional stamp and source; tone is artis (amber) or kayip (red).
- Altyazılı haber: karşılaştırma (5 s, opaque): a split screen opening from
  its divider, two counters, optional pictures (bind Library images to
  leftImage and rightImage) and a shared stamp.

Build rules: footage sits on its own Timeline layer under the transparent
scenes; cut on a steady half-beat grid; keep each caption on screen at least
1.8 s and one line long (split a longer sentence into two captions); every
figure carries its source. Sound: a brisk pulse ducked under the voice, a
click-and-thump under each chunk, a tick rattle under counters, one real
silence before the turn.

## Kâğıt masa anlatımı (paper-desk explainer)

Module: stil-kagit-masa. Follows the vox-explainer recipe in
[evidence films and print](style-recipes-evidence.md): printed cards on a warm
grainy desk, one-bounce drops, poses stepped on twos, red marker and
handwritten notes.

- Kâğıt masa: soru şeridi (4 s): up to three lines on a torn strip, words gain
  weight one after another, a marker underline and a handwritten aside.
- Kâğıt masa: kanıt kartı (5 s): a photo card (bind image), a marker ellipse
  drawn at circleX/circleY (percent of the picture) with circleR, an arrow and
  a note.
- Kâğıt masa: belge alıntısı (5 s): a document card whose key line is swept
  with highlighter, then the figure lands on a red tag.
- Kâğıt masa: sonuç kartı (4 s): kicker, the takeaway in a few words, an
  underline and a note.

## Izgara poster (Swiss grid poster)

Module: stil-izgara-poster. Follows the swiss-motion recipe in
[graphic and information looks](style-recipes-graphic.md): a 12-column grid,
one signal colour, words rising out of a mask, hard-edged wipes, every move
ending on a beat of the scene's bpm property (120 by default).

- Izgara poster: başlık (4 s): guides draw, two title lines rise, the signal
  block wipes in, notes sit under hairlines.
- Izgara poster: büyük sayı (4 s): a numeral climbing in steps with prefix and
  suffix (Turkish percent goes first: prefix %), the signal square leaving the
  grid with a status readout.
- Izgara poster: üç madde (5 s): three modules arriving on beats; the active
  one turns signal colour in turn.
- Izgara poster: kapanış (4 s): a statement, a knife cut that collapses it,
  then the end word in signal colour.

## Beyaz tahta (whiteboard explainer)

Module: stil-beyaz-tahta. A marker explanation on a white board: handwriting
written left to right (Kalam), shaky hand-drawn boxes, arrows, ticks and
hatched bars in black, blue, red and green, cleared at the end by an eraser
sweep. Draw one idea at a time; the hand never redraws something already on
the board. Sound: a soft marker squeak under every stroke, a light ukulele or
piano bed ducked under the voice.

- Beyaz tahta: başlık (4 s): title written, double red underline, blue
  subline, a small doodle.
- Beyaz tahta: neden-sonuç (6 s): up to three boxes joined by arrows, each
  label written inside, a red note under the chain.
- Beyaz tahta: kontrol listesi (5 s): heading and up to four items, each box
  ticked after its line is written.
- Beyaz tahta: çubuk grafik (5 s): axes, up to four hatched bars with labels
  and values (6|7|8,5|9), the highlighted bar red and circled.

## Kara tahta (chalkboard lesson)

Module: stil-kara-tahta. A teacher's green board in a wooden frame: smudged
board texture, dusty chalk handwriting written left to right, coloured chalk
(yellow, pink, blue) for emphasis, shaky rings and arrows, wiped clean with a
board eraser at the end. Warmer and slower than the whiteboard.

- Kara tahta: başlık (4 s): title, yellow underline, pink subline, a date in
  the corner.
- Kara tahta: tanım (6 s): a term ringed in yellow, an equals sign, up to
  three definition lines and a pink example.
- Kara tahta: oran dairesi (5 s): a chalk circle filling to a percent with
  the counting figure inside and a labelled arrow.
- Kara tahta: adımlar (5 s): heading and up to four numbered steps.

## Sketchnote (visual notes)

Module: stil-sketchnote. Dotted paper, bold marker lettering, tilted colour
blobs behind key words, hand-drawn icons, a ribbon banner and cloud bubbles;
elements pop in with a small bounce. Icon names for the icons property: kalp,
saat, ampul, yildiz, onay, ok, insan, hedef.

- Sketchnote: bayrak başlık (4 s): a ribbon banner with the title, subline and
  doodled stars.
- Sketchnote: fikir haritası (5 s): a cloud in the middle and up to four
  branches, each label on its own colour.
- Sketchnote: ikon kartları (5 s): up to three icons on colour blobs with a
  title and note each.
- Sketchnote: alıntı (4 s): a quote with one braced keyword highlighted, an
  attribution and a light bulb.

## Haber filmi (1920s newsreel)

Module: stil-haber-filmi. Flickering black-and-cream film with grain that
changes every two frames, scratches, dust, vignette and gate weave, art deco
intertitles, a spinning newspaper and an iris close. Use real archive footage
or photos with checked licences; a generated picture never poses as archive.

- Haber filmi: ara yazı kartı (4 s): a framed intertitle of up to four lines.
- Haber filmi: dönen gazete (4 s): a front page spinning in, then a slow push.
  Keep the paper's name fictional unless the user supplies a real one.
- Haber filmi: film dokusu (6 s): bind a photo or clip to image for a sepia
  film look; unbound it is a transparent grain-and-scratch layer to place
  over footage. Optional framed caption.
- Haber filmi: son kartı (4 s): the end word in a deco frame closing with an
  iris.

## Veri hikâyesi (pencil data story)

Module: stil-veri-hikayesi. Follows the dataviz recipe in
[graphic and information looks](style-recipes-graphic.md): one chart on cream
paper, colour encodes the value only (cool blue context, warm red record or
warning), points pop in with a fading ring, a pinned handwritten note. Numbers
are typed as text lists (comma decimals work) and must come from a real
source; replace the sample caption with it.

- Veri hikâyesi: çizgi grafik (6 s): up to twelve points drawn one by one, a
  noted point in warm red with its value.
- Veri hikâyesi: sıralama (5 s): up to six horizontal bars, the hero bar warm
  and slower.
- Veri hikâyesi: 100 kişilik ızgara (5 s): a 10×10 unit grid filling to a
  count, the figure and a sentence.
- Veri hikâyesi: eğim grafiği (5 s): two years, up to five lines, the hero
  line drawn last; labels spread apart when values are close.

## Risograf (spot-ink print)

Module: stil-risograf. Follows the risograph recipe in
[evidence films and print](style-recipes-evidence.md): blue, pink and yellow
plates that multiply where they cross, each a few pixels out of register,
dot tints, paper grain, roller-sweep arrivals, drawing on twos and a
registration kick on accents. Text sits on the blue plate so it stays
readable; pink and yellow carry shapes.

- Risograf: poster başlık (4 s): a sun, a pink hill and a double-struck title.
- Risograf: görsel baskı (5 s): bind image for a blue duotone print on a
  yellow plate; unbound it draws a hill landscape.
- Risograf: sayı kartı (4 s): a figure on a yellow block with a label on a
  pink tint.
- Risograf: kapanış (4 s): a pink disc swells to fill the frame and shrinks
  above the end word.
