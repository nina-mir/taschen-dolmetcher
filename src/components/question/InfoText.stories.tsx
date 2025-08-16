import type { Meta, StoryObj } from '@storybook/react';
import InfoText from './InfoText';
import { InfoItem } from '@/types';

// Mock InfoItem data
const mockInfoItem: InfoItem = {
  text: "The Battle of Stalingrad (1942-1943) was a major turning point in World War II, marking the beginning of Germany's retreat on the Eastern Front.",
  sourceChicago: "Beevor, Antony. Stalingrad: The Fateful Siege: 1942-1943. New York: Viking, 1998."
};

const mockLongInfoItem: InfoItem = {
  text: "The Battle of Stalingrad was one of the bloodiest battles in human history, with combined casualties estimated at nearly 2 million. The battle began in August 1942 when German forces attempted to capture the industrial city of Stalingrad. The urban warfare that ensued was brutal, with fighting taking place house by house, room by room. The Soviet counteroffensive, Operation Uranus, launched in November 1942, encircled the German Sixth Army and ultimately led to their surrender in February 1943.",
  sourceChicago: "Glantz, David M., and Jonathan M. House. When Titans Clashed: How the Red Army Stopped Hitler. Lawrence: University Press of Kansas, 1995, pp. 142-178."
};

const mockShortInfoItem: InfoItem = {
  text: "DNA is the hereditary material in humans.",
  sourceChicago: "Watson, J. D., & Crick, F. H. (1953). Nature, 171(4356), 737-738."
};

const meta: Meta<typeof InfoText> = {
  title: 'UI Components/InfoText',
  component: InfoText,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A component that displays informational text with optional collapsible source citations. Uses CollapsibleInfo for expandable source information.'
      }
    }
  },
  argTypes: {
    info: {
      description: 'Information item containing text and source citation',
      control: 'object'
    },
    isSourceCollapsible: {
      description: 'Whether the source citation should be collapsible',
      control: 'boolean'
    },
    wrapperClassName: {
      description: 'CSS classes for the main wrapper',
      control: 'text'
    },
    infoTextClassName: {
      description: 'CSS classes for the info text paragraph',
      control: 'text'
    },
    citeSourceClassName: {
      description: 'CSS classes for the citation',
      control: 'text'
    },
    collapsibleDefault: {
      description: 'Default open state for collapsible source',
      control: 'boolean',
      if: { arg: 'isSourceCollapsible', eq: true }
    },
    id: {
      description: 'HTML id attribute',
      control: 'text'
    },
    ariaLabel: {
      description: 'Accessible label for the component',
      control: 'text'
    },
    role: {
      description: 'ARIA role for the component',
      control: 'text'
    }
  },
  args: {
    info: mockInfoItem,
    isSourceCollapsible: false,
    wrapperClassName: 'bg-gray-50 p-4 rounded-lg border',
    infoTextClassName: 'text-gray-800 mb-2',
    citeSourceClassName: 'text-sm text-gray-600 italic',
    collapsibleDefault: true,
    role: 'complementary'
  }
};

export default meta;
type Story = StoryObj<typeof InfoText>;

// Default story - non-collapsible source
export const Default: Story = {};

// Collapsible source version
export const CollapsibleSource: Story = {
  args: {
    isSourceCollapsible: true,
    wrapperClassName: 'bg-blue-50 p-4 rounded-lg border border-blue-200 relative',
    collapsibleDefault: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Version with collapsible source citation using CollapsibleInfo component.'
      }
    }
  }
};

// Collapsible source open by default
export const CollapsibleSourceOpen: Story = {
  args: {
    isSourceCollapsible: true,
    collapsibleDefault: true,
    wrapperClassName: 'bg-green-50 p-4 rounded-lg border border-green-200 relative'
  }
};

// Long text content
export const LongContent: Story = {
  args: {
    info: mockLongInfoItem,
    isSourceCollapsible: true,
    wrapperClassName: 'bg-gray-50 p-6 rounded-lg border max-w-2xl relative',
    infoTextClassName: 'text-gray-800 mb-4 leading-relaxed',
    citeSourceClassName: 'text-sm text-gray-600 italic leading-snug'
  },
  parameters: {
    docs: {
      description: {
        story: 'Longer informational text with detailed source citation in collapsible format.'
      }
    }
  }
};

// Short content
export const ShortContent: Story = {
  args: {
    info: mockShortInfoItem,
    wrapperClassName: 'bg-yellow-50 p-3 rounded border border-yellow-200',
    infoTextClassName: 'text-gray-800 font-medium',
    citeSourceClassName: 'text-xs text-gray-500 mt-1 block'
  }
};

// Academic/formal styling
export const AcademicStyle: Story = {
  args: {
    info: mockInfoItem,
    isSourceCollapsible: true,
    wrapperClassName: 'bg-white p-6 border-l-4 border-blue-600 shadow-sm relative',
    infoTextClassName: 'text-gray-900 font-serif text-lg leading-relaxed mb-3',
    citeSourceClassName: 'text-sm text-blue-700 font-mono bg-blue-50 p-2 rounded border-l-2 border-blue-200',
    collapsibleDefault: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Academic styling with serif fonts and formal citation formatting.'
      }
    }
  }
};

