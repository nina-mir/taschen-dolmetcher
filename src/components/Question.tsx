import * as React from "react"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { DotFilledIcon, ResetIcon, EyeClosedIcon, EyeOpenIcon, FaceIcon, PlusIcon } from "@radix-ui/react-icons"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { MediaItem, InfoItem } from '@/types';


import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

function figureQA(fromLanguage: string, toLanguage: string, de: string, en: string[], ru: string)
  : [string, string | string[]] {

  let question = ''
  let answer: string | string[] = ''

  if (fromLanguage === 'de') {
    question = de
  } else if (fromLanguage === 'en') {
    question = en[0]
  } else
    question = ru

  if (toLanguage === 'de') {
    answer = de
  } else if (toLanguage === 'en') {
    answer = en
  } else
    answer = ru

  return [question, answer]
}

const placeholderMaker = (answer: string | string[]): string => {
  // Define what counts as punctuation or whitespace
  const punctuationAndSpace = new Set([
    ' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-',
    '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_',
    '`', '{', '|', '}', '~', '\t', '\n', '\r'
  ]);
  let result = ''
  let firstAnswer = ''
  if (Array.isArray(answer)) {
    firstAnswer = answer[0]
  } else {
    firstAnswer = answer
  }

  for (const char of firstAnswer) {
    if (punctuationAndSpace.has(char)) {
      result += char
    } else {
      result += '-'
    }
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
}

const Question: React.FC<QuestionProps> = ({
  id,
  de,
  en,
  phonetic,
  ru,
  fromLanguage,
  toLanguage,
  media,
  info
}) => {

  const [result, setResult] = useState<boolean>(false)
  const [showInfo, setShowInfo] = useState<string>('hidden')
  const [userInput, setUserInput] = useState<string>('')
  const [showText, setShowText] = useState<boolean>(true)
  // const [ImageIconBG, setImageIconBG] = useState<string>('bg-red-600')


  // console.log(media.imgUrl)

  // Using an object with a type
  type KorrektClasses = {
    bg: string;
    text: string;
    marginB: string;
  };
  const [correctClasses, setCorrectClasses] = useState<KorrektClasses>({
    bg: 'bg-transparent',
    text: 'text-red-600',
    marginB: 'mb-[0rem]'
  });

  // const handleShowText = () => {

  //   if (showText == true)
  //     setImageIconBG('bg-black')
  //   else
  //     setImageIconBG('bg-red-600')

  //   setShowText(prev => !prev)
  // }

  useEffect(() => {
    setCorrectClasses({
      bg: 'bg-transparent',
      text: 'text-red-600',
      marginB: 'mb-[0rem]'
    })
    setUserInput('')
    setResult(false)

  }, [fromLanguage, toLanguage])


  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
  }

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAnswer(userInput, answer)
    }
  }

  const toggleFinalResult = () => {
    if (result) {

    }
    showInfo === 'hidden' ? setShowInfo('') : setShowInfo('hidden')
  }


  const checkAnswer = (userInput: string, answer: string | string[]): boolean => {
    console.log(`userInput is ${userInput} und answer is ${answer}`)
    let isCorrect = false
    if (Array.isArray(answer)) {
      for (const item of answer) {
        if (item.toLowerCase() === userInput.toLowerCase()) {
          isCorrect = true
          break
        }
      }
      //let's do a loop here and do it!
    } else {
      if (userInput.toLowerCase() === answer.toLowerCase()) {
        isCorrect = true
      }
    }

    if (isCorrect) {
      console.log('yessss richtig!')
      setResult(true)
      setCorrectClasses({
        bg: 'bg-red-600',
        text: 'text-yellow-400',
        marginB: 'mb-[1.5rem]'
      })
      setShowInfo('')
      return true
    } else {
      console.log('nein das ist falsch')
      setResult(false)
      return false
    }
  }

  let [question, answer] = figureQA(fromLanguage, toLanguage, de, en, ru)
  // console.log(question)

  return (
    <Card
      // onClick={()=>toggleFinalResult()}
      className={`relative w-[90%] md:w-[600px] ${correctClasses.bg} ${correctClasses.marginB} `}>
      <CardHeader>
        <CardTitle className="text-xl flex flex-row justify-between">
          <div>
            <span className="font-gyst">{id}</span>
            <DotFilledIcon className={`inline w-3 h-3 ${correctClasses.text}`} />
            {question}
          </div>
          <ResetIcon
            className={
              `
            ${correctClasses.text}
            `
            }
          />
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
          backdrop-opacity-[0.9]          `
        }
        // style={{ backgroundImage: `url(${media.imgUrl})` }}
        >
          <div >
            <Collapsible className="absolute data-[state=open]:bg-red-500/50 rounded-t-xl">
              <CollapsibleTrigger className="transition-transform duration-500 ease-in-out data-[state=open]:rotate-45">
                <PlusIcon className="w-6 h-6 bg-red-500 text-soviet-gold border-1 border-soviet-gold" />
              </CollapsibleTrigger>
              <CollapsibleContent className="w-[95%] p-2 text-wrap text-lg data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-500">
                <p className="bg-stone-500 text-white">📷:{media.imgCaption}</p>
              </CollapsibleContent>
            </Collapsible>
            <img src={media.imgUrl} className="rounded-t-xl mr-0" />


            {showText &&
              <div>
                <p className={`
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
                <cite className="ml-1 text-stone-100 text-wrap text-xs md:w-[50%]">{info.sourceChicago}</cite>
              </div>
            }

          </div>


          {/* <div className={`ml-1 text-stone-100 text-wrap absolute bottom-1 ${showText ? 'hidden md:block' : 'block'}`}>
            <p className="md:text-lg mt-1 md:visible md:bottom-2 md:bg-black/40 ">📷: {media.imgCaption}</p>
          </div> */}
          <EyeOpenIcon className={
            `absolute
          ${showInfo}  
          md:-left-35 
          md:top-10
      
          bottom-0
          right-1
          md:w-10 
          md:h-10
          w-10
          h-10
          text-soviet-gold
          `}
            onClick={() => {
              setShowInfo('hidden')
            }} />


          {/* <ImageIcon className={
            `absolute
            ${showInfo}  
            md:hidden       
            bottom-[90%]
            -right-[2px]
            w-8
            h-8
            text-yellow-300
            ${ImageIconBG}
          `
          }
            onClick={handleShowText}
          /> */}
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
        // onInput={handleInput}
        />

        <p className={`${showInfo === 'hidden' ? '' : 'hidden'}`}>
          {de}
          {en}
          {phonetic}
          {ru}
        </p>


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
      </CardContent>
      <CardFooter className={`flex justify-between ${showInfo === 'hidden' ? '' : 'hidden'}`}>
        <Button
          className="font-gyst "
          onClick={() => checkAnswer(userInput, answer)}>SUBMIT</Button>

      </CardFooter>
    </Card>
  )
}

export default Question;

// -top-6
// -right-3
// bg-[url(https://www.yadvashem.org/sites/default/files/styles/main_image_1block/public/1_120.jpg?itok=UAEkXoCj)]
