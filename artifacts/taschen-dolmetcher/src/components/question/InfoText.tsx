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
  id,
  ariaLabel,
  role = "complementary",
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
          triggerText={<QuoteIcon />}
        />
      )}
    </div>
  )
}

export default InfoText;
