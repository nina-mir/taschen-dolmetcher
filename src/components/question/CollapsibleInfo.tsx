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
    triggerText?: string;
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

    // Create proper heading if level is specified
    // const TriggerWrapper = level ? `h${level}` as keyof JSX.IntrinsicElements : 'div';

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
            {/* Icon with proper ARIA handling */}
            <span aria-hidden="true">
                {icon || <PlusIcon className={iconClassName} />}
            </span>
            
            {/* Optional visible trigger text */}
            {triggerText && (
                <span className="ml-2">
                    {triggerText}
                </span>
            )}
            
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
            {/* {level ? (
                <TriggerWrapper role="heading" aria-level={level}>
                    {triggerContent}
                </TriggerWrapper>
            ) : (
                triggerContent
            )} */}

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