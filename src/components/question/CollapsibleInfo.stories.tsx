import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import React from 'react';
import CollapsibleInfo from './CollapsibleInfo';
import { InfoCircledIcon, ImageIcon, QuoteIcon, GearIcon, PlusIcon } from '@radix-ui/react-icons';

const meta: Meta<typeof CollapsibleInfo> = {
  title: 'UI Components/CollapsibleInfo',
  component: CollapsibleInfo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Generic collapsible component for expandable sections. Features full accessibility support, customizable styling, and can be used for image captions, source citations, or any expandable content.'
      }
    }
  },
  argTypes: {
    wrapperClassName: {
      description: 'CSS classes for the wrapper element',
      control: 'text'
    },
    triggerClassName: {
      description: 'CSS classes for the trigger button',
      control: 'text'
    },
    iconClassName: {
      description: 'CSS classes for the trigger icon',
      control: 'text'
    },
    contentClassName: {
      description: 'CSS classes for the collapsible content',
      control: 'text'
    },
    content: {
      description: 'Content to show/hide in the collapsible section',
      control: 'text'
    },
    icon: {
      description: 'Custom icon to use instead of default PlusIcon',
      control: false
    },
    defaultOpen: {
      description: 'Whether the collapsible starts open',
      control: 'boolean'
    },
    onOpenChange: {
      description: 'Callback when open state changes',
      action: 'onOpenChange'
    },
    ariaLabel: {
      description: 'Custom aria-label for the trigger button',
      control: 'text'
    },
    contentId: {
      description: 'Custom ID for the content element',
      control: 'text'
    },
    triggerText: {
      description: 'Optional text to display next to the icon',
      control: 'text'
    },
    contentDescription: {
      description: 'Description of the content for screen readers',
      control: 'text'
    }
  },
  args: {
    content: 'This is some collapsible content that can be expanded or collapsed.',
    defaultOpen: false,
    onOpenChange: fn(),
    wrapperClassName: 'border rounded-lg p-2',
    triggerClassName: 'flex items-center p-2 hover:bg-gray-100 rounded transition-colors',
    iconClassName: 'w-4 h-4 text-gray-600 transition-transform duration-200',
    contentClassName: 'pt-2 text-sm text-gray-700'
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof CollapsibleInfo>;

// Default story
export const Default: Story = {};

// Animated icon rotation
export const AnimatedIcon: Story = {
  args: {
    triggerText: 'Click to see animation',
    content: 'The plus icon should rotate 45 degrees when opened, creating an X shape.',
    contentDescription: 'animated content'
  },
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(args.defaultOpen || false);
    
    return (
      <CollapsibleInfo
        {...args}
        onOpenChange={(open) => {
          setIsOpen(open);
          args.onOpenChange?.(open);
        }}
        icon={
          <PlusIcon 
            className={`w-4 h-4 text-blue-600 transition-transform duration-200 ${
              isOpen ? 'rotate-45' : 'rotate-0'
            }`} 
          />
        }
        wrapperClassName="border border-blue-200 rounded-lg p-3"
        triggerClassName="flex items-center p-2 hover:bg-blue-50 rounded transition-colors"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows animated icon rotation. The plus icon rotates 45 degrees to form an X when opened.'
      }
    }
  }
};

// With trigger text
export const WithTriggerText: Story = {
  args: {
    triggerText: 'More Information',
    contentDescription: 'additional details'
  },
  parameters: {
    docs: {
      description: {
        story: 'Collapsible with visible text label next to the icon.'
      }
    }
  }
};

// Starts open
export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
    triggerText: 'Details',
    content: 'This content is visible by default when the component loads.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Collapsible that starts in the open state.'
      }
    }
  }
};

// Rich content
export const RichContent: Story = {
  args: {
    triggerText: 'Image Details',
    contentDescription: 'image metadata and description',
    content: (
      <div className="space-y-2">
        <h4 className="font-semibold text-gray-800">Mountain Landscape</h4>
        <p className="text-sm text-gray-600">
          Photo taken in the Swiss Alps during golden hour. The mountain peaks are 
          reflected in the pristine alpine lake below.
        </p>
        <div className="text-xs text-gray-500 space-y-1">
          <div>Camera: Canon EOS R5</div>
          <div>Lens: 24-70mm f/2.8</div>
          <div>Settings: f/8, 1/125s, ISO 100</div>
        </div>
      </div>
    ),
    icon: <ImageIcon className="w-4 h-4 text-blue-600" />
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of collapsible image metadata with rich content including headings, paragraphs, and technical details.'
      }
    }
  }
};

