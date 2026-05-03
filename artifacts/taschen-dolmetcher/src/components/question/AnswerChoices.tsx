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
  revealCorrect?: string | null;
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
  bgClass = `bg-stone-400`,
  revealCorrect = null,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value) {
      onKeyDown(e);
    }
  };

  const handleChoiceClick = (item: string) => {
    onValueChange(item);
    const radioElement = document.getElementById(`${uniqueId}-r-${choices.indexOf(item)}`);
    if (radioElement) {
      radioElement.focus();
    }
  };

  const answerChoices = choices.map((item, idx) => {
    const choiceId = `${uniqueId}-r-${idx}`;
    const isSelected = value === item;
    const isRevealed = revealCorrect !== null && item === revealCorrect;

    let wrapperClassName = `${bgClass}
      flex items-center gap-3 rounded-l-full cursor-pointer
      group transition-all duration-200 hover:scale-102
      focus-within:ring-1 focus-within:ring-stone-900`;
    if (idx === 0) { wrapperClassName += ` mt-3` }
    if (idx === choices.length - 1) { wrapperClassName += ` mb-3` }
    if (isSelected) { wrapperClassName += ` ring-2 ring-stone-800 bg-red-300` }
    if (isRevealed) { wrapperClassName += ` ring-2 ring-soviet-gold` }

    const maxOpacity = choices.length * 5 + 10;
    const itemOpacity = (maxOpacity - 5 * idx) / 100;
    const itemStyle = {
      backgroundColor: isRevealed
        ? `rgb(255, 215, 0, 0.25)`
        : isSelected
          ? `rgb(168, 162, 158, 0)`
          : `rgb(168, 162, 158, ${itemOpacity})`,
    } as React.CSSProperties;

    return (
      <div
        key={choiceId}
        className={wrapperClassName}
        style={itemStyle}
        onClick={() => handleChoiceClick(item)}
        role="presentation"
      >
        <RadioGroupItem
          value={item}
          className={`${radioItemClassName} focus:ring-red-500/30 cursor-pointer`}
          id={choiceId}
          aria-describedby={`${choiceId}-desc`}
        />
        <Label
          htmlFor={choiceId}
          className={`${labelClassName} cursor-pointer flex-1 px-2 ${isSelected ? 'font-semibold text-black' : ''} ${isRevealed ? 'font-semibold' : ''}`}
        >
          {item}
          {isRevealed && (
            <span className="ml-2 text-sm font-gyst text-stone-600" aria-hidden="true">← correct</span>
          )}
        </Label>

        <span id={`${choiceId}-desc`} className="sr-only">
          Choice {idx + 1} of {choices.length}: {item}
          {isSelected ? ' (selected)' : ''}
          {isRevealed ? ' (correct answer)' : ''}
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
      <div id={`${groupId}-instructions`} className="sr-only">
        Use arrow keys to navigate between options. Press Enter to submit your answer.
      </div>

      {answerChoices}

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {value && `Selected: ${value}`}
      </div>
    </RadioGroup>
  )
}

export default AnswerChoices;
