import { DotFilledIcon } from "@radix-ui/react-icons"
import {
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"

interface QuestionHeaderProps {
  toggleFinalResult: () => void;
  question: string;
  id: number;
  textColor: string;
  idClassName: string;
  questionId: string;
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({
  toggleFinalResult: _toggleFinalResult,
  question,
  id,
  textColor,
  idClassName = "font-sans",
  questionId,
}) => {
  return (
    <CardHeader>
      <CardTitle className="text-xl flex flex-row justify-between items-start gap-4">
        <div>
          <span
            aria-label={`Question ${id}`}
            className={idClassName}
          >
            {id}
          </span>
          <DotFilledIcon
            className={`inline w-4 h-4 ${textColor}`}
            aria-hidden="true"
          />
          <h2
            className="inline"
            id={questionId}
            tabIndex={0}
          >
            {question}
          </h2>
        </div>
      </CardTitle>

      <CardDescription className="sr-only">
        Language learning question {id}. Select the correct translation from the options below.
      </CardDescription>
    </CardHeader>
  )
}

export default QuestionHeader;
