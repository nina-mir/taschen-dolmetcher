/*
CollapsibleInfo
Generic collapsible component for the expandable sections
Could be reused for both image captions and source citations
*/

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