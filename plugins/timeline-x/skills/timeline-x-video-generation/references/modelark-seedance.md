# Seedance — BytePlus (official ModelArk)

Select seedance-2-5-modelark for the direct ModelArk 2.5 route. The 2.0, Fast and
Mini presets start with modelark-. LAS, fal.ai and OpenRouter are separate routes.
The key comes from the ModelArk Singapore console, not LAS. Keys stay in Vault
and main; never put an API key in a prompt or Project.

2.5: 4–30s output, 480p/720p/1080p, thirty image references, ten video references
and ten audio references. Video/audio each total at most 30s; clips are 2–30s.
Film and one-off MCP accept the same ordered model-specific video limits.
For Film select text-to-video, single-frame, start-end-interpolation or
motion-reference explicitly. Text/reference recipes need no boundary stills;
single-frame needs only its opening Image. Image-only omni references are valid. Ordinary images and audio use bounded inline
encoding; Library videos use verified private Supabase or configured S3/R2 transport. MP4/MOV video and
WAV/MP3 audio require verified Library hashes.

Use exact ordered @Image 1, @Video 1, @Audio 1 references and explain each role.
Boundary frames cannot mix with omni references; ModelArk 2.5 boundaries require
adaptive ratio. ModelArk 2.0 audio needs a visual reference. Avoid editing or
extension language in a reference-generation task: task intent must match.

Send the complete approved scene prompt; do not summarize it to fit the old
4000-character local limit. Local/public MCP and the motion dialog now accept
16384 authored characters; Film and model-specific budgets still apply. Direct
BytePlus Seedance appends one versioned Turkish speech supplement when audio is
enabled and the prompt or Film target explicitly identifies Turkish speech. It preserves the
authored text, Turkish letters, exact-once wording and declared audio-reference
roles, and asks visual timing to follow fluent speech. It adds no dialogue to
silent or post-production narration requests. The receipt retains actual wire
text, the supplement version and authored-text fingerprint. Never claim this
guarantees fluent Turkish or preserves the original waveform; review speech and
lip timing in the output. Recover an existing paid job with its saved receipt;
new speech guidance does not rewrite an already submitted task.

Speech supplement v2 explicitly requires visible lip/jaw articulation for
requested on-camera dialogue instead of off-screen narration or a frozen
portrait mouth. Canonical Film reference-speech declarations bind each speaker
to the actual submitted @Audio N slot, preserving full-recording versus
voice-style intent. Missing slots fail before submission; arbitrary prompts do
not get guessed speaker bindings. Voiceover-only intent remains authoritative.
Keep the same visual/audio references when evaluating this prompt change.
Passing request tests or obtaining a complete ASR transcript does not establish
mouth movement, phoneme alignment, natural pronunciation or fluent delivery.

The selected Film language and canonical Dialogue language declaration are
authoritative; Turkish camera/wardrobe notes must not turn Arabic, English or
other dialogue into Turkish. Conflicting explicit languages fail before the
video POST. Bound non-Turkish speech receives the multilingual reference-speech
policy, with the actual language retained in the receipt. The visible speaker
follows the full recording's phonemes and pauses; identity photos do not freeze
the photographed mouth. Voiceover-only intent remains authoritative. This is
generation guidance, not a dedicated deterministic lip-sync operator. Inspect
the audible words and visible mouth through the full line before approving more
shots. Changing guidance does not repair an already generated clip or guarantee
performance in every language supported by a model.

The request-only modelark_options object selects taskType reference/edit/extend,
outputFormat mp4/mov, draft, draftTaskId, endpointId, priority (0–9),
autoDuration, hashed safetyIdentifier, assets, executionExpiresAfter and callbackUrl.
Edit requires adaptive ratio, 4–30s source videos and duration_seconds=30 as a
ceiling; the host sends duration=-1 and retains actual output duration. Extend
requires adaptive ratio. All normal production honors the selected supported
resolution. Draft is optional: it creates a separate 480p preview while the UI
retains the selected final quality. A 1080p final may reuse draftTaskId from a
completed Library draft; omit prompt, sources, duration, ratio and audio because
the provider inherits them. A 480p/720p final uses an explicitly requested normal
production from the original recipe and can differ visually from the draft.
Never silently switch quality, route or start a paid follow-up. Both steps are
billed separately. Draft IDs created from 2026-10-28 02:00 UTC last fourteen days;
older IDs last seven. Known final jobs recover without resubmitting their draft.
Existing asset:// references require account authorization.

