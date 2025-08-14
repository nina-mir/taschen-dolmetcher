/*
ContentSection component manages the entire media + info area:

Within ContentSection, smaller pieces:

MediaImage - just the img tag with responsive classes
ImageCaption - the collapsible caption logic
InfoText - the info text with source citation
ViewToggleControls - the eye icons for show/hide

example use:

<ContentSection 
  media={media}
  info={info}
  showInfo={showInfo}
  onToggleInfo={setShowInfo}
/>
*/

import { MediaItem, InfoItem } from '@/types';
import CollapsibleInfo from "./CollapsibleInfo";
import InfoText from './InfoText';
import MediaImage from './MediaImage';
import { Separator } from "@/components/ui/separator"
import { EyeOpenIcon } from "@radix-ui/react-icons"
import { useId } from 'react';



interface ContentSectionProps {
    media: MediaItem;
    info: InfoItem;
    showInfo: string;
    onToggleInfo: (arg0: string) => void;
}

const ContentSection: React.FC<ContentSectionProps> = ({
    media,
    info,
    showInfo,
    onToggleInfo
}) => {

    const uniqueId = useId();
    const sectionId = `content-section-${uniqueId}`;
    const imageId = `image-${uniqueId}`;
    const captionId = `caption-${uniqueId}`;
    const infoId = `info-${uniqueId}`;

    const isVisible = showInfo !== 'hidden';

    return (
        <div
            id={sectionId}

            className={
                `${showInfo} 
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
                backdrop-opacity-[0.9]          `
            }
            role="complementary"
            aria-label="Question context and media"
            aria-hidden={!isVisible}
        >
            <div >
                {/* <CollapsibleInfo
                    content={<p className="bg-stone-500 text-white">📷:{media.imgCaption}</p>}
                    wrapperClassName={`md:hidden absolute data-[state=open]:bg-red-500/50 rounded-t-xl w-[70%]`}
                    triggerClassName={`transition-transform duration-500 ease-in-out data-[state=open]:rotate-45`}
                    iconClassName={`w-6 h-6 bg-red-500 text-soviet-gold border-1 border-soviet-gold`}
                    contentClassName={`w-[95%] p-2 text-wrap text-lg data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-500`}
                /> */}
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
                        wrapperClassName={`absolute data-[state=open]:bg-red-500/50 rounded-t-xl w-[70%]`}
                        triggerClassName={`transition-transform duration-500 ease-in-out data-[state=open]:rotate-45`}
                        iconClassName={`w-6 h-6 bg-red-500 text-soviet-gold border-1 border-soviet-gold`}
                        contentClassName={`w-[95%] p-2 text-wrap text-lg data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-500`}
                        ariaLabel="Toggle image caption visibility"
                    // contentId={captionId}
                    />
                </div>
                {/* Mobile: Image */}
                <MediaImage
                    media={media}
                    className={`block md:hidden rounded-t-xl md:rounded-t-none mr-0 md:max-h-[70vh] md:w-[50%]`}
                    id={imageId}
                    ariaDescribedby={captionId}
                />

                <div className="hidden md:flex" role="group" aria-label="Image and information panel">
                    <MediaImage
                        media={media}
                        className={`rounded-t-xl md:rounded-t-none md:max-h-[70vh] md:w-[50%] my-auto`}
                        id={imageId}
                        ariaDescribedby={`${captionId} ${infoId}`}
                    />
                    {/* <div className="flex flex-col gap-3">
                        <p className="font-mono text-white text-[1rem] p-2 ">
                            📷:&nbsp;{media.imgCaption}
                        </p>
                        <Separator className="bg-soviet-gold" />
                        {/* textInfo + source on large screen */}
                    {/* <InfoText
                            info={info}
                            isSourceCollapsible={true}
                            wrapperClassName={`leading-5 font-mono w-full 
                            text-stone-50 p-2 text-[1rem]`}
                            citeSourceClassName={`bg-stone-500 text-white block`}
                        /> */}
                    {/* </div> */}
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
                        {/* textInfo + source on large screen */}
                        <InfoText
                            info={info}
                            isSourceCollapsible={true}
                            wrapperClassName={`leading-5 font-mono w-full 
                            text-stone-50 p-2 text-[1rem]`}
                            citeSourceClassName={`bg-stone-500 text-white block`}
                            id={infoId}
                            ariaLabel="Additional context information"
                        />
                    </div>
                </div>

                <div>
                    {/* textInfo + source on mobile screen */}
                    <InfoText
                        info={info}
                        wrapperClassName={`block md:hidden`}
                        infoTextClassName={`leading-5 
                        w-full
                        font-mono 
                        text-stone-50   
                        bg-red-900
                        md:w-[60%] 
                        md:text-[1.2rem] 
                        p-2 `}
                        citeSourceClassName={`ml-1 text-stone-100 text-wrap text-xs md:w-[50%]`}
                        id={infoId}
                        ariaLabel="Additional context information"
                    />


                    {/* <EyeOpenIcon
                        className={
                            `absolute
                            ${showInfo}  
                            bottom-0
                            right-1
                            w-10
                            h-10
                            text-soviet-gold
                        `}
                        onClick={() => {
                            onToggleInfo('hidden')
                        }} /> */}

                    {/* Close/Hide button */}
                    <button
                        className={
                            `absolute
                            ${showInfo}  
                            bottom-0
                            right-1
                            w-10
                            h-10
                            text-soviet-gold
                            hover:text-yellow-300
                            focus:outline-none
                            focus:ring-2
                            focus:ring-soviet-gold
                            focus:ring-offset-2
                            focus:ring-offset-black
                            rounded-sm
                            transition-colors
                            duration-200
                        `}
                        onClick={() => {
                            onToggleInfo('hidden')
                        }}
                        aria-label="Hide context information panel"
                        aria-expanded={isVisible}
                        aria-controls={sectionId}
                        type="button"
                        title="close info panel"
                    >
                        <EyeOpenIcon
                            className="w-full h-full"
                        />
                        <span className="sr-only">Close information panel</span>
                    </button>


                </div>
            </div>
        </div>
    )
}

