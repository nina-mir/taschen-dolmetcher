import {QuestionType} from '@/types';
import { TokensIcon, KeyboardIcon, DotsVerticalIcon } from "@radix-ui/react-icons"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useState } from "react";

const itemClass = "border-solid border-1 text-xl font-garamond-pp data-[state=on]:text-white data-[state=on]:bg-stone-500/60  hover:bg-red-500 hover:text-soviet-gold"

interface TypeProps {
  initialType?: QuestionType;
  onTypeChange: (questionType: QuestionType) => void;
}

const ToggleQuestionType: React.FC<TypeProps> = ({
  initialType = 'choosing',
  onTypeChange
}) => {

  const [userChoice, setUserChoice]= useState<QuestionType>(initialType)

  const handleUserChoiceUpdate = (value:QuestionType)=>{
    if (value){
      setUserChoice(value)
      onTypeChange(value)
      console.log(`user choice is now ${value} .... 1982`)
    }
  }

  return (

    <div className="bg-[url('topography-2.svg')] bg-contain bg-repeat bg-stone-300 w-full -mt-100] ">
      <div className='w-[90%] flex justify-center mt-5 mb-5 gap-[1.5rem]  md:gap-10 m-auto'>


        <ToggleGroup
          type="single"
          onValueChange={handleUserChoiceUpdate}
          value={userChoice}
        >
          <ToggleGroupItem
            value="choosing"
            aria-label="Toggle choosing"
            className={itemClass}
          >
            <TokensIcon className="h-5 w-5 " />
            <p>multiple choice</p>
          </ToggleGroupItem>

          {/* Custom divider */}
          <DotsVerticalIcon className="text-red-600" />
          {/* // className="w-px bg-red-500 self-stretch mx-1"/> */}

          <ToggleGroupItem
            value="typing"
            aria-label="Toggle typing"
            className={itemClass}
          >
            <KeyboardIcon className="h-4 w-4" />
            <p>type your answer</p>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}

export default ToggleQuestionType;
