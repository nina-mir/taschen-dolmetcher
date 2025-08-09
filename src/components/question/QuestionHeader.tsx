import { DotFilledIcon, ResetIcon } from "@radix-ui/react-icons"


interface QuestionHeaderProps {
    toggleFinalResult: ()=>void;
    question: string;
    id: number;
    textColor: string; // correctClasses.text is a tailwind utility class
}


const QuestionHeader: React.FC<QuestionHeaderProps> = ({
    toggleFinalResult, 
    question,
    id, 
    textColor
}) => {
    return (
        <>
            <div>
                <span className="font-gyst">{id}</span>
                <DotFilledIcon className={`inline w-3 h-3 ${textColor}`} />
                {question}
            </div>
            <ResetIcon
                onClick={() => toggleFinalResult()}

                className={
                    `${textColor}`
                }
            />

        </>
    )
}

export default QuestionHeader;