# Direct Wan 3 through QwenCloud

Select `wan-3-0` or `wan-3-0-prime` explicitly. Both use the user's QwenCloud
pay-as-you-go key, held in Vault and leased only to main. Select the key's region
in app Settings. All new standalone and Film requests use that setting; a saved
shot or qwen_options region cannot override it. Token Plan credentials do not authorize this
DashScope video route. Never replace a failed direct request with OpenRouter.

Read the live generation schema before sending options. Text, first frame,
first+last frame and reference modes are distinct. Boundary frames cannot mix
with image/video/audio references, documents or web inputs. Reference images,
videos and audios have independent one-based prompt numbering. Keep authored
order and Library source hashes stable through planning, submission and recovery.

Wan 3 allows up to ten reference images, five videos and five audios, at most
twenty inputs overall. Video references total at most fifteen seconds; audio
references separately total at most fifteen seconds. Input video plus output
video must not exceed thirty seconds. Charges include input video duration.
Silent output has the same rate. Respect the native conservative estimate;
temporary provider discounts do not change the application's permanent ceiling.

Use generate_video with Library reference IDs. qwen_options carries
promptExtend, autoDuration and an optional explicit edit/extend task. Auto
duration uses the full remaining duration_seconds ceiling and is suitable for
an independent Library candidate. A Film shot retains exact approved timing.
File/link sources use public HTTPS addresses without credentials and require
prompt rewriting; they are standalone inputs rather than verified Film assets.

For edit/extend, select an available Library source and an adaptive aspect ratio.
Preservation instructions are generation guidance; inspect the output before
claiming that unedited pixels, identity, source audio or lip synchronization were
preserved. UI forward means append after the source, and backward means prepend;
main translates this into the provider's different terminology. Keep the output
as a candidate until it is reviewed. A Film duration change uses the normal actor
timing operation and invalidates affected approvals.

Recover a known task instead of starting another paid request. An unknown POST
outcome remains blocked. Provider task/result lifetime is bounded; expired work
does not authorize resubmission. Downloaded bytes must pass native media checks,
and Library delivery and Project save must complete before reporting success.
