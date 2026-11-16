import QuestionHeader from "./QuestionHeader";
import SubmitSection from "./SubmitSection";
import AnswerChoices from "./AnswerChoices";
import FeedbackOverlay from "./FeedbackOverlay";
import ContentSection from "./ContentSection";
import { useState, useEffect, useId, useMemo } from "react";

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { MediaItem, InfoItem, LanguageType } from '@/types';
import { figureQA } from '@/utils/questionHelpers';
import wrongData from '@/assets/data/wrongAnswerImages.json'
import { hapticCorrect, hapticWrong } from '@/utils/haptics'
import { preloadImage } from '@/utils/preloadImage'

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface QuestionProps {
  id: number;
  de: string;
  en: string[];
  phonetic?: string;
  ru: string;
  choices: string[];
  fromLanguage: LanguageType;
  toLanguage: LanguageType;
  media: MediaItem;
  info: InfoItem;
  onAnswer: (isCorrect: boolean) => void;
}

type KorrektClasses = {
  backgroundImage: string;
  bg: string;
  text: string;
  marginB: string;
  showText: boolean;
  displayText: string;
  wrongImgUrl: string;
  wrongCaption: string;
};

const DEFAULT_CLASSES: KorrektClasses = {
  backgroundImage: '',
  bg: 'bg-transparent',
  text: 'text-red-600',
  marginB: 'mb-[0rem]',
  showText: false,
  displayText: '',
  wrongImgUrl: '',
  wrongCaption: '',
}

