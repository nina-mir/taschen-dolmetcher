import { TokensIcon, KeyboardIcon, DotsVerticalIcon } from "@radix-ui/react-icons"


import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

const itemClass = "border-solid border-1 text-xl font-garamond-pp data-[state=on]:text-white data-[state=on]:bg-stone-500/60  hover:bg-red-500 hover:text-soviet-gold"

interface TypeProps{
  initialType: string;
  onTypeChange: (questionType: string) => void;
}

const ToggleQuestionType: React.FC<TypeProps> = ({
  initialType='choosing',
  onTypeChange
}) => {
  return (
    <ToggleGroup 
    type="single"
    onValueChange = {onTypeChange}
    defaultValue={initialType}
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
      <DotsVerticalIcon className="text-red-600"/>
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
  )
}

export default ToggleQuestionType;
