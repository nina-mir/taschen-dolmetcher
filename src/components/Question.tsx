import * as React from "react"
import  { useState } from "react";

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

function figureQA (fromLanguage:string, toLanguage:string, de:string, en:string, ru:string)
: [string, string]
{

  let question = ''
  let answer = ''

  if (fromLanguage === 'de'){
    question = de
  } else if (fromLanguage === 'en'){
    question = en
  } else 
    question = ru

  if (toLanguage === 'de'){
    answer = de
  } else if (toLanguage === 'en'){
    answer = en
  } else 
    answer = ru

  return [question, answer]

}

interface QuestionProps{
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

  let [question, answer] = figureQA (fromLanguage, toLanguage, de, en, ru)
  console.log(question)

  return (
    <Card className="w-[70%] md:w-[400px] bg-transparent">
      <CardHeader>
        <CardTitle>{id}
        <DotFilledIcon className="inline w-3 h-3 text-red-600" />
        {question}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Input className="bg-stone-400 text-stone-100 tracking-[1rem]" 
        placeholder="____"
        onChange={(e)=>{
          console.log(e.target.value)
        }} 
        />
        {de}
        {en}
        {phonetic}
        {ru}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>SUBMIT</Button>
      </CardFooter>
    </Card>
  )
}

export default Question;