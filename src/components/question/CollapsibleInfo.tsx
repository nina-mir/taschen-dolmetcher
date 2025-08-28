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

import { useState } from "react"

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
    // New accessibility props
    contentId?: string;
    triggerText?: React.ReactNode;
    contentDescription?: string;
}

const CollapsibleInfo: React.FC<CollapsibleInfoProps> = ({
    wrapperClassName = "",
    triggerClassName = "",
    iconClassName = "",
    contentClassName = "",
    content,
    icon,
    defaultOpen = false,
    onOpenChange,
    ariaLabel,
    // accessibility props
    contentId,
    triggerText,
    contentDescription,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        onOpenChange?.(open);
    };

    // Generate IDs if not provided
    const generatedId = contentId || `collapsible-content-${Math.random().toString(36).substring(2, 9)}`;
    const triggerId = `${generatedId}-trigger`;

    // Determine appropriate aria-label based on state and content
    const getAriaLabel = (): string => {
        if (ariaLabel) return ariaLabel;

        const action = isOpen ? "Collapse" : "Expand";
        const target = contentDescription || "additional information";
        return `${action} ${target}`;
    };

    const triggerContent = (
        <CollapsibleTrigger
            id={triggerId}
            className={triggerClassName}
            aria-label={getAriaLabel()}
            aria-expanded={isOpen}
            aria-controls={generatedId}
            aria-describedby={contentDescription ? `${generatedId}-desc` : undefined}
            type="button"
        >
            {/* Icon with conditional rotation applied directly to the icon */}
            <div className="md:px-1 md:py-0.2 md:flex md:items-center md:justify-center md:rounded-3xl bg-red-500 text-soviet-gold border-1 border-soviet-gold">

                {/* Optional visible trigger text */}
                {triggerText && (
                    <span>
                        {triggerText}
                    </span>
                )}
                <span aria-hidden="true">
                    {icon ? (
                        <span className={`inline-block transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-45' : ''}`}>
                            {icon}
                        </span>
                    ) : (
                        <PlusIcon className={`rounded-xl  transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-45' : ''}`} />
                    )}
                </span>


            </div>

            {/* Screen reader only state description */}
            <span className="sr-only">
                {isOpen ? "Collapse" : "Expand"} content
            </span>
        </CollapsibleTrigger>
    );

    return (
        <Collapsible
            className={wrapperClassName}
            defaultOpen={defaultOpen}
            onOpenChange={handleOpenChange}
            aria-label={contentDescription}
        >

            {triggerContent}

            <CollapsibleContent
                id={generatedId}
                className={contentClassName}
                role="region"
                aria-labelledby={triggerId}
                aria-live="polite"
                aria-atomic="true"
            >
                {/* Optional content description for screen readers */}
                {contentDescription && (
                    <span
                        id={`${generatedId}-desc`}
                        className="sr-only"
                    >
                        {contentDescription}
                    </span>
                )}

                <div role="group">
                    {content}
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}

export default CollapsibleInfo;