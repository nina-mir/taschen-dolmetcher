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
  backgroundStyle
}) => {
  if (!isVisible) {
    return null;
  }

  const defaultBackgroundStyle: React.CSSProperties = {
    backgroundImage: backgroundImgUrl ? `url(${backgroundImgUrl})` : undefined,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const combinedBackgroundStyle = { ...defaultBackgroundStyle, ...backgroundStyle };

  return (
    <section
      role="alert"
      aria-live="assertive"
      aria-label={ariaLabel}
      className={containerClassName}
      style={combinedBackgroundStyle}
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
        </footer>
      )}
    </section>
  );
}

export default FeedbackOverlay;
