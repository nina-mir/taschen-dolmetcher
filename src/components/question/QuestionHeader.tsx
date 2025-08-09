import { DotFilledIcon, ResetIcon } from "@radix-ui/react-icons"


interface QuestionHeaderProps {
    question: string;
    id: number;
    textColor: string; // correctClasses.text
}


const QuestionHeader: React.FC = () => {
    return (
        <>
            <div>
                <span className="font-gyst">{id}</span>
                <DotFilledIcon className={`inline w-3 h-3 ${correctClasses.text}`} />
                {question}
            </div>
            <ResetIcon
                onClick={() => toggleFinalResult()}

                className={
                    `${correctClasses.text}`
                }
            />

        </>
    )
}

export default QuestionHeader;