# Localization review

Read this when preparing recognized source text, translating factual speech,
fitting target-language wording or verifying the localized deliverable.

## Establish the source meaning

Resolve the exact source and range. Reuse existing complete transcription;
otherwise call `transcribe_clip` on the intended Audio or VideoClip through the
transcription workflow. Check the returned coordinate space and timing
provenance. Missing exact word timing can still support source-text review and
caption cues, but cannot support invented word cuts.

Review names, numbers, units, product claims, speaker turns and ambiguous words
against the recording. Show the source wording only when a missing decision
or recognition error requires user correction. Reuse a supplied approved
source; do not add a mandatory second approval. For external processing, submit
reviewed text exactly in its advertised schema and do not quietly send a
partial transcript for a whole-video job.

## Preserve meaning in the target language

Record language/variant, tone, terminology and phrases that stay unchanged.
Keep the full source meaning and important qualifiers. Translate a joke or
idiom for its intended sense without inventing a stronger factual promise.
Shortening to fit speech must not silently change a name, number or claim.

For caption-only localization, maintain the source cue correspondence and
timing; target text may need line wrapping or a suitable style for readability.
Use the supported translation profile for reusable tone, glossary and
protected-term rules. If multiple physical caption lanes form one source
language group, pass the complete group rather than translating only its first
track. Keep other language alternatives from rendering simultaneously.

For dubbing, estimate fit before synthesis and measure the actual take after
it. Target languages may require more or fewer syllables. Do not use aggressive
speed to conceal a poor fit. Revise approved wording without loss of meaning,
or request the necessary timing change. Retain each speaker's mapping and saved
authorized voice configuration; a default voice does not prove source identity.

## Inspect the real result

Listen at starts, names/numbers, speaker changes and sentence ends. Check the
localized soundtrack for doubled dialogue, missing words, abrupt joins, changed
room sound and competition with music. For visible lips, compare mouth closure
and syllabic activity with the new speech; status JSON cannot prove sync.

Inspect the longest caption line, glyph support and safe area. After dubbing,
derive caption timing from the actual new speech where available. Caption-only
translation intentionally inherits original timing; those two operations have
different timing evidence.

When delivery is requested, verify the actual exported language, audio duration,
picture continuity and media properties. The Project may be correct while an
export uses the wrong enabled language track. State what was inspected and
what remains unverified instead of treating configuration as acceptance.
