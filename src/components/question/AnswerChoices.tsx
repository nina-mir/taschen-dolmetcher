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
    groupId: string;
    questionId: string;
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
    groupId,
    questionId,
    bgClass = `bg-stone-400`
}) => {

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Handle Enter key for submission
        if (e.key === 'Enter' && value) {
            onKeyDown(e);
        }
        
        // Handle arrow key navigation (already built into RadioGroup, but we can enhance)
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            // Let the default behavior handle navigation
            // but announce the current selection
            setTimeout(() => {
                const selected = choices.find(choice => choice === value);
                if (selected) {
                    // Screen reader will automatically announce the focused option
                }
            }, 0);
        }
    };

    const handleChoiceClick = (item: string) => {
        onValueChange(item);
        // Focus the radio button after selection for better keyboard navigation
        const radioElement = document.getElementById(`${uniqueId}-r-${choices.indexOf(item)}`);
        if (radioElement) {
            radioElement.focus();
        }
    };

    const answerChoices = choices.map((item, idx) => {
        const choiceId = `${uniqueId}-r-${idx}`;
        const isSelected = value === item;
        
        let wrapperClassName = `${bgClass} 
        flex items-center gap-3 rounded-l-full cursor-pointer 
        group transition-all duration-200 hover:scale-102 
        focus-within:ring-1 focus-within:ring-stone-900`;
        if (idx == 0) { wrapperClassName += ` mt-3` }
        if (idx == (choices.length - 1)) { wrapperClassName += ` mb-3` }
        
        // Add selected state styling
        if (isSelected) {
            wrapperClassName += ` ring-2 ring-stone-800 bg-red-300`;
        }
        
        const maxOpacity = choices.length * 5 + 10;
        let itemOpacity = (maxOpacity - 5 * idx) / 100;
        const itemStyle = {
            backgroundColor: isSelected 
                ? `rgb(168, 162, 158, 0)` // zero opacity
                : `rgb(168, 162, 158, ${itemOpacity})` // Original opacity
        } as React.CSSProperties;

        return (
            <div
                key={choiceId}
                className={wrapperClassName}
                style={itemStyle}
                onClick={() => handleChoiceClick(item)}
                role="presentation" // This div is just for styling
            >
                <RadioGroupItem
                    value={item}
                    className={`${radioItemClassName}  focus:ring-red-500/30 cursor-pointer`}
                    id={choiceId}
                    aria-describedby={`${choiceId}-desc`}
                />
                <Label 
                    htmlFor={choiceId} 
                    className={`
                    ${labelClassName} cursor-pointer flex-1 px-2 
                    ${isSelected ? 'font-semibold text-black' : ''}`}
                >
                    {item}
                </Label>
                
                {/* Hidden description for screen readers */}
                <span id={`${choiceId}-desc`} className="sr-only">
                    Choice {idx + 1} of {choices.length}: {item}
                    {isSelected ? ' (selected)' : ''}
                </span>
            </div>
        )
    });

    return (
        <RadioGroup
            value={value}
            onValueChange={onValueChange}
            onKeyDown={handleKeyDown}
            className={`
            cursor-pointer
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
                focus-within:outline-none
                focus-within:ring-1
                focus-within:ring-red-500
            `}
            aria-labelledby={questionId}
            aria-describedby={`${groupId}-instructions`}
            role="radiogroup"
        >
            {/* Instructions for screen readers */}
            <div id={`${groupId}-instructions`} className="sr-only">
                Use arrow keys to navigate between options. Press Enter to submit your answer.
            </div>
            
            {answerChoices}
            
            {/* Live region for selection announcements */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
                {value && `Selected: ${value}`}
            </div>
        </RadioGroup>
    )
}

export default AnswerChoices;