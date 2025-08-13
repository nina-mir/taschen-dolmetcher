import * as React from "react"
import QuestionHeader from "./question/QuestionHeader";
import SubmitSection from "./question/SubmitSection";
import AnswerChoices from "./question/AnswerChoices";
import FeedbackOverlay from "./question/FeedbackOverlay";
import ContentSection from "./question/ContentSection";
import { useState, useEffect, useId } from "react";


import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { MediaItem, InfoItem, LanguageType } from '@/types';
// wrong data images
import wrongData from '@/assets/data/wrongAnswerImages.json'

function figureQA(fromLanguage: LanguageType, toLanguage: LanguageType, de: string, en: string[], ru: string)
  : [string, string | string[]] {

  let question = ''
  let answer: string | string[] = ''

  if (fromLanguage == 'de') {
    question = de
  } else if (fromLanguage == 'en') {
    question = en[0]
  } else
    question = ru

  if (toLanguage == 'de') {
    answer = de
  } else if (toLanguage == 'en') {
    answer = en
  } else
    answer = ru

  return [question, answer]
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
}

const MultiChoiceQuestion: React.FC<QuestionProps> = ({
  id,
  de,
  en,
  phonetic,
  ru,
  choices,
  fromLanguage,
  toLanguage,
  media,
  info
}) => {

  const [result, setResult] = useState<boolean>(false)
  const [showInfo, setShowInfo] = useState<string>('hidden')
  // radio group value tracking
  const [selectedValue, setSelectedValue] = useState<string>('');


  // Using an object with a type
  type KorrektClasses = {
    backgroundImage: string,
    bg: string;
    text: string;
    marginB: string;
    showText: boolean;
    displayText: string;
  };
  const [correctClasses, setCorrectClasses] = useState<KorrektClasses>({
    backgroundImage: '',
    bg: 'bg-transparent',
    text: 'text-red-600',
    marginB: 'mb-[0rem]',
    showText: false,
    displayText: ''
  });

  useEffect(() => {
    setCorrectClasses({
      backgroundImage: '',
      bg: 'bg-transparent',
      text: 'text-red-600',
      marginB: 'mb-[0rem]',
      showText: false,
      displayText: ''
    })
    setResult(false)
    setShowInfo('hidden')
    setSelectedValue('')
  }, [fromLanguage, toLanguage])


  const uniqueId = useId(); // Generates a unique ID for this component instance

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selectedValue) {
      checkAnswer(selectedValue, answer)
    }
  }

  const toggleFinalResult = () => {
    if (result) {
      setResult(false)
      setCorrectClasses({
        backgroundImage: '',
        bg: 'bg-transparent',
        text: 'text-red-600',
        marginB: 'mb-[0rem]',
        showText: false,
        displayText: ''
      })
      setSelectedValue('')
      setShowInfo('hidden')
    }
  }


  const checkAnswer = (userInput: string, answer: string | string[]): boolean => {
    // console.log(`userInput is ${userInput} und answer is ${answer}`)
    let isCorrect = false
    if (Array.isArray(answer)) {
      for (const item of answer) {
        if (item.toLowerCase() === userInput.toLowerCase()) {
          isCorrect = true
          break
        }
      }
    } else {
      if (userInput.toLowerCase() === answer.toLowerCase()) {
        isCorrect = true
      }
    }

    if (isCorrect) {
      // console.log('yesss richtig!')
      setResult(true)
      setCorrectClasses({
        backgroundImage: '',
        bg: 'bg-red-600',
        text: 'text-yellow-400',
        marginB: 'mb-[1.5rem]',
        showText: false,
        displayText: ''
      })
      setShowInfo('')
      return true
    } else {
      // console.log('nein das ist falsch')
      handleWrongAnswer()
      setResult(false)
      return false
    }
  }

  const handleWrongAnswer = () => {
    setCorrectClasses({
      backgroundImage: `url(${wrongData[0].imgUrl})`,
      bg: `bg-black`,
      text: 'text-red-600',
      marginB: 'mb-[0rem]',
      showText: true,
      displayText: wrongData[0].altText || 'Wrong Answer!'
    })

    setTimeout(() => {
      setCorrectClasses({
        backgroundImage: '',
        bg: 'bg-transparent',
        text: 'text-red-600',
        marginB: 'mb-[0rem]',
        showText: false,
        displayText: ''
      }); // Revert to the previous state
    }, 3500); // 2000 milliseconds = 2 seconds
  }


  let [question, answer] = figureQA(fromLanguage, toLanguage, de, en, ru)

  // labelClasses specify the radio group's labels' text/style
  const labelClasses = `text-2xl font-garamond-pp`
  // RadioGroup item styling is set via radioItem 
  const radioItem = `border-2 border-stone-600 ml-2  hover:ring-0  group-hover:bg-red-500`


  return (
    <Card
      className={`relative w-[90%]  ${correctClasses.bg} ${correctClasses.marginB}`}
    >
      {/* FeedbackOverlay will be displayed in case of wrong answers */}
      <FeedbackOverlay
        isVisible={correctClasses.showText}
        backgroundImgUrl={wrongData[0].imgUrl}
        messageText="wrong❌⚠️falsch❌⚠️неправильный"
        captionText={wrongData[0].altText}
      />

      <QuestionHeader
        question={question}
        id={id}
        toggleFinalResult={() => toggleFinalResult()}
        textColor={correctClasses.text}
        idClassName="font-gyst"
      />


      <CardContent>
        <ContentSection
          media={media}
          info={info}
          showInfo={showInfo}
          onToggleInfo={setShowInfo}
        />

        <AnswerChoices
          value={selectedValue}
          onValueChange={setSelectedValue}
          onKeyDown={handleEnter}
          showInfo={showInfo}
          choices={choices}
          uniqueId={uniqueId}
          labelClassName={labelClasses}
          radioItemClassName={radioItem}
        />


        {0 > 1 && <p className={`${showInfo === 'hidden' ? '' : 'hidden'}`}>
          {de}
          {en}
          {phonetic}
          {ru}
        </p>
        }

      </CardContent>
      <SubmitSection
        showInfo={showInfo}
        btnClassName="font-gyst"
        checkAnswer={() => checkAnswer(selectedValue, answer)}
      />
    </Card>
  )
}