// Source citation example
export const SourceCitation: Story = {
  args: {
    triggerText: 'Source Citation',
    contentDescription: 'source and references',
    content: (
      <div className="text-sm space-y-2">
        <div className="bg-gray-50 p-3 rounded border-l-4 border-blue-400">
          <p className="font-medium text-gray-800">Academic Source:</p>
          <p className="text-gray-700 mt-1">
            Smith, J. & Johnson, A. (2024). "Modern Language Learning Methodologies." 
            <em> Journal of Educational Research</em>, 45(3), 123-145.
          </p>
        </div>
        <div className="text-xs text-gray-500">
          <p>DOI: 10.1000/xyz123</p>
          <p>Retrieved: March 15, 2024</p>
        </div>
      </div>
    ),
    icon: <QuoteIcon className="w-4 h-4 text-purple-600" />,
    wrapperClassName: 'border border-purple-200 rounded-lg p-2 bg-purple-50'
  },
  parameters: {
    docs: {
      description: {
        story: 'Example usage for academic source citations with formatted references.'
      }
    }
  }
};

// Advanced animation examples
export const AdvancedAnimations: Story = {
  render: (args) => {
    const [states, setStates] = React.useState<Record<string, boolean>>({
      rotate: false,
      scale: false,
      chevron: false
    });
    
    return (
      <div className="space-y-4 w-full max-w-lg">
        <div className="text-sm font-medium text-gray-700 mb-3">Different Animation Styles:</div>
        
        {/* Rotating Plus */}
        <CollapsibleInfo
          {...args}
          triggerText="Rotating Plus Icon"
          content="Plus icon rotates 45° to form an X when opened."
          onOpenChange={(open) => setStates(prev => ({ ...prev, rotate: open }))}
          icon={
            <PlusIcon 
              className={`w-4 h-4 text-blue-600 transition-transform duration-300 ease-in-out ${
                states.rotate ? 'rotate-45' : 'rotate-0'
              }`} 
            />
          }
          wrapperClassName="border border-blue-200 rounded-lg p-3"
          triggerClassName="flex items-center p-2 hover:bg-blue-50 rounded transition-colors"
        />

        {/* Scaling Plus */}
        <CollapsibleInfo
          {...args}
          triggerText="Scaling Plus Icon"
          content="Plus icon scales and rotates for a more dramatic effect."
          onOpenChange={(open) => setStates(prev => ({ ...prev, scale: open }))}
          icon={
            <PlusIcon 
              className={`w-4 h-4 text-green-600 transition-all duration-300 ease-in-out ${
                states.scale ? 'rotate-45 scale-110' : 'rotate-0 scale-100'
              }`} 
            />
          }
          wrapperClassName="border border-green-200 rounded-lg p-3"
          triggerClassName="flex items-center p-2 hover:bg-green-50 rounded transition-colors"
        />

        {/* Chevron Alternative */}
        <CollapsibleInfo
          {...args}
          triggerText="Chevron Alternative"
          content="Using a chevron that rotates instead of a plus icon."
          onOpenChange={(open) => setStates(prev => ({ ...prev, chevron: open }))}
          icon={
            <svg 
              className={`w-4 h-4 text-purple-600 transition-transform duration-200 ${
                states.chevron ? 'rotate-180' : 'rotate-0'
              }`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          }
          wrapperClassName="border border-purple-200 rounded-lg p-3"
          triggerClassName="flex items-center p-2 hover:bg-purple-50 rounded transition-colors"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different animation approaches: rotating plus, scaling plus, and chevron rotation.'
      }
    }
  }
};

// Custom styling
export const CustomStyling: Story = {
  args: {
    triggerText: 'Advanced Settings',
    contentDescription: 'configuration options',
    content: (
      <div className="space-y-3">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="rounded" />
          <span className="text-sm">Enable notifications</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="rounded" />
          <span className="text-sm">Auto-save progress</span>
        </label>
        <div className="pt-2 border-t">
          <button className="text-xs text-blue-600 hover:text-blue-800">
            Reset to defaults
          </button>
        </div>
      </div>
    ),
    icon: <GearIcon className="w-5 h-5 text-orange-600" />,
    wrapperClassName: 'border-2 border-orange-200 rounded-xl p-3 bg-gradient-to-r from-orange-50 to-yellow-50',
    triggerClassName: 'flex items-center p-3 hover:bg-orange-100 rounded-lg transition-all duration-200 font-medium text-orange-800',
    contentClassName: 'pt-4 px-2',
    iconClassName: 'w-5 h-5'
  },
  parameters: {
    docs: {
      description: {
        story: 'Heavily customized styling with gradients, custom colors, and interactive content.'
      }
    }
  }
};

// Minimal styling
export const Minimal: Story = {
  args: {
    content: 'Simple collapsible content with minimal styling.',
    wrapperClassName: '',
    triggerClassName: 'flex items-center text-blue-600 hover:text-blue-800 text-sm',
    iconClassName: 'w-3 h-3 mr-1',
    contentClassName: 'pl-4 pt-1 text-sm text-gray-600 border-l-2 border-blue-200 ml-2 mt-2'
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal styling approach with subtle visual hierarchy.'
      }
    }
  }
};

