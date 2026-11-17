interface RoundProgressProps {
  /** e.g. "Round 3 of 8" or "Review" */
  label: string;
  /** Zero-based position of the question on screen. */
  step: number;
  /** Questions in this round. */
  total: number;
}

/** "Round 3 of 8 · Question 4 of 10" with one segment per question. */
const RoundProgress: React.FC<RoundProgressProps> = ({ label, step, total }) => (
  <div className="w-[90%] flex flex-col gap-2">
    <div
      className="flex justify-between font-gyst text-sm font-medium uppercase tracking-wider text-stone-600 dark:text-stone-400"
      aria-live="polite"
    >
      <span>{label}</span>
      <span>Question {step + 1} of {total}</span>
    </div>
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
      aria-hidden="true"
    >
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full ${
            i < step
              ? 'bg-stone-900 dark:bg-stone-100'
              : i === step
                ? 'bg-red-600'
                : 'bg-stone-400 dark:bg-stone-600'
          }`}
        />
      ))}
    </div>
  </div>
)

export default RoundProgress
