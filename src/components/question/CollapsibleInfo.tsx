import { PlusIcon } from "@radix-ui/react-icons"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface CollapsibleInfoProps {
    wrapperClassName?: string;
    triggerClassName?: string;
    iconClassName?: string;
    contentClassName?: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    ariaLabel?: string;
}

const CollapsibleInfo: React.FC<CollapsibleInfoProps> = ({
    wrapperClassName = "",
    triggerClassName = "",
    iconClassName = "",
    contentClassName = "",
    content,
    icon,
    defaultOpen,
    onOpenChange,
    ariaLabel
}) => {
    return (
        <Collapsible 
            className={wrapperClassName}
            defaultOpen={defaultOpen}
            onOpenChange={onOpenChange}
        >
            <CollapsibleTrigger 
                className={triggerClassName}
                aria-label={ariaLabel}
            >
                {icon || <PlusIcon className={iconClassName} />}
            </CollapsibleTrigger>
            <CollapsibleContent className={contentClassName}>
                {content}
            </CollapsibleContent>
        </Collapsible>
    )
}

export default CollapsibleInfo;

{/* 
<Collapsible className="md:hidden absolute data-[state=open]:bg-red-500/50 rounded-t-xl w-[70%]">
    <CollapsibleTrigger className="transition-transform duration-500 ease-in-out data-[state=open]:rotate-45">
        <PlusIcon className="w-6 h-6 bg-red-500 text-soviet-gold border-1 border-soviet-gold" />
    </CollapsibleTrigger>
    <CollapsibleContent className="w-[95%] p-2 text-wrap text-lg data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-500">
        <p className="bg-stone-500 text-white">📷:{media.imgCaption}</p>
    </CollapsibleContent>
</Collapsible> 
*/}



{/* <Collapsible className="absolute rounded-t-xl">
    <CollapsibleTrigger className="transition-transform duration-500 ease-in-out data-[state=open]:rotate-45">
        <PlusIcon className="w-6 h-6 bg-red-500 text-soviet-gold border-1 border-soviet-gold" />
    </CollapsibleTrigger>
    <CollapsibleContent className="w-[70%] p-1 text-wrap text-[1rem] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-500">
        <cite
            className="bg-stone-500 text-white"><b>source:</b>{info.sourceChicago}
        </cite>
    </CollapsibleContent>
</Collapsible> */}