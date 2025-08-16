import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import React from 'react';
import SubmitSection from './SubmitSection';

const meta: Meta<typeof SubmitSection> = {
  title: 'UI Components/SubmitSection',
  component: SubmitSection,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Footer component with submit button for multiple choice questions. Includes loading states, accessibility features, and conditional visibility.'
      }
    }
  },
  argTypes: {
    hideBtn: {
      description: 'Controls visibility of the submit section',
      control: { type: 'select' },
      options: ['visible', 'hidden']
    },
    btnClassName: {
      description: 'CSS classes for the submit button styling',
      control: 'text'
    },
    checkAnswer: {
      description: 'Function called when submit button is clicked',
      action: 'checkAnswer'
    },
    disabled: {
      description: 'Whether the submit button is disabled',
      control: 'boolean'
    },
    ariaDescribedby: {
      description: 'ID of element that describes the submit button',
      control: 'text'
    },
    isLoading: {
      description: 'Whether the submission is in progress',
      control: 'boolean'
    }
  },
  args: {
    hideBtn: 'visible',
    btnClassName: 'font-gyst font-serif',
    checkAnswer: fn(),
    disabled: false,
    isLoading: false
  },
  decorators: [
    (Story) => (
      <div className="w-96 border rounded-lg shadow-sm bg-white">
        <div className="p-4 text-center text-gray-500 text-sm">
          Question content would be above this
        </div>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof SubmitSection>;

// Default state - ready to submit
export const Default: Story = {};

// Disabled state (no answer selected)
export const Disabled: Story = {
  args: {
    disabled: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Submit button is disabled when no answer is selected. Shows accessibility message for screen readers.'
      }
    }
  }
};

// Loading state (submitting answer)
export const Loading: Story = {
  args: {
    isLoading: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state shown while answer is being processed. Button is disabled and shows "CHECKING..." text.'
      }
    }
  }
};

// Hidden state
export const Hidden: Story = {
  args: {
    hideBtn: 'hidden'
  },
  parameters: {
    docs: {
      description: {
        story: 'Submit section is completely hidden from view. Useful when submit functionality is not available.'
      }
    }
  }
};

// With accessibility description
export const WithAriaDescription: Story = {
  args: {
    ariaDescribedby: 'submit-help-text'
  },
  decorators: [
    (Story) => (
      <div className="w-96 border rounded-lg shadow-sm bg-white">
        <div className="p-4">
          <p className="text-center text-gray-500 text-sm mb-4">
            Question content would be above this
          </p>
          <div id="submit-help-text" className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
            Make sure to select your answer before submitting. You can change your selection until you click submit.
          </div>
        </div>
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Submit section with additional descriptive text referenced by aria-describedby for enhanced accessibility.'
      }
    }
  }
};

// Alternative button styling
export const AlternativeFont: Story = {
  args: {
    btnClassName: 'font-mono text-sm tracking-wider'
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how different font classes affect the submit button appearance. Falls back to font-serif if font-gyst is unavailable.'
      }
    }
  }
};

// Disabled and loading (edge case)
export const DisabledAndLoading: Story = {
  args: {
    disabled: true,
    isLoading: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case where button is both disabled and loading. Button remains disabled with loading text.'
      }
    }
  }
};

// Interactive demo - shows state changes
export const InteractiveDemo: Story = {
  render: (args) => {
    const [currentState, setCurrentState] = React.useState<'ready' | 'disabled' | 'loading' | 'hidden'>('disabled');
    
    const stateConfig = {
      ready: { disabled: false, isLoading: false, hideBtn: 'visible' },
      disabled: { disabled: true, isLoading: false, hideBtn: 'visible' },
      loading: { disabled: false, isLoading: true, hideBtn: 'visible' },
      hidden: { disabled: false, isLoading: false, hideBtn: 'hidden' }
    };

    return (
      <div className="w-96 border rounded-lg shadow-sm bg-white">
        <div className="p-4">
          <p className="text-center text-gray-500 text-sm mb-4">
            Interactive demo - try different states:
          </p>
          <div className="flex gap-2 mb-4 flex-wrap justify-center">
            {Object.keys(stateConfig).map((state) => (
              <button
                key={state}
                onClick={() => setCurrentState(state as any)}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  currentState === state 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {state.charAt(0).toUpperCase() + state.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <SubmitSection
          {...args}
          {...stateConfig[currentState]}
          checkAnswer={() => {
            args.checkAnswer();
            // Simulate loading state
            if (currentState === 'ready') {
              setCurrentState('loading');
              setTimeout(() => setCurrentState('ready'), 2000);
            }
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo allowing you to test all different states of the SubmitSection component.'
      }
    }
  }
};

// Full card context
export const InCardContext: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-2xl mx-auto bg-white border rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Sample Multiple Choice Question</h2>
          <p className="text-gray-700 mb-4">What is the capital of France?</p>
          <div className="space-y-2 mb-4">
            <label className="flex items-center space-x-2">
              <input type="radio" name="answer" value="a" className="text-blue-500" />
              <span>London</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="answer" value="b" className="text-blue-500" />
              <span>Berlin</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="answer" value="c" className="text-blue-500" />
              <span>Paris</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="answer" value="d" className="text-blue-500" />
              <span>Madrid</span>
            </label>
          </div>
        </div>
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'SubmitSection shown in the context of a complete multiple choice question card.'
      }
    }
  }
};