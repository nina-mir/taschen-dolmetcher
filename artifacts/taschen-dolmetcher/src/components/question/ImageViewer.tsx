import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Cross1Icon, EnterFullScreenIcon, ExternalLinkIcon } from "@radix-ui/react-icons"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MediaItem } from '@/types';
import MediaImage from './MediaImage';

interface ImageViewerProps {
  media: MediaItem;
  /** Classes for the tappable wrapper — put layout (width, visibility) here. */
  triggerClassName?: string;
  /** Classes for the thumbnail image inside the card. */
  imgClassName?: string;
  id?: string;
  ariaDescribedby?: string;
}

/**
 * The photo inside a question card. Tapping it opens the image full-screen
 * with its caption, credit and a link to the source archive.
 */
const ImageViewer: React.FC<ImageViewerProps> = ({
  media,
  triggerClassName = '',
  imgClassName = '',
  id,
  ariaDescribedby,
}) => {
  const credit = [media.photog, media.credit, media.originalArchive]
    .filter(Boolean)
    .join(' · ');

  return (
    <Dialog>
      <DialogTrigger
        type="button"
        className={`group relative cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-soviet-gold ${triggerClassName}`}
        aria-label="View image full screen with caption"
      >
        <MediaImage
          media={media}
          className={imgClassName}
          id={id}
          ariaDescribedby={ariaDescribedby}
        />
        <span
          className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-black/55 text-white group-hover:bg-black/80 transition-colors"
          aria-hidden="true"
        >
          <EnterFullScreenIcon className="w-4 h-4" />
        </span>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="z-[60] bg-black" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-[60] flex flex-col text-stone-100 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200"
        >
          <div className="flex justify-end p-2 shrink-0">
            <DialogClose
              className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-soviet-gold cursor-pointer"
              aria-label="Close image"
            >
              <Cross1Icon className="w-5 h-5" />
            </DialogClose>
          </div>

          {/* Tapping the empty space around the image closes the viewer */}
          <DialogClose asChild>
            <div className="flex-1 min-h-0 flex items-center justify-center px-2">
              <img
                src={media.imgUrl}
                alt={media.altText || ''}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </DialogClose>

          <div className="shrink-0 max-h-[35vh] overflow-y-auto px-5 pt-3 pb-6 font-garamond-pp">
            <DialogTitle className="text-lg leading-snug font-normal">
              {media.imgCaption || 'Untitled image'}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {media.altText || 'Full-screen view of the image'}
            </DialogDescription>
            {credit && (
              <p className="mt-1 text-sm text-stone-400">{credit}</p>
            )}
            {media.sourceUrl && (
              <a
                href={media.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm text-soviet-gold underline underline-offset-4"
              >
                View source
                <ExternalLinkIcon className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

export default ImageViewer;
