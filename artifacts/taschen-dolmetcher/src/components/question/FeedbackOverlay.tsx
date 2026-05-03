import { useRef } from 'react'

interface FeedbackProps {
  isVisible: boolean;
  backgroundImgUrl?: string;
  messageText: string;
  captionText?: string;
  ariaLabel?: string;
  containerClassName?: string;
  messageClassName?: string;
  captionClassName?: string;
  backgroundStyle?: React.CSSProperties;
  onDismiss?: () => void;
}

const FeedbackOverlay: React.FC<FeedbackProps> = ({
  isVisible,
  backgroundImgUrl,
  messageText,
  captionText = 'Wrong Answer!',
  ariaLabel = 'Answer feedback',
  containerClassName = `
    absolute
    inset-0 flex flex-col items-center justify-between z-10
    focus:outline-none
  `,
  messageClassName = "text-xl md:text-2xl text-soviet-gold bg-red-500/80 p-3 md:self-start rounded",
  captionClassName = "bg-black/50 text-white px-4 py-2 rounded-lg font-semibold text-lg backdrop-blur-sm",
  backgroundStyle,
  onDismiss,
}) => {
  const touchStartYRef = useRef<number | null>(null)

  if (!isVisible) return null;

  const defaultBackgroundStyle: React.CSSProperties = {
    backgroundImage: backgroundImgUrl ? `url(${backgroundImgUrl})` : undefined,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const combinedBackgroundStyle = { ...defaultBackgroundStyle, ...backgroundStyle };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartYRef.current !== null) {
      const deltaY = e.changedTouches[0].clientY - touchStartYRef.current
      if (deltaY > 60) onDismiss?.()
      touchStartYRef.current = null
    }
  }

  return (
    <section
      role="alert"
      aria-live="assertive"
      aria-label={ariaLabel}
      className={containerClassName}
      style={combinedBackgroundStyle}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <header
        className={messageClassName}
        role="status"
        aria-label="Answer result"
      >
        <span className="font-semibold">{messageText}</span>
      </header>

      {captionText && (
        <footer
          className={captionClassName}
          role="complementary"
          aria-label="Additional feedback information"
        >
          {captionText}
          {onDismiss && (
            <span className="block text-xs text-white/60 mt-1 md:hidden">
              swipe down to dismiss
            </span>
          )}
        </footer>
      )}
    </section>
  );
}

export default FeedbackOverlay;
