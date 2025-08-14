/* 
SubmitSection

The footer with the submit button
Could be expanded to include other action buttons

TO-DO:

Progress Indication
For multiple questions, consider adding progress indicators:
typescriptaria-label={`Submit answer for question ${currentQuestion} of ${totalQuestions}`}
*/

import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"

interface SubmitProps {
    showInfo: string;
    btnClassName: string;
    checkAnswer: () => void;
    disabled?: boolean;
    ariaDescribedby?: string;
    isLoading?: boolean;
}

const SubmitSection: React.FC<SubmitProps> = ({
    showInfo,
    btnClassName = "font-sans",
    checkAnswer,
    disabled = false,
    ariaDescribedby,
    isLoading = false
}) => {

    const isHidden = showInfo !== 'hidden';


    return (
        <CardFooter
            role="contentinfo"
            aria-label="Question submission area"
            className={`flex justify-between ${isHidden ? 'hidden' : ''}`}
        >
            <Button
                type="submit"
                className={btnClassName}
                onClick={checkAnswer}
                disabled={disabled || isLoading}
                aria-describedby={ariaDescribedby}
                aria-label={disabled ? "Select an answer before submitting" : "Submit your answer"}
            >{isLoading ? (
                <>
                    <span className="sr-only">Checking answer...</span>
                    <span aria-hidden="true">CHECKING...</span>
                </>
            ) : (
                "SUBMIT"
            )}</Button>
            {disabled && (
                <div 
                    className="sr-only" 
                    id="submit-instruction"
                    aria-live="polite"
                >
                    Please select an answer option before submitting
                </div>
            )}
        </CardFooter>
    )
}

export default SubmitSection