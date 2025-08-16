/* 
FeedbackOverlay

Handles the incorrect choice visual feedback
Manages the wrong answer animation and imagery
Contains the overlay text and styling logic
*/


interface FeedbackProps {
    isVisible: boolean;
    backgroundImgUrl?: string;
    messageText: string; // wrong❌⚠️falsch❌⚠️неправильный
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
      backgroundRepeat: 'no-repeat'
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


// Default styling (same as before)
{/* <FeedbackOverlay isVisible={true} messageText="Wrong!" />

// Custom styling
<FeedbackOverlay 
  isVisible={true}
  messageText="Incorrect!"
  containerClassName="absolute inset-0 flex flex-col items-center justify-center z-20"
  messageClassName="text-3xl text-red-600 bg-white/90 p-4 rounded-xl shadow-lg"
  captionClassName="bg-gray-800 text-yellow-300 px-6 py-3 rounded-full font-bold"
/>

 */}



// interface FeedbackProps {
//   isVisible: boolean;
//   backgroundImgUrl?: string;
//   messageText: string; // wrong❌⚠️falsch❌⚠️неправильный
//   captionText?: string;
//   ariaLabel?: string;
// }

// const FeedbackOverlay: React.FC<FeedbackProps> = ({
//   isVisible,
//   backgroundImgUrl,
//   messageText,
//   captionText = 'Wrong Answer!',
//   ariaLabel = 'Answer feedback'
// }) => {
//   if (!isVisible) {
//       return null;
//   }

//   return (
//       <div 
//           role="alert"
//           aria-live="assertive"
//           aria-label={ariaLabel}
//           className={`
//               absolute 
//               inset-0 flex flex-col items-center justify-between z-10
//               focus:outline-none
//           `}
//           style={{
//               backgroundImage: backgroundImgUrl ? `url(${backgroundImgUrl})` : undefined,
//               backgroundSize: 'contain',
//               backgroundPosition: 'center',
//               backgroundRepeat: 'no-repeat'
//           }}
//       >
//           <div 
//               className="text-xl md:text-2xl text-soviet-gold bg-red-500/80 p-3 md:self-start rounded"
//               role="status"
//               aria-label="Answer result"
//           >
//               <span className="font-semibold">{messageText}</span>
//           </div>
          
//           {captionText && (
//               <div 
//                   className="bg-black/50 text-white px-4 py-2 rounded-lg font-semibold text-lg backdrop-blur-sm"
//                   role="complementary"
//                   aria-label="Additional feedback information"
//               >
//                   {captionText}
//               </div>
//           )}
//       </div>
//   );
// }

// export default FeedbackOverlay;



// interface FeedbackProps {
//     isVisible: boolean;
//     backgroundImgUrl?: string; // correctClasses.backgroundImage
//     messageText: string; // wrong❌⚠️falsch❌⚠️неправильный
//     captionText?: string; // {correctClasses.displayText}
// }

// const FeedbackOverlay: React.FC<FeedbackProps> = ({
//     isVisible,
//     backgroundImgUrl,
//     messageText,
//     captionText = 'Wrong Answer!'
// }) => {
//     if (isVisible){return (
//         <div 
//         role="alert"
//         aria-live="polite"
//         className={`
//         absolute 
//         inset-0 flex flex-col items-center justify-between z-10
//         `}
//         style={{
//           backgroundImage: `url(${backgroundImgUrl})`,
//           backgroundSize: 'contain',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat'
//         }}>
//           <p className="text-xl md:text-2xl text-soviet-gold bg-red-500/30 p-3 md:self-start">
//             {messageText}
//           </p>
//           <div className="bg-black/50 text-white px-4 py-2 rounded-lg font-semibold text-lg backdrop-blur-sm">
//             {captionText}
//           </div>
//         </div>
//     )} else{
//         return
//     }
    
// }

// export default FeedbackOverlay;