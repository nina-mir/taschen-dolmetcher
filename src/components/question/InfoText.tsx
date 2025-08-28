// InfoText - the info text with source citation
import { InfoItem } from '@/types';
import CollapsibleInfo from './CollapsibleInfo';
import { QuoteIcon } from '@radix-ui/react-icons';

interface InfoTextProps {
    info: InfoItem;
    isSourceCollapsible?: boolean;
    wrapperClassName?: string;
    infoTextClassName?: string;
    citeSourceClassName?: string;
    collapsibleDefault?: boolean;
    collapsibleWrapperClassName?: string;
    collapsibleTriggerClassName?: string;
    collapsibleIconClassName?: string;
    collapsibleContentClassName?: string;
    // New accessibility props
    id?: string;
    ariaLabel?: string;
    role?: string;
}

const InfoText: React.FC<InfoTextProps> = ({
    info,
    isSourceCollapsible = false,
    wrapperClassName = ``,
    infoTextClassName = ``,
    citeSourceClassName = ``,
    collapsibleDefault = true,
    collapsibleWrapperClassName = `absolute rounded-t-xl`,
    collapsibleTriggerClassName = ``,
    collapsibleIconClassName = `bg-red-500 text-soviet-gold border-1 border-soviet-gold`,
    collapsibleContentClassName = `w-[85%] p-2 text-wrap text-[0.9rem] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-500`,
    // accessibility props
    id,
    ariaLabel,
    role = "complementary"
}) => {
    const textId = id ? `${id}-text` : undefined;
    const sourceId = id ? `${id}-source` : undefined;

    return (
        <div 
            id={id}
            className={wrapperClassName}
            role={role}
            aria-label={ariaLabel || "Additional information"}
        >
            <p 
                id={textId}
                className={infoTextClassName}
                role="text"
            >
                {info.text}
            </p>
            
            {!isSourceCollapsible && (
                <cite
                    id={sourceId}
                    className={citeSourceClassName}
                    role="doc-credit"
                    aria-label={`Source: ${info.sourceChicago}`}
                >
                    {info.sourceChicago}
                </cite>
            )}

            {isSourceCollapsible && (
                <CollapsibleInfo
                    defaultOpen={collapsibleDefault}
                    content={
                        <cite
                            id={sourceId}
                            className={citeSourceClassName}
                            role="doc-credit"
                            aria-label={`Source information: ${info.sourceChicago}`}
                        >
                            <b>Source:&nbsp;</b>{info.sourceChicago}
                        </cite>
                    }
                    wrapperClassName={collapsibleWrapperClassName}
                    triggerClassName={collapsibleTriggerClassName}
                    iconClassName={collapsibleIconClassName}
                    contentClassName={collapsibleContentClassName}
                    ariaLabel="Toggle source citation visibility"
                    triggerText=<QuoteIcon/>
                    // contentId={sourceId}
                />
            )}
        </div>
    )
}

export default InfoText;




// interface InfoTextProps {
//     info: InfoItem;
//     isSourceCollapsible?: boolean;
//     wrapperClassName?: string;
//     infoTextClassName?: string;
//     citeSourceClassName?: string;
//     collapsibleDefault?: boolean;
//     collapsibleWrapperClassName?: string;
//     collapsibleTriggerClassName?: string;
//     collapsibleIconClassName?: string;
//     collapsibleContentClassName?: string;
// }

// const InfoText: React.FC<InfoTextProps> = ({
//     info,
//     isSourceCollapsible = false,
//     wrapperClassName = ``,
//     infoTextClassName = ``,
//     citeSourceClassName = ``,
//     collapsibleDefault = true,
//     collapsibleWrapperClassName = `absolute rounded-t-xl`,
//     collapsibleTriggerClassName = `transition-transform duration-500 ease-in-out data-[state=open]:rotate-45`,
//     collapsibleIconClassName = `w-3 h-3 bg-red-500 text-soviet-gold border-1 border-soviet-gold`,
//     collapsibleContentClassName = `w-[85%] p-2 text-wrap text-[0.9rem] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-500`
// }) => {
//     return (<div className={wrapperClassName}>
//         <p className={infoTextClassName}>
//             {info.text}
//         </p>
//         {!isSourceCollapsible &&
//             <cite
//                 className={citeSourceClassName}>
//                 {info.sourceChicago}
//             </cite>}

//         {isSourceCollapsible &&
//             <CollapsibleInfo
//                 defaultOpen={collapsibleDefault}
//                 content={
//                     <cite
//                         className={citeSourceClassName}><b>Source:&nbsp;</b>{info.sourceChicago}
//                     </cite>
//                 }
//                 wrapperClassName={collapsibleWrapperClassName}
//                 triggerClassName={collapsibleTriggerClassName}
//                 iconClassName={collapsibleIconClassName}
//                 contentClassName={collapsibleContentClassName}
//             />

//         }
//     </div>)
// }

// export default InfoText;


// <div
//     className={`
//         leading-5
//         font-mono
//         w-full
//         text-stone-50
//         p-2
//         text-[1rem]
//         `
//     }>
//     <p>{info.text}</p>
//     <CollapsibleInfo
//         defaultOpen={true}
//         content={<cite
//             className="bg-stone-500 text-white block "><b>Source:&nbsp;</b>{info.sourceChicago}
//         </cite>}
//         wrapperClassName={`absolute rounded-t-xl`}
//         triggerClassName={`transition-transform duration-500 ease-in-out data-[state=open]:rotate-45`}
//         iconClassName={`w-3 h-3 bg-red-500 text-soviet-gold border-1 border-soviet-gold`}
//         contentClassName={`w-[85%] p-2 text-wrap text-[0.9rem] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-500`}
//     />
// </div>




// <div>
// <p className={`
// block
// md:hidden
// leading-5
// w-full
// font-mono
// text-stone-50
// bg-red-900
// md:w-[60%]
// md:text-[1.2rem]
// p-2
// `
// }>
//     {info.text}
// </p>

// <cite
//     className="block md:hidden ml-1 text-stone-100 text-wrap text-xs md:w-[50%]">
//     {info.sourceChicago}
// </cite>

// </div>