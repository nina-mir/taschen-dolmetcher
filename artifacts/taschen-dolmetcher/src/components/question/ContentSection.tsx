import { MediaItem, InfoItem } from '@/types';
import CollapsibleInfo from "./CollapsibleInfo";
import InfoText from './InfoText';
import ImageViewer from './ImageViewer';
import { Separator } from "@/components/ui/separator"
import { useId } from 'react';

interface ContentSectionProps {
  media: MediaItem;
  info: InfoItem;
  showInfo: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  media,
  info,
  showInfo,
}) => {
  const uniqueId = useId();
  const sectionId = `content-section-${uniqueId}`;
  const imageId = `image-${uniqueId}`;
  const captionId = `caption-${uniqueId}`;
  const infoId = `info-${uniqueId}`;

  const isVisible = showInfo !== 'hidden';

  // Nothing is rendered until the answer is correct, so the browser does not
  // download every card's photo when the page opens.
  if (!isVisible) return null;

  return (
    <div
      id={sectionId}
      className={`
        ${showInfo}
        w-[100%]
        max-h-[100vh]
        top-0
        left-0
        rounded-xl
        md:bg-no-repeat
        md:bg-contain
        bg-cover
        md:bg-right
        bg-center
        md:bg-black/90
        bg-blend-normal
        backdrop-opacity-[0.9]
      `}
      role="complementary"
      aria-label="Question context and media"
      aria-hidden={!isVisible}
    >
      <div>
        {/* Mobile: Collapsible image caption */}
        <div className="md:hidden">
          <CollapsibleInfo
            content={
              <p
                id={captionId}
                className="bg-stone-500 text-white"
                role="img"
                aria-label={`Image caption: ${media.imgCaption}`}
              >
                📷:{media.imgCaption}
              </p>
            }
            wrapperClassName={`absolute z-10 data-[state=open]:bg-red-500/50 rounded-t-xl w-[70%]`}
            triggerClassName={`transition-transform duration-500 ease-in-out data-[state=open]:rotate-45`}
            iconClassName={`w-6 h-6 bg-red-500 text-soviet-gold border-1 border-soviet-gold`}
            contentClassName={`w-[95%] p-2 text-wrap text-lg data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-500`}
            ariaLabel="Toggle image caption visibility"
          />
        </div>

        {/* Mobile: Image */}
        <ImageViewer
          media={media}
          triggerClassName="block md:hidden w-full"
          imgClassName="w-full rounded-t-xl"
          id={imageId}
          ariaDescribedby={captionId}
        />

        <div className="hidden md:flex" role="group" aria-label="Image and information panel">
          <ImageViewer
            media={media}
            triggerClassName="md:w-[50%] shrink-0 my-auto"
            imgClassName="w-full md:max-h-[70vh] object-contain"
            id={imageId}
            ariaDescribedby={`${captionId} ${infoId}`}
          />

          <div className="flex flex-col gap-3" role="region" aria-label="Image details and information">
            <p
              id={captionId}
              className="font-mono text-white text-[1rem] p-2"
              role="img"
              aria-label={`Image caption: ${media.imgCaption}`}
            >
              📷:&nbsp;{media.imgCaption}
            </p>
            <Separator
              className="bg-soviet-gold"
              role="separator"
              aria-hidden="true"
            />
            <InfoText
              info={info}
              isSourceCollapsible={true}
              wrapperClassName={`leading-5 font-mono w-full text-stone-50 p-2 text-[1rem]`}
              citeSourceClassName={`bg-stone-500 text-white block`}
              collapsibleWrapperClassName="rounded-t-xl"
              id={infoId}
              ariaLabel="Additional context information"
            />
          </div>
        </div>

        <div>
          {/* Mobile: text info + source */}
          <InfoText
            info={info}
            wrapperClassName={`block md:hidden`}
            infoTextClassName={`leading-5 w-full font-mono text-stone-50 bg-red-900 md:w-[60%] md:text-[1.2rem] p-2`}
            citeSourceClassName={`ml-1 text-stone-100 text-wrap text-xs md:w-[50%]`}
            id={infoId}
            ariaLabel="Additional context information"
          />
        </div>
      </div>
    </div>
  )
}

export default ContentSection;
