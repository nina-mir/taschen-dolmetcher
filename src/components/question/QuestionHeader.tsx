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
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({
    toggleFinalResult,
    question,
    id,
    textColor,
    idClassName = "font-sans" //tailwind class to fallback
}) => {
    return (
        <CardHeader>

            <CardTitle className="text-xl flex flex-row justify-between">

                <div>
                    <span className={idClassName}>{id}</span>
                    <DotFilledIcon className={`inline w-3 h-3 ${textColor}`} />
                    {question}
                </div>
                <ResetIcon
                    onClick={toggleFinalResult}
                    className={
                        `${textColor}`
                    }
                />

            </CardTitle>
            <CardDescription></CardDescription>
        </CardHeader>

    )
}

export default QuestionHeader;