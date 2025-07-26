import { TokensIcon, KeyboardIcon } from "@radix-ui/react-icons"


import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

const itemClass = "text-xl font-garamond-pp data-[state=on]:bg-black data-[state=on]:text-soviet-gold hover:bg-red-500 hover:text-soviet-gold"

const ToggleQuestionType: React.FC = () => {
  return (
    <ToggleGroup type="single">
      <ToggleGroupItem 
      value="choosing" 
      aria-label="Toggle choosing" 
      className={itemClass}
      >
        <TokensIcon className="h-4 w-4" /> 
        <p>multiple choice</p>
      </ToggleGroupItem>
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
