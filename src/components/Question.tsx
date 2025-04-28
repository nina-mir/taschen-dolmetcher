import * as React from "react"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { DotFilledIcon, ResetIcon } from "@radix-ui/react-icons"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


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
  if (Array.isArray(answer)){
    firstAnswer = answer[0]
  } else{
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
}


const Question: React.FC<QuestionProps> = ({
  id,
  de,
  en,
  phonetic,
  ru,
  fromLanguage,
  toLanguage
}) => {

  const [result, setResult] = useState<boolean>(false)
  const [showInfo, setShowInfo] = useState<string>('hidden')
  const [userInput, setUserInput] = useState<string>('')
  // Using an object with a type
  type KorrektColorClasses = {
    bg: string;
    text: string;
  };
  const [colors, setColors] = useState<KorrektColorClasses>({
    bg: 'bg-transparent',
    text: 'text-red-600'
  });
  // const [bgColor, setBgColor] = useState<[string, string]>(['bg-transparent', 'text-red-600'])

  useEffect(()=>{
    setColors({
      bg: 'bg-transparent',
      text: 'text-red-600'
    })
    setUserInput('')
    setResult(false)

  }, [fromLanguage, toLanguage])


  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
  }

  const handleEnter = (e: React.KeyboardEvent) =>{
    if (e.key === 'Enter'){
      checkAnswer(userInput, answer)
    }
  }

  const checkAnswer = (userInput: string, answer: string|string[]): boolean => {
    console.log(`userInput is ${userInput} und answer is ${answer}`)
    let isCorrect = false
    if (Array.isArray(answer)){
      for (const item of answer){
        if (item.toLowerCase() === userInput.toLowerCase()){
          isCorrect = true
          break
        }
      }
      //let's do a loop here and do it!
    } else{
      if (userInput.toLowerCase() === answer.toLowerCase()) {
        isCorrect = true
      }
    }

    if (isCorrect) {
      console.log('yessss richtig!')
      setResult(true)
      setColors({
        bg: 'bg-red-600', 
        text: 'text-yellow-400'
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
    <Card className={`relative w-[90%] md:w-[400px] ${colors.bg} `}>
      <CardHeader>
        <CardTitle className="text-xl flex flex-row justify-between">
          <div>
            <span className=" font-gyst">{id}</span>
          <DotFilledIcon className={`inline w-3 h-3 ${colors.text}`} />
          {question}
          </div>
          <ResetIcon 
          className={
            `
            ${colors.text}
            `
          } 
          />
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`${showInfo} absolute w-[100%] h-[100%] top-0 left-0 rounded-xl bg-blue-500`}>
          this is a test
        </div>
        <Input className="
        font-garamond-pp
        bg-stone-400
      text-stone-100 
        placeholder:tracking-[0.2rem]
        text-2xl
        "
          placeholder={placeholderMaker(answer)}
          onChange={update}
          onKeyDown={handleEnter}
          value={userInput}
        // onInput={handleInput}
        />
        {de}
        {en}
        {phonetic}
        {ru}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
        className="font-gyst"
        onClick={() => checkAnswer(userInput, answer)}>SUBMIT</Button>
      </CardFooter>
    </Card>
  )
}

export default Question;

// const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const input = e.target;
//   const currValue = input.value;
//   const placeholder = input.placeholder; // The template with '-' characters

//   let newValue = '';

//   // Get the cursor position before any changes
//   const cursorPos = input.selectionStart || 0;

//   console.log('currVal', currValue)
//   console.log('cursorPos', cursorPos)

//   for (let i = 0; i < currValue.length; i++) {
//     if (currValue[i] !== '-')
//       newValue += currValue[i]
//   }

//   newValue += '&'

//   console.log('newValue', newValue)

//   let newCursorPos = input.selectionStart;

//   input.setSelectionRange(newCursorPos + 1, newCursorPos + 1);

//   newCursorPos = input.selectionStart;


//   console.log('new cursorPos', newCursorPos)

//   input.value = newValue;

// };
