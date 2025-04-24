import * as React from "react"
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { DotFilledIcon, ShadowIcon } from "@radix-ui/react-icons"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

function figureQA(fromLanguage: string, toLanguage: string, de: string, en: string, ru: string)
  : [string, string] {

  let question = ''
  let answer = ''

  if (fromLanguage === 'de') {
    question = de
  } else if (fromLanguage === 'en') {
    question = en
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





const placeholderMaker = (answer: string): string => {
  // Define what counts as punctuation or whitespace
  const punctuationAndSpace = new Set([
    ' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-',
    '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_',
    '`', '{', '|', '}', '~', '\t', '\n', '\r'
  ]);
  let result = ''
  for (const char of answer) {
    if (punctuationAndSpace.has(char)) {
      result += char
    } else {
      result += '-'
    }
  }

  return result
}

const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const input = e.target;
  const currValue = input.value;
  const placeholder = input.placeholder; // The template with '-' characters

  let newValue = '';

  // Get the cursor position before any changes
  const cursorPos = input.selectionStart || 0;

  console.log('currVal', currValue)
  console.log('cursorPos', cursorPos)

  for (let i = 0; i < currValue.length; i++) {
    if (currValue[i] !== '-')
      newValue += currValue[i]
  }

  newValue += '&'

  console.log('newValue', newValue)

  let newCursorPos = input.selectionStart;

  input.setSelectionRange(newCursorPos + 1, newCursorPos + 1);

  newCursorPos = input.selectionStart;


  console.log('new cursorPos', newCursorPos)

  input.value = newValue;

};

interface QuestionProps {
  id: string;
  de: string;
  en: string;
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

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
  }

  const checkAnswer = (userInput: string, answer: string): boolean => {
    if (userInput.toLowerCase() === answer.toLowerCase()) {
      console.log('yessss richtig!')
      setResult(true)
      setColors({
        bg: 'bg-red-600', 
        text: 'text-yellow-400'
      })

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
    <Card className={`w-[70%] md:w-[400px] ${colors.bg} `}>
      <CardHeader>
        <CardTitle>{id}
          <DotFilledIcon className={`inline w-3 h-3 ${colors.text}`} />
          {question}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Input className="
        font-garamond-pp
        bg-stone-400
      text-stone-100 
        placeholder:tracking-[0.2rem]
        text-2xl
        "
          placeholder={placeholderMaker(answer)}
          onChange={update}
        // onInput={handleInput}
        />
        {de}
        {en}
        {phonetic}
        {ru}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => checkAnswer(answer, userInput)}>SUBMIT</Button>
      </CardFooter>
    </Card>
  )
}

export default Question;