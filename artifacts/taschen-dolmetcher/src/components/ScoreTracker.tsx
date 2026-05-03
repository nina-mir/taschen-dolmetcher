import { CheckIcon, Cross2Icon, ResetIcon } from "@radix-ui/react-icons"

interface ScoreTrackerProps {
  correct: number;
  incorrect: number;
  variant: 'navbar' | 'mobile-banner';
  onNewGame: () => void;
}

const ScoreTracker: React.FC<ScoreTrackerProps> = ({ correct, incorrect, variant, onNewGame }) => {
  const total = correct + incorrect;

  if (variant === 'navbar') {
    return (
      <div
        className="flex items-center gap-3 font-gyst text-sm select-none"
        aria-label={`Score: ${correct} correct, ${incorrect} incorrect`}
        role="status"
        aria-live="polite"
      >
        <span className="flex items-center gap-1 text-emerald-700 font-semibold">
          <CheckIcon className="w-4 h-4" aria-hidden="true" />
          {correct}
        </span>
        <span className="text-stone-400 text-xs">|</span>
        <span className="flex items-center gap-1 text-red-600 font-semibold">
          <Cross2Icon className="w-4 h-4" aria-hidden="true" />
          {incorrect}
        </span>
        {total > 0 && (
          <>
            <span className="text-stone-400 text-xs">|</span>
            <span className="text-stone-500 text-xs">
              {Math.round((correct / total) * 100)}%
            </span>
          </>
        )}
        <button
          onClick={onNewGame}
          className="ml-1 text-stone-400 hover:text-red-600 transition-colors duration-200 cursor-pointer"
          aria-label="Start new game"
          title="New game"
          type="button"
        >
          <ResetIcon className="w-4 h-4" />
        </button>
      </div>
    )
  }

  // mobile-banner variant
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex justify-center pb-4 px-6 pointer-events-none"
      role="status"
      aria-live="polite"
      aria-label={`Score: ${correct} correct, ${incorrect} incorrect`}
    >
      <div className="pointer-events-auto flex items-center gap-4 bg-stone-900/65 backdrop-blur-md rounded-full px-6 py-3 border border-stone-700/40 shadow-lg">
        <div className="flex items-center gap-2">
          <CheckIcon className="w-5 h-5 text-emerald-400" aria-hidden="true" />
          <span className="text-emerald-400 font-gyst font-bold text-xl leading-none">
            {correct}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-stone-400 font-garamond-pp text-xs tracking-widest uppercase leading-none">
            score
          </span>
          {total > 0 && (
            <span className="text-soviet-gold font-gyst text-xs leading-none mt-0.5">
              {Math.round((correct / total) * 100)}%
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-red-400 font-gyst font-bold text-xl leading-none">
            {incorrect}
          </span>
          <Cross2Icon className="w-5 h-5 text-red-400" aria-hidden="true" />
        </div>

        <div className="w-px h-5 bg-stone-700" aria-hidden="true" />

        <button
          onClick={onNewGame}
          className="text-stone-400 hover:text-soviet-gold transition-colors duration-200 cursor-pointer"
          aria-label="Start new game"
          title="New game"
          type="button"
        >
          <ResetIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default ScoreTracker;
