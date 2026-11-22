import { useId } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import QuestionHeader from '@/components/question/QuestionHeader'
import ContentSection from '@/components/question/ContentSection'
import { InfoItem, MediaItem } from '@/types'

interface SolvedCardProps {
  id: number;
  question: string;
  answer: string;
  phonetic?: string | null;
  media: MediaItem;
  info: InfoItem;
}

/**
 * A question already answered correctly, shown read-only: the phrase, its
 * translation, the photo and the reading. Used when looking back with
 * Previous, and when returning to a solved card.
 */
const SolvedCard: React.FC<SolvedCardProps> = ({ id, question, answer, phonetic, media, info }) => {
  const questionId = `question-solved-${useId()}`
  return (
    <Card
      className="relative z-10 w-[90%] mb-[1.5rem] bg-red-600"
      role="region"
      aria-labelledby={questionId}
    >
      <QuestionHeader
        question={question}
        id={id}
        toggleFinalResult={() => {}}
        textColor="text-yellow-400"
        idClassName="font-gyst"
        questionId={questionId}
        answerText={answer}
        phonetic={phonetic}
      />
      <CardContent>
        <ContentSection media={media} info={info} showInfo="" />
      </CardContent>
    </Card>
  )
}

export default SolvedCard