const MultiChoiceQuestion: React.FC<QuestionProps> = ({
  id,
  de,
  en,
  phonetic: _phonetic,
  ru,
  choices,
  fromLanguage,
  toLanguage,
  media,
  info,
  onAnswer,
}) => {
  const [result, setResult] = useState<boolean>(false)
  const [showInfo, setShowInfo] = useState<string>('hidden')
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [correctClasses, setCorrectClasses] = useState<KorrektClasses>(DEFAULT_CLASSES);
  const [wrongAttempts, setWrongAttempts] = useState<number>(0);
  const [wrongChoices, setWrongChoices] = useState<string[]>([]);

  useEffect(() => {
    setCorrectClasses(DEFAULT_CLASSES)
    setResult(false)
    setShowInfo('hidden')
    setSelectedValue('')
    setFeedbackMessage('')
    setWrongAttempts(0)
    setWrongChoices([])
  }, [fromLanguage, toLanguage])

  const uniqueId = useId();
  const questionId = `question-${uniqueId}`;
  const radioGroupId = `radio-group-${uniqueId}`;
  const feedbackId = `feedback-${uniqueId}`;

  const [question, answer] = figureQA(fromLanguage, toLanguage, de, en, ru)
  const shuffledChoices = useMemo(() => shuffleArray(choices), [choices])

  const revealCorrect = wrongAttempts >= 3
    ? shuffledChoices.find(c =>
        Array.isArray(answer)
          ? answer.some(a => a.toLowerCase() === c.toLowerCase())
          : c.toLowerCase() === (answer as string).toLowerCase()
      ) ?? null
    : null

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selectedValue) {
      checkAnswer(selectedValue, answer)
    }
  }

  const toggleFinalResult = () => {
    if (result) {
      setResult(false)
      setCorrectClasses(DEFAULT_CLASSES)
      setSelectedValue('')
      setShowInfo('hidden')
      setFeedbackMessage('')
      setWrongChoices([])
    }
  }

  const handleOverlayDismiss = () => {
    setCorrectClasses(DEFAULT_CLASSES)
    setFeedbackMessage('')
  }

  // Picking another choice clears the wrong-answer strip, and starts
  // fetching this card's photo so it is ready when the answer is right.
  const handleSelect = (value: string) => {
    setSelectedValue(value)
    if (correctClasses.showText) handleOverlayDismiss()
    preloadImage(media.imgUrl)
  }

  const checkAnswer = (userInput: string, ans: string | string[]): boolean => {
    let isCorrect = false
    if (Array.isArray(ans)) {
      for (const item of ans) {
        if (item.toLowerCase() === userInput.toLowerCase()) {
          isCorrect = true
          break
        }
      }
    } else {
      if (userInput.toLowerCase() === ans.toLowerCase()) {
        isCorrect = true
      }
    }

    onAnswer(isCorrect)

    if (isCorrect) {
      hapticCorrect()
      setResult(true)
      setFeedbackMessage('Correct answer!')
      setCorrectClasses({
        backgroundImage: '',
        bg: 'bg-red-600',
        text: 'text-yellow-400',
        marginB: 'mb-[1.5rem]',
        showText: false,
        displayText: '',
        wrongImgUrl: '',
        wrongCaption: '',
      })
      setShowInfo('')
      return true
    } else {
      handleWrongAnswer(userInput)
      setResult(false)
      return false
    }
  }

  const handleWrongAnswer = (wrongChoice: string) => {
    hapticWrong()
    setWrongAttempts(prev => prev + 1)
    setWrongChoices(prev => prev.includes(wrongChoice) ? prev : [...prev, wrongChoice])
    setSelectedValue('')
    const wrongEntry = wrongData[Math.floor(Math.random() * wrongData.length)]
    setFeedbackMessage('Incorrect answer. Please try again.')
    setCorrectClasses({
      backgroundImage: '',
      bg: 'bg-transparent',
      text: 'text-red-600',
      marginB: 'mb-[0rem]',
      showText: true,
      displayText: wrongEntry.altText || 'Wrong Answer!',
      wrongImgUrl: wrongEntry.imgUrl,
      wrongCaption: wrongEntry.imgCaption || 'Wrong Answer!',
    })
  }

  const labelClasses = `text-2xl font-garamond-pp`
  const radioItem = `border-2 border-stone-600 ml-2 hover:ring-0 group-hover:bg-red-500 focus:ring-1 focus:ring-red-500 focus:ring-offset-1`

  return (
    <Card
      className={`relative w-[90%] ${correctClasses.bg} ${correctClasses.marginB} ${showInfo !== 'hidden' ? 'z-10' : ''}`}
      role="region"
      aria-labelledby={questionId}
      aria-describedby={feedbackMessage ? feedbackId : undefined}
    >
      <div
        id={feedbackId}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {feedbackMessage}
      </div>

      <QuestionHeader
        question={question}
        id={id}
        toggleFinalResult={toggleFinalResult}
        textColor={correctClasses.text}
        idClassName="font-gyst"
        questionId={questionId}
      />

      <CardContent>
        <ContentSection
          media={media}
          info={info}
          showInfo={showInfo}
          onToggleInfo={setShowInfo}
        />

        <fieldset
          id={radioGroupId}
          aria-labelledby={questionId}
          aria-required="true"
          aria-invalid={result === false && selectedValue !== '' ? 'true' : 'false'}
        >
          <legend className="sr-only">
            Choose the correct translation from the options below
          </legend>

          <AnswerChoices
            value={selectedValue}
            onValueChange={handleSelect}
            onKeyDown={handleEnter}
            showInfo={showInfo}
            choices={shuffledChoices}
            uniqueId={uniqueId}
            labelClassName={labelClasses}
            radioItemClassName={radioItem}
            groupId={radioGroupId}
            questionId={questionId}
            revealCorrect={revealCorrect}
            wrongChoices={wrongChoices}
          />
        </fieldset>
      </CardContent>

      <SubmitSection
        hideBtn={showInfo === 'hidden' ? '' : 'hidden'}
        btnClassName="font-gyst"
        checkAnswer={() => checkAnswer(selectedValue, answer)}
        disabled={!selectedValue}
        ariaDescribedby={questionId}
      />

      <FeedbackOverlay
        isVisible={correctClasses.showText}
        backgroundImgUrl={correctClasses.wrongImgUrl}
        messageText="Incorrect — try again"
        captionText={correctClasses.wrongCaption}
        ariaLabel="Answer feedback"
        onDismiss={handleOverlayDismiss}
      />
    </Card>
  )
}

export default MultiChoiceQuestion;
