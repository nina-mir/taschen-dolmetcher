/*
 QuestionHeader
 Contains the question ID, dot indicator, question text, and reset button
 Handles the title display logic and reset functionality
*/

import { DotFilledIcon, ResetIcon } from "@radix-ui/react-icons"
import {
    CardHeader,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"

interface QuestionHeaderProps {
    toggleFinalResult: () => void;
    question: string;
    id: number;
    textColor: string; // correctClasses.text is a tailwind utility class
    idClassName: string;
    questionId: string;
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({
    toggleFinalResult,
    question,
    id,
    textColor,
    idClassName = "font-sans", //tailwind class to fallback
    questionId
}) => {

    const handleResetKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleFinalResult();
        }
    };

    return (
        <CardHeader>
            <CardTitle className="text-xl flex flex-row justify-between items-start gap-4">

                <div>
                    <span
                        aria-label={`Question ${id}`}
                        className={idClassName}>
                        {id}
                    </span>
                    <DotFilledIcon
                        className={`inline w-4 h-4 ${textColor}`}
                        aria-hidden="true" />
                    <h2
                        className="inline"
                        id={questionId}
                        tabIndex={0}
                    >
                        {question}
                    </h2>
                </div>

                <button
                    onClick={toggleFinalResult}
                    onKeyDown={handleResetKeyDown}
                    className={`
                        ${textColor} 
                        p-2 rounded-full 
                        hover:bg-stone-400
                        hover:text-black 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-soviet-gold 
                        focus:ring-offset-1
                        transition-colors duration-200
                        flex-shrink-0
                    `}
                    aria-label="Reset question and clear your answer"
                    title="Reset question"
                    type="button"
                >
                    <ResetIcon
                        className="w-5 h-5"
                        aria-hidden="true"
                    />
                </button>

            </CardTitle>

            <CardDescription className="sr-only">
                Language learning question {id}. Select the correct translation from the options below.
            </CardDescription>
        </CardHeader>
    )
}

export default QuestionHeader;

// import { DotFilledIcon, ResetIcon } from "@radix-ui/react-icons"
// import {
//     CardHeader,
//     CardDescription,
//     CardTitle,
// } from "@/components/ui/card"

// interface QuestionHeaderProps {
//     toggleFinalResult: () => void;
//     question: string;
//     id: number;
//     textColor: string; // correctClasses.text is a tailwind utility class
//     idClassName: string;
// }

// const QuestionHeader: React.FC<QuestionHeaderProps> = ({
//     toggleFinalResult,
//     question,
//     id,
//     textColor,
//     idClassName = "font-sans" //tailwind class to fallback
// }) => {
//     return (
//         <CardHeader>

//             <CardTitle className="text-xl flex flex-row justify-between">

//                 <div>
//                     <span className={idClassName}>{id}</span>
//                     <DotFilledIcon className={`inline w-3 h-3 ${textColor}`} />
//                     {question}
//                 </div>
//                 <ResetIcon
//                     onClick={toggleFinalResult}
//                     className={
//                         `${textColor}`
//                     }
//                 />

//             </CardTitle>
//             <CardDescription></CardDescription>
//         </CardHeader>

//     )
// }

// export default QuestionHeader;