export default ContentSection;


{/* {result && <EyeClosedIcon className={
        `absolute 
    ${showInfo === 'hidden' ? '' : 'hidden'}    
    md:-left-35 
    md:top-10 
    bottom-0
    right-1
    w-10 
    h-10
md:text-red-400
    ${correctClasses.text}
    `}
        onClick={() => {
            onToggleInfo('')
        }} />
    } */}


{/* <div className={`
block
md:hidden
`
}>
<p className={`leading-5 
w-full
font-mono 
text-stone-50   
bg-red-900
md:w-[60%] 
md:text-[1.2rem] 
p-2 `}>
    {info.text}
</p>

<cite
    className="block md:hidden ml-1 text-stone-100 text-wrap text-xs md:w-[50%]">
    {info.sourceChicago}
</cite>

</div> 
*/}

{/* <div
className={`
    leading-5 
    font-mono
    w-full
    text-stone-50 
    p-2 
    text-[1rem]
    `
}>
<p>{info.text}</p>
<CollapsibleInfo
    defaultOpen={true}
    content={<cite
        className="bg-stone-500 text-white block "><b>Source:&nbsp;</b>{info.sourceChicago}
    </cite>}
    wrapperClassName={`absolute rounded-t-xl`}
    triggerClassName={`transition-transform duration-500 ease-in-out data-[state=open]:rotate-45`}
    iconClassName={`w-3 h-3 bg-red-500 text-soviet-gold border-1 border-soviet-gold`}
    contentClassName={`w-[85%] p-2 text-wrap text-[0.9rem] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-500`}
/>
</div> 
*/}