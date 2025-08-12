/* 
FeedbackOverlay

Handles the correct/incorrect visual feedback
Manages the wrong answer animation and imagery
Contains the overlay text and styling logic
*/

interface FeedbackProps {
    isVisible: boolean;
    backgroundImgUrl?: string; // correctClasses.backgroundImage
    messageText: string; // wrong❌⚠️falsch❌⚠️неправильный
    captionText?: string; // {correctClasses.displayText}
}

const FeedbackOverlay: React.FC<FeedbackProps> = ({
    isVisible,
    backgroundImgUrl,
    messageText,
    captionText = 'Wrong Answer!'
}) => {
    if (isVisible){return (
        <div 
        role="alert"
        aria-live="polite"
        className={`
        absolute 
        inset-0 flex flex-col items-center justify-between z-10
        `}
        style={{
          backgroundImage: `url(${backgroundImgUrl})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
          <p className="text-xl md:text-2xl text-soviet-gold bg-red-500/30 p-3 md:self-start">
            {messageText}
          </p>
          <div className="bg-black/50 text-white px-4 py-2 rounded-lg font-semibold text-lg backdrop-blur-sm">
            {captionText}
          </div>
        </div>
    )} else{
        return
    }
    
}

export default FeedbackOverlay;