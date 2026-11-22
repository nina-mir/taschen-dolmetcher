import * as DialogPrimitive from "@radix-ui/react-dialog"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog"

interface StartOverDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

/** Asks before wiping the game in progress. */
const StartOverDialog: React.FC<StartOverDialogProps> = ({ open, onOpenChange, onConfirm }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogPortal>
      <DialogOverlay className="z-[60] bg-black/70" />
      <DialogPrimitive.Content
        className="fixed left-1/2 top-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-stone-100 p-6 text-stone-900 shadow-xl dark:bg-stone-900 dark:text-stone-100 focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
      >
        <DialogTitle className="font-gyst text-2xl font-semibold">Start over?</DialogTitle>
        <DialogDescription className="mt-3 font-garamond-pp text-xl leading-snug text-stone-700 dark:text-stone-300">
          You&rsquo;ll lose your place and score in this game. Your best score is kept.
        </DialogDescription>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <DialogClose className="min-h-12 rounded-md border-2 border-stone-900 px-5 font-gyst font-semibold cursor-pointer dark:border-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-soviet-gold">
            Keep playing
          </DialogClose>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false)
              onConfirm()
            }}
            className="min-h-12 rounded-md bg-red-700 px-5 font-gyst font-semibold text-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-soviet-gold"
          >
            Start over
          </button>
        </div>
      </DialogPrimitive.Content>
    </DialogPortal>
  </Dialog>
)

export default StartOverDialog