ModelArk 2.x does not document deterministic seed: omit it or set null. Historical
seeded jobs retain their receipt-bound recovery. For standalone autoDuration,
set duration_seconds to the selected model maximum as the cost ceiling; the wire
uses -1 and actual output duration is recorded. Film shot timing stays exact.
Custom endpointId must select the same model; returned model identity is checked.
Large local images and audio use private, byte-verified signed URLs automatically;
URLs never enter Project or request receipts. H.264/HEVC reference videos must
meet 407696–8295044 pixels and 24–60 fps. Normalize unsupported source codecs
explicitly before submission.

For a new consented portrait, use `prepare_seedance_asset` with its Library
media_id, the person's already verified group_id, and project_name (default is
default). Configure the separate BytePlus Asset Library AK/SK once in Settings
→ API Keys; never request secrets in chat. The command stages PNG/JPEG/WebP
privately, verifies the exact bytes, calls CreateAsset and polls GetAsset.
Repeat the same arguments with wait_ms=45000 while status is Processing.
Only Active returns a usable asset. Film Studio keeps the approved Library
image reference: main resolves the exact registered bytes to its authorized
asset URI in the same image slot, rechecking the owner, AK, verified group and
Active status. Without explicit Project automation, generation creates no new portrait. Re-run prepare
once for a registration made by an older app to enable automatic lookup; its
existing ID is reused. For an explicit one-off request, the returned asset can
also be appended to modelark_options.assets without duplicating that portrait
as an inline image. Retain the same BytePlus project for inference.
The account/group/project/content ledger reuses IDs after restarts; uncertainty
never silently triggers another CreateAsset. Failed/Uncertain are not usable.
Existing manually registered asset:// IDs need no upload and remain usable
directly. Initial person verification and its rights/consent are separate;
registering new images of that verified person does not repeat verification.
For a one-person portrait Project, explicitly set `automatic_for_project: true`
once on `prepare_seedance_asset`. Main remembers this verified group for the
current account, AK and Project. Enabling also prepares the current Film's
portrait set immediately and returns the prepared_reference_count field, without a
video POST. Subsequent ModelArk generation prepares the
current Film's portrait references automatically, reuses exact registered bytes
and preserves their original image slots. Console uploads can be adopted only
after exact-byte checks. New/changed images are registered once; only Active
assets reach the video POST. Processing, Failed and Uncertain stop submission
and retain existing IDs for recovery. Set false to disable; omission preserves
the choice. Do not enable for mixed-person or non-portrait references. This
does not approve the FilmManifest or authorize a paid generation by itself.
This command does not create a video, alter FilmManifest approvals or guarantee
perfect facial similarity. Public MCP requires project.read + provider.execute;
the paired Desktop must be running, but no browser/upload UI is needed.

When the user explicitly asks to reuse the same verified person automatically
in future Projects, set automatic_for_new_projects=true once with that person's
Active primary identity Image. Main stores the choice under the current owner,
Asset Library AK and storage target. Before new generation, a one-person Film
using the exact same identity Image inherits the verified group and prepares
its new portrait references automatically. Wardrobe/location references alone,
other people, mixed-person Films and reviewed non-portrait inputs cannot select
this default. An explicit automatic_for_project=false remains off across
restarts. automatic_for_new_projects=false revokes inheritance for future
Projects without revoking existing Project choices. New image assets still
wait for provider Active status; human identity verification is not repeated.

Resume the same durable job and receipt after timeouts. Never create a replacement
for an uncertain POST. The free key probe checks API access, not model activation
or credit. Fixed-size ModelArk estimates use its published token rates and
video-input minimums, independently of LAS. Adaptive sizes remain unknown;
existing local queue budget guards block unquoted work. No funding or paid generation
is implied by setting up the API connection.

If the provider rejects an inactive model, inspect Model activation in the
account's ModelArk console. Activation can require agreement acceptance and
an eligible paid plan, resource pack or credit balance; it is separate from
key verification. Check the current [activation requirements](https://docs.byteplus.com/en/docs/modelark/seedance-model-activation-usage-and-refund)
before promising that an API key alone is sufficient. Do not repeat generation
until the account prerequisite is satisfied.