// Card-like styling
export const CardStyle: Story = {
  args: {
    isSourceCollapsible: true,
    wrapperClassName: 'bg-white p-6 rounded-xl shadow-lg border border-gray-100 relative max-w-md',
    infoTextClassName: 'text-gray-700 leading-relaxed mb-4',
    citeSourceClassName: 'text-xs block text-gray-500 bg-gray-50 p-3 rounded-md ',
    collapsibleDefault: true
  }
};

// With accessibility features
export const WithAccessibility: Story = {
    args: {
      info: mockInfoItem,
      isSourceCollapsible: true,
      collapsibleDefault: true,
      id: 'info-section-1',
      ariaLabel: 'Historical information about the Battle of Stalingrad',
      wrapperClassName: 'bg-indigo-50 p-4 rounded-lg border border-indigo-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 relative',
      infoTextClassName: 'text-indigo-900 mb-3',
      citeSourceClassName: 'text-white text-sm bg-gray-500/90'
    },
    decorators: [
      (Story) => (
        <div>
          <Story />
          <div className="mt-14 p-3 bg-indigo-100 rounded border text-sm">
            <h4 className="font-semibold text-indigo-800 mb-2">Accessibility Features:</h4>
            <ul className="text-indigo-700 space-y-1 text-xs">
              <li>• <code>id="info-section-1"</code> - Unique identifier</li>
              <li>• <code>role="complementary"</code> - Semantic landmark</li>
              <li>• <code>aria-label</code> - Descriptive label for screen readers</li>
              <li>• <code>role="text"</code> - Explicitly marks text content</li>
              <li>• <code>role="doc-credit"</code> - Semantic citation markup</li>
              <li>• Focus ring visible on keyboard navigation</li>
              <li>• Collapsible source includes ARIA controls</li>
            </ul>
          </div>
        </div>
      )
    ],
    parameters: {
      docs: {
        description: {
          story: 'Component with full accessibility attributes including id, aria-label, and focus management.'
        }
      }
    }
   };

// Error/warning state
export const WarningInfo: Story = {
  args: {
    info: {
      text: "This information is based on preliminary research and should be verified before use.",
      sourceChicago: "Internal Research Team. Preliminary Findings Report. Company Archives, 2024."
    },
    isSourceCollapsible: true,
    wrapperClassName: 'bg-orange-50 p-4 rounded-lg border border-orange-300 relative',
    infoTextClassName: 'text-orange-900 font-medium flex items-start gap-2',
    citeSourceClassName: 'text-orange-700 text-sm',
    collapsibleDefault: false
  },
  decorators: [
    (Story) => (
      <div className="flex items-start gap-2">
        <svg className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <div className="flex-1">
          <Story />
        </div>
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Warning-style information with icon and alert styling.'
      }
    }
  }
};

// Multiple info sections (showing reusability)
export const MultipleInfoSections: Story = {
  render: (args) => (
    <div className="space-y-14 max-w-3xl">
      <InfoText 
        {...args}
        info={mockInfoItem}
        id="info-1"
        ariaLabel="Battle of Stalingrad information"
        wrapperClassName="bg-blue-50 p-4 rounded-lg border border-blue-200 relative"
        citeSourceClassName='bg-black text-white'
        isSourceCollapsible={true}
        collapsibleDefault={false}
      />
      <InfoText 
        {...args}
        info={mockShortInfoItem}
        id="info-2"
        ariaLabel="DNA information"
        wrapperClassName="bg-green-50 p-4 rounded-lg border border-green-200 relative"
        citeSourceClassName='bg-black text-white'
        isSourceCollapsible={true}
        collapsibleDefault={true}
      />
      <InfoText 
        {...args}
        info={mockLongInfoItem}
        id="info-3"
        ariaLabel="Extended battle information"
        wrapperClassName="bg-purple-50 p-4 rounded-lg border border-purple-200"
        isSourceCollapsible={false}
        infoTextClassName="text-purple-900 mb-2"
        citeSourceClassName="text-purple-700 text-sm italic"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple InfoText components showing different configurations and states working together.'
      }
    }
  }
};

// Responsive behavior
export const Responsive: Story = {
  args: {
    info: mockLongInfoItem,
    isSourceCollapsible: true,
    wrapperClassName: 'bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-lg border w-full relative',
    infoTextClassName: 'text-gray-800 text-sm sm:text-base lg:text-lg leading-relaxed mb-2 sm:mb-4',
    citeSourceClassName: 'text-xs sm:text-sm text-gray-600 italic'
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1024px', height: '768px' } }
      }
    },
    docs: {
      description: {
        story: 'Responsive InfoText that adjusts typography and spacing across different screen sizes.'
      }
    }
  }
};