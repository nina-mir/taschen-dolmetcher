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
  /** The correct translation, shown under the question once it is solved. */
  answerText?: string | null;
  phonetic?: string | null;
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({
  toggleFinalResult: _toggleFinalResult,
  question,
  id,
  textColor,
  idClassName = "font-sans",
  questionId,
  answerText = null,
  phonetic = null,
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

      {answerText && (
        <p className="mt-2 font-garamond-pp text-2xl leading-snug text-white" aria-label={`Correct translation: ${answerText}`}>
          {answerText}
          {phonetic && (
            <span className="block text-lg italic text-white/80">{phonetic}</span>
          )}
        </p>
      )}

      <CardDescription className="sr-only">
        Language learning question {id}. Select the correct translation from the options below.
      </CardDescription>
    </CardHeader>
  )
}

export default QuestionHeader;
