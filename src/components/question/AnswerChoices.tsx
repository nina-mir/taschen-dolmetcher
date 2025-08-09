/*
AnswerChoices

The radio group with all four choice options
Manages selection state and keyboard interactions
Contains the choice styling and hover effects
*/

import { Label } from "@/components/ui/label"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"

interface AnswerChoicesProps {
    value: string;
    onValueChange: (val: string) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    showInfo: string;
    choices: string[];
    radioItemClassName: string;
    labelClassName: string;
    uniqueId: string;
    bgClass?: string;
}

const AnswerChoices: React.FC<AnswerChoicesProps> = ({
    value,
    onValueChange,
    onKeyDown,
    showInfo,
    choices,
    radioItemClassName,
    labelClassName,
    uniqueId,
    bgClass = `bg-stone-400`
}) => {

    const answerChoices = choices.map((item, idx) => {

        let wrapperClassName = `flex items-center gap-3 rounded-l-full cursor-pointer group`
        if (idx == 0) { wrapperClassName += ` mt-3` }
        if (idx == (choices.length - 1)) { wrapperClassName += ` mb-3` }
        const maxOpacity = choices.length*5 + 10
        let itemOpacity = maxOpacity - 5*idx
        wrapperClassName = wrapperClassName + ` ${bgClass}/${itemOpacity}`
        return (
            <div
                key={`${uniqueId}-r-${idx}`}
                className={wrapperClassName}
                onClick={() => onValueChange(item)}
            >
                <RadioGroupItem
                    value={item}
                    className={radioItemClassName}
                    id={`${uniqueId}-r-${idx}`}  // Unique ID
                />
                <Label htmlFor={`${uniqueId}-r-${idx}`} className={labelClassName}>{item}</Label>
            </div>
        )
    })

    return (
        <RadioGroup
            value={value}
            onValueChange={onValueChange}
            onKeyDown={onKeyDown}
            className={`
                relative
                ${showInfo === 'hidden' ? '' : 'hidden'}
                font-garamond-pp
                pl-5
                pr-5
                bg-contain bg-repeat
                rounded-tl-xl
                rounded-br-lg
                border-l-1
                border-soviet-gold
                hover:bg-stone-400/50
                hover:border-r-6
                hover:border-r-red-500
                hover:font-bold
                **:text-black
                `}
        >
            {answerChoices}
        </RadioGroup>
    )
}

export default AnswerChoices;