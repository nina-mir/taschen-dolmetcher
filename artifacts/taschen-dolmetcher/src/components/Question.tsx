import * as React from "react"
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { DotFilledIcon, EyeClosedIcon, EyeOpenIcon, PlusIcon } from "@radix-ui/react-icons"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { MediaItem, InfoItem } from '@/types';
import { figureQA } from '@/utils/questionHelpers';
import FeedbackOverlay from './question/FeedbackOverlay'
import wrongData from '@/assets/data/wrongAnswerImages.json'
import { hapticCorrect, hapticWrong } from '@/utils/haptics'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const normalizeAnswer = (str: string): string =>
  str.toLowerCase().trim().replace(/[!?.,'":;…—–]+/g, '').replace(/\s+/g, ' ').trim()

const placeholderMaker = (answer: string | string[]): string => {
  const punctuationAndSpace = new Set([
    ' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-',
    '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_',
    '`', '{', '|', '}', '~', '\t', '\n', '\r'
  ]);
  const firstAnswer = Array.isArray(answer) ? answer[0] : answer
  let result = ''
  for (const char of firstAnswer) {
    result += punctuationAndSpace.has(char) ? char : '-'
  }
  return result
}

interface QuestionProps {
  id: number;
  de: string;
  en: string[];
  phonetic?: string;
  ru: string;
  fromLanguage: string;
  toLanguage: string;
  media: MediaItem;
  info: InfoItem;
  onAnswer: (isCorrect: boolean) => void;
}

type KorrektClasses = {
  bg: string;
  text: string;
  marginB: string;
};

const DEFAULT_CLASSES: KorrektClasses = {
  bg: 'bg-transparent',
  text: 'text-red-600',
  marginB: 'mb-[0rem]',
}

const Question: React.FC<QuestionProps> = ({
  id,
  de,
  en,
  phonetic: _phonetic,
  ru,
  fromLanguage,
  toLanguage,
  media,
  info,
  onAnswer,
}) => {
  const [result, setResult] = useState<boolean>(false)
  const [showInfo, setShowInfo] = useState<string>('hidden')
  const [userInput, setUserInput] = useState<string>('')
  const [correctClasses, setCorrectClasses] = useState<KorrektClasses>(DEFAULT_CLASSES);
  const [wrongAttempts, setWrongAttempts] = useState<number>(0)
  const [showWrongOverlay, setShowWrongOverlay] = useState<boolean>(false)
  const [wrongImgUrl, setWrongImgUrl] = useState<string>('')
  const [wrongCaption, setWrongCaption] = useState<string>('')
  const wrongTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setCorrectClasses(DEFAULT_CLASSES)
    setUserInput('')
    setResult(false)
    setWrongAttempts(0)
    setShowWrongOverlay(false)
    return () => {
      if (wrongTimeoutRef.current) clearTimeout(wrongTimeoutRef.current)
    }
  }, [fromLanguage, toLanguage])

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
  }

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAnswer(userInput, answer)
    }
  }

  const handleOverlayDismiss = () => {
    if (wrongTimeoutRef.current) {
      clearTimeout(wrongTimeoutRef.current)
      wrongTimeoutRef.current = null
    }
    setShowWrongOverlay(false)
  }

  const checkAnswer = (input: string, ans: string | string[]): boolean => {
    let isCorrect = false
    if (Array.isArray(ans)) {
      for (const item of ans) {
        if (normalizeAnswer(item) === normalizeAnswer(input)) {
          isCorrect = true
          break
        }
      }
    } else {
      if (normalizeAnswer(input) === normalizeAnswer(ans)) {
        isCorrect = true
      }
    }

    onAnswer(isCorrect)

    if (isCorrect) {
      hapticCorrect()
      setResult(true)
      setCorrectClasses({
        bg: 'bg-red-600',
        text: 'text-yellow-400',
        marginB: 'mb-[1.5rem]',
      })
      setShowInfo('')
      return true
    } else {
      hapticWrong()
      const newAttempts = wrongAttempts + 1
      setWrongAttempts(newAttempts)
      const wrongEntry = wrongData[Math.floor(Math.random() * wrongData.length)]
      setWrongImgUrl(wrongEntry.imgUrl)
      setWrongCaption(wrongEntry.imgCaption || '')
      setShowWrongOverlay(true)
      if (wrongTimeoutRef.current) clearTimeout(wrongTimeoutRef.current)
      wrongTimeoutRef.current = setTimeout(() => {
        setShowWrongOverlay(false)
      }, 3500)
      setResult(false)
      return false
    }
  }

  const [question, answer] = figureQA(fromLanguage as any, toLanguage as any, de, en, ru)
  const revealText = wrongAttempts >= 3 && !result
    ? (Array.isArray(answer) ? answer[0] : answer)
    : null

  return (
    <Card
      className={`relative w-[90%] md:w-[600px] ${correctClasses.bg} ${correctClasses.marginB} ${showInfo !== 'hidden' ? 'z-10' : ''}`}
    >
      <FeedbackOverlay
        isVisible={showWrongOverlay}
        backgroundImgUrl={wrongImgUrl}
        messageText="Incorrect ❌⚠️"
        captionText={wrongCaption}
        ariaLabel="Answer feedback"
        onDismiss={handleOverlayDismiss}
      />

      <CardHeader>
        <CardTitle className="text-xl flex flex-row justify-between">
          <div>
            <span className="font-gyst">{id}</span>
            <DotFilledIcon className={`inline w-3 h-3 ${correctClasses.text}`} />
            {question}
          </div>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className={
          `${showInfo}
          md:w-[180%]
          w-[100%]
          max-h-[100vh]
          top-0
          md:-left-50
          left-0
          rounded-xl
          md:bg-no-repeat
          md:bg-contain
          bg-cover
          md:bg-right
          bg-center
          md:bg-black/90
          bg-blend-normal
          backdrop-opacity-[0.9]`
        }>
          <div>
            {/* Mobile only: collapsible caption toggle */}
            <div className="md:hidden">
              <Collapsible className="absolute data-[state=open]:bg-red-500/50 rounded-t-xl">
                <CollapsibleTrigger className="transition-transform duration-500 ease-in-out data-[state=open]:rotate-45">
                  <PlusIcon className="w-6 h-6 bg-red-500 text-soviet-gold border-1 border-soviet-gold" />
                </CollapsibleTrigger>
                <CollapsibleContent className="w-[95%] p-2 text-wrap text-lg data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-500">
                  <p className="bg-stone-500 text-white">📷:{media.imgCaption}</p>
                </CollapsibleContent>
              </Collapsible>
            </div>
            <img src={media.imgUrl} className="rounded-t-xl mr-0" alt={media.altText || ''} />
            {/* Desktop only: caption shown inline, no floating overlay */}
            <p className="hidden md:block font-mono text-white text-sm p-2 bg-stone-700/60">
              📷 {media.imgCaption}
            </p>

            <div>
              <p className="leading-5 w-full font-mono text-stone-50 bg-red-900 md:w-[60%] md:text-[1.2rem] p-2">
                {info.text}
              </p>
              <cite className="ml-1 text-stone-100 text-wrap text-xs md:w-[50%]">{info.sourceChicago}</cite>
            </div>
          </div>

          <EyeOpenIcon
            className={`absolute ${showInfo} bottom-0 right-1 md:w-10 md:h-10 w-10 h-10 text-soviet-gold`}
            onClick={() => setShowInfo('hidden')}
          />
        </div>

        <Input
          className={`
            ${showInfo === 'hidden' ? '' : 'hidden'}
            font-garamond-pp
            bg-stone-400
            text-stone-100
            placeholder:tracking-[0.2rem]
            text-2xl
          `}
          placeholder={placeholderMaker(answer)}
          onChange={update}
          onKeyDown={handleEnter}
          value={userInput}
        />

        {revealText && (
          <div className="mt-2 px-3 py-2 bg-soviet-gold/20 border border-soviet-gold/60 rounded font-garamond-pp text-base">
            <span className="text-stone-500 text-sm">answer: </span>
            <span className="font-semibold text-stone-800">{revealText}</span>
          </div>
        )}

        {result && (
          <EyeClosedIcon
            className={`absolute ${showInfo === 'hidden' ? '' : 'hidden'} md:-left-35 md:top-10 bottom-0 right-1 w-10 h-10 md:text-red-400 ${correctClasses.text}`}
            onClick={() => setShowInfo('')}
          />
        )}
      </CardContent>
      <CardFooter className={`flex justify-between ${showInfo === 'hidden' ? '' : 'hidden'}`}>
        <Button
          className="font-gyst"
          onClick={() => checkAnswer(userInput, answer)}
        >
          SUBMIT
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Question;