export default MultiChoiceQuestion;


{/* <div className={
          `${showInfo} 
          w-[100%] 
          max-h-[100vh]
          top-0 
          left-0
          rounded-xl
          md:bg-no-repeat
          md:bg-contain
          bg-cover
          md:bg-right
          bg-center
          md:bg-black/90
          bg-blend-normal
          backdrop-opacity-[0.9]          `
        }
        >
          <div >
            <CollapsibleInfo
              content={<p className="bg-stone-500 text-white">📷:{media.imgCaption}</p>}
              wrapperClassName={`md:hidden absolute data-[state=open]:bg-red-500/50 rounded-t-xl w-[70%]`}
              triggerClassName={`transition-transform duration-500 ease-in-out data-[state=open]:rotate-45`}
              iconClassName={`w-6 h-6 bg-red-500 text-soviet-gold border-1 border-soviet-gold`}
              contentClassName={`w-[95%] p-2 text-wrap text-lg data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-500`}
            />
            <img src={media.imgUrl} className="block md:hidden rounded-t-xl md:rounded-t-none mr-0 md:max-h-[70vh] md:w-[50%]" />

            <div className="hidden md:flex">
              <img src={media.imgUrl} className="rounded-t-xl md:rounded-t-none md:max-h-[70vh] md:w-[50%] my-auto" />
              <div className="flex flex-col gap-3">
                <p className="font-mono text-white text-[1rem] p-2 ">
                  📷:&nbsp;{media.imgCaption}
                </p>
                <Separator className="bg-soviet-gold" />
                <div className={`
                leading-5 
                font-mono
                w-full
                text-stone-50 
                p-2 
                text-[1rem]
                `
                }>
                  {info.text}
                  <CollapsibleInfo
                    defaultOpen={true}
                    content={<cite
                      className="bg-stone-500 text-white block "><b>Source:&nbsp;</b>{info.sourceChicago}
                    </cite>}
                    wrapperClassName={`absolute rounded-t-xl`}
                    triggerClassName={`transition-transform duration-500 ease-in-out data-[state=open]:rotate-45`}
                    iconClassName={`w-3 h-3 bg-red-500 text-soviet-gold border-1 border-soviet-gold`}
                    contentClassName={`w-[85%] p-2 text-wrap text-[0.9rem] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-500`}
                  />
                </div>
              </div>
            </div>

            <div>
              <p className={`
                block
                md:hidden
                leading-5 
                w-full
                font-mono 
                text-stone-50 
                bg-red-900
                md:w-[60%] 
                md:text-[1.2rem] 
                p-2 
                `
              }>
                {info.text}
              </p>

              <cite
                className="block md:hidden ml-1 text-stone-100 text-wrap text-xs md:w-[50%]">
                {info.sourceChicago}
              </cite>



              <EyeOpenIcon
                className={
                  `absolute
                ${showInfo}  
                bottom-0
                right-1
                w-10
                h-10
                text-soviet-gold
                `}
                onClick={() => {
                  setShowInfo('hidden')
                }} />

              {result && <EyeClosedIcon className={
                `absolute 
                ${showInfo === 'hidden' ? '' : 'hidden'}    
                md:-left-35 
                md:top-10 
                bottom-0
                right-1
                w-10 
                h-10
              md:text-red-400
                ${correctClasses.text}
                `}
                onClick={() => {
                  setShowInfo('')
                }} />
              }
            </div>


          </div>



        </div> */}