import * as React from "react"
import  { useState } from "react";

import { Button } from "@/components/ui/button"
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

function makeInstruction(from: string, to:string):string {

  switch (from){
    case 'de':
      return `Schreiben Sie die richtige Übersetzung von ${from} nach ${to}!`
    case 'en':
      return `Write the correct translation from ${from} to ${to}`
    case 'ru':
      return `Напишите правильный перевод с ${from} на ${to}`
    default:
      return `Etwas ist kaput!!👎🏽😵 refresh, пожалуйста!😺`
  }

}

["Schreiben Sie die richtige Übersetzung von [] nach ()"]

interface QuestionProps{
    id: string;
    de: string;
    en: string;
    phonetic?: string;
    ru: string;
    fromLanguage: string;
    toLangueg: string;
}


const Question: React.FC<QuestionProps> = ({
  id,
  de,
  en,
  phonetic,
  ru,
  fromLanguage,
  toLangueg
}) => {

  const [result, setResult] = useState<boolean>(false)


  return (
    <Card className="w-[70%] md:w-[400px] bg-transparent">
      <CardHeader>
        <CardTitle>{id}</CardTitle>
        <CardDescription>{makeInstruction(fromLanguage, toLangueg)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Write your answer here!</p>
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