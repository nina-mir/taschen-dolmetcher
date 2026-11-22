import { Cross2Icon } from "@radix-ui/react-icons"

interface FeedbackProps {
  isVisible: boolean;
  /** Portrait shown as a small thumbnail next to the message. */
  backgroundImgUrl?: string;
  messageText: string;
  captionText?: string;
  ariaLabel?: string;
  onDismiss?: () => void;
}

/**
 * Wrong-answer feedback. A compact strip at the bottom of the card, so the
 * question and the remaining choices stay visible while the player retries.
 */
const FeedbackOverlay: React.FC<FeedbackProps> = ({
  isVisible,
  backgroundImgUrl,
  messageText,
  captionText,
  ariaLabel = 'Answer feedback',
  onDismiss,
}) => {
  if (!isVisible) return null;

  return (
    <section
      role="alert"
      aria-label={ariaLabel}
      className="mx-6 flex items-stretch overflow-hidden rounded-lg border border-stone-700 bg-stone-900 text-stone-100 animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
    >
      {backgroundImgUrl && (
        <img
          src={backgroundImgUrl}
          alt=""
          className="w-20 min-h-20 shrink-0 object-cover bg-stone-700"
        />
      )}

      <div className="min-w-0 flex-1 px-3 py-2">
        <p className="font-gyst font-semibold text-soviet-gold leading-tight">
          {messageText}
        </p>
        {captionText && (
          <p className="mt-1 text-sm leading-snug text-stone-300">
            {captionText}
          </p>
        )}
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="flex w-11 shrink-0 items-center justify-center text-stone-400 hover:text-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-soviet-gold cursor-pointer"
          aria-label="Dismiss feedback"
        >
          <Cross2Icon className="w-5 h-5" />
        </button>
      )}
    </section>
  );
}

export default FeedbackOverlay;
