import QuestionHeader from "./QuestionHeader";
import SubmitSection from "./SubmitSection";
import AnswerChoices from "./AnswerChoices";
import FeedbackOverlay from "./FeedbackOverlay";
import ContentSection from "./ContentSection";
import { useState, useEffect, useId } from "react";

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { MediaItem, InfoItem, LanguageType } from '@/types';
import { figureQA } from '@/utils/questionHelpers';
import wrongData from '@/assets/data/wrongAnswerImages.json'

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

  useEffect(() => {
    setCorrectClasses(DEFAULT_CLASSES)
    setResult(false)
    setShowInfo('hidden')
    setSelectedValue('')
    setFeedbackMessage('')
  }, [fromLanguage, toLanguage])

  const uniqueId = useId();
  const questionId = `question-${uniqueId}`;
  const radioGroupId = `radio-group-${uniqueId}`;
  const feedbackId = `feedback-${uniqueId}`;

  const [question, answer] = figureQA(fromLanguage, toLanguage, de, en, ru)

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
    }
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
      handleWrongAnswer()
      setResult(false)
      return false
    }
  }

  const handleWrongAnswer = () => {
    const wrongEntry = wrongData[Math.floor(Math.random() * wrongData.length)]
    setFeedbackMessage('Incorrect answer. Please try again.')
    setCorrectClasses({
      backgroundImage: `url(${wrongEntry.imgUrl})`,
      bg: 'bg-black',
      text: 'text-red-600',
      marginB: 'mb-[0rem]',
      showText: true,
      displayText: wrongEntry.altText || 'Wrong Answer!',
      wrongImgUrl: wrongEntry.imgUrl,
      wrongCaption: wrongEntry.imgCaption || 'Wrong Answer!',
    })

    setTimeout(() => {
      setCorrectClasses(DEFAULT_CLASSES)
      setFeedbackMessage('')
    }, 3500);
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

      <FeedbackOverlay
        isVisible={correctClasses.showText}
        backgroundImgUrl={correctClasses.wrongImgUrl}
        messageText="Incorrect ❌⚠️"
        captionText={correctClasses.wrongCaption}
        ariaLabel="Answer feedback"
      />

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
            onValueChange={setSelectedValue}
            onKeyDown={handleEnter}
            showInfo={showInfo}
            choices={choices}
            uniqueId={uniqueId}
            labelClassName={labelClasses}
            radioItemClassName={radioItem}
            groupId={radioGroupId}
            questionId={questionId}
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
    </Card>
  )
}

export default MultiChoiceQuestion;