// Multiple collapsibles
export const MultipleCollapsibles: Story = {
  render: (args) => (
    <div className="space-y-4 w-full max-w-2xl">
      <CollapsibleInfo
        {...args}
        triggerText="Question 1"
        content="What is the capital of France? The answer is Paris, which has been the capital since the medieval period."
        contentDescription="question 1 explanation"
        icon={<InfoCircledIcon className="w-4 h-4 text-blue-500" />}
        wrapperClassName="border border-blue-200 rounded-lg p-3"
        triggerClassName="flex items-center p-2 hover:bg-blue-50 rounded transition-colors text-blue-800"
      />
      <CollapsibleInfo
        {...args}
        triggerText="Question 2"
        content="How do you say 'hello' in Spanish? The most common greeting is 'Hola', which is used in both formal and informal contexts."
        contentDescription="question 2 explanation"
        icon={<InfoCircledIcon className="w-4 h-4 text-green-500" />}
        wrapperClassName="border border-green-200 rounded-lg p-3"
        triggerClassName="flex items-center p-2 hover:bg-green-50 rounded transition-colors text-green-800"
      />
      <CollapsibleInfo
        {...args}
        triggerText="Question 3"
        content="What is the past tense of 'go'? The simple past tense is 'went', which is an irregular verb form."
        contentDescription="question 3 explanation"
        icon={<InfoCircledIcon className="w-4 h-4 text-purple-500" />}
        wrapperClassName="border border-purple-200 rounded-lg p-3"
        triggerClassName="flex items-center p-2 hover:bg-purple-50 rounded transition-colors text-purple-800"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple CollapsibleInfo components showing how they work independently with different themes.'
      }
    }
  }
};

// Accessibility showcase
export const AccessibilityShowcase: Story = {
  args: {
    triggerText: 'Accessibility Features',
    contentDescription: 'accessibility information',
    ariaLabel: 'Show accessibility features for this component',
    contentId: 'accessibility-demo-content',
    content: (
      <div className="space-y-3 text-sm">
        <div className="bg-green-50 p-3 rounded border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">✓ Accessibility Features</h4>
          <ul className="text-green-700 space-y-1 text-xs">
            <li>• Proper ARIA labels and descriptions</li>
            <li>• Keyboard navigation support</li>
            <li>• Screen reader announcements</li>
            <li>• Focus management</li>
            <li>• Semantic HTML structure</li>
            <li>• Live regions for dynamic content</li>
          </ul>
        </div>
        <p className="text-gray-600 text-xs">
          Try navigating with Tab key and activating with Enter or Space.
        </p>
      </div>
    )
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-lg">
        <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-800 mb-1">Accessibility Test</h3>
          <p className="text-xs text-blue-700">
            Use Tab to focus the trigger, then Enter/Space to toggle. Screen readers will announce state changes.
          </p>
        </div>
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates all accessibility features including ARIA labels, keyboard navigation, and screen reader support.'
      }
    }
  }
};

// Interactive state demo
export const InteractiveDemo: Story = {
  render: (args) => {
    const [, setOpenStates] = React.useState<Record<string, boolean>>({});
    const [eventLog, setEventLog] = React.useState<string[]>([]);

    const handleOpenChange = (id: string) => (open: boolean) => {
      args.onOpenChange?.(open);
      setOpenStates(prev => ({ ...prev, [id]: open }));
      setEventLog(prev => [
        ...prev.slice(-4), // Keep only last 5 events
        `${id}: ${open ? 'opened' : 'closed'} at ${new Date().toLocaleTimeString()}`
      ]);
    };

    return (
      <div className="w-full max-w-2xl space-y-4">
        <div className="bg-gray-50 p-3 rounded border">
          <h3 className="text-sm font-semibold mb-2">Event Log:</h3>
          <div className="text-xs text-gray-600 space-y-1 font-mono max-h-20 overflow-y-auto">
            {eventLog.length === 0 ? (
              <div className="text-gray-400">No events yet...</div>
            ) : (
              eventLog.map((event, i) => <div key={i}>{event}</div>)
            )}
          </div>
        </div>
        
        <CollapsibleInfo
          {...args}
          triggerText="Demo Section 1"
          content="This is the first collapsible section. Try opening and closing it!"
          contentDescription="demo section 1"
          onOpenChange={handleOpenChange('section-1')}
          wrapperClassName="border rounded-lg p-3"
        />
        
        <CollapsibleInfo
          {...args}
          triggerText="Demo Section 2"
          content="This is the second collapsible section. The event log above will track all interactions!"
          contentDescription="demo section 2"
          onOpenChange={handleOpenChange('section-2')}
          wrapperClassName="border rounded-lg p-3"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo with event logging to show how the onOpenChange callback works.'
      }
    }
  }
};