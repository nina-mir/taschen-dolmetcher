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
import { Separator } from "@/components/ui/separator"
import { EyeOpenIcon } from "@radix-ui/react-icons"


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
    return (
        <div className={
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
        >
            <div >
                <CollapsibleInfo
                    content={<p className="bg-stone-500 text-white">📷:{media.imgCaption}</p>}
                    wrapperClassName={`md:hidden absolute data-[state=open]:bg-red-500/50 rounded-t-xl w-[70%]`}
                    triggerClassName={`transition-transform duration-500 ease-in-out data-[state=open]:rotate-45`}
                    iconClassName={`w-6 h-6 bg-red-500 text-soviet-gold border-1 border-soviet-gold`}
                    contentClassName={`w-[95%] p-2 text-wrap text-lg data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-500`}
                />
                <img src={media.imgUrl} className="block md:hidden rounded-t-xl md:rounded-t-none mr-0 md:max-h-[70vh] md:w-[50%]" />

                <div className="hidden md:flex">
                    <img src={media.imgUrl} className="rounded-t-xl md:rounded-t-none md:max-h-[70vh] md:w-[50%] my-auto" />
                    <div className="flex flex-col gap-3">
                        <p className="font-mono text-white text-[1rem] p-2 ">
                            📷:&nbsp;{media.imgCaption}
                        </p>
                        <Separator className="bg-soviet-gold" />
                        <div 
                            className={`
                                leading-5 
                                font-mono
                                w-full
                                text-stone-50 
                                p-2 
                                text-[1rem]
                                `
                            }>
                            {info.text}
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
                    </div>
                </div>

                <div>
                    <p className={`
                        block
                        md:hidden
                        leading-5 
                        w-full
                        font-mono 
                        text-stone-50   
                        bg-red-900
                        md:w-[60%] 
                        md:text-[1.2rem] 
                        p-2 
                        `
                    }>
                        {info.text}
                    </p>

                    <cite
                        className="block md:hidden ml-1 text-stone-100 text-wrap text-xs md:w-[50%]">
                        {info.sourceChicago}
                    </cite>

                    <EyeOpenIcon
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
                        }} />

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
                </div>
            </div>
        </div>
    )
}

export default ContentSection;