import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import React from 'react';
import QuestionHeader from './QuestionHeader';

const meta: Meta<typeof QuestionHeader> = {
  title: 'UI Components/QuestionHeader',
  component: QuestionHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Header component for multiple choice questions. Displays question number, content, and reset functionality with accessibility features.'
      }
    }
  },
  argTypes: {
    toggleFinalResult: {
      description: 'Function called when reset button is clicked',
      action: 'toggleFinalResult'
    },
    question: {
      description: 'The question text to display',
      control: 'text'
    },
    id: {
      description: 'Question number/identifier',
      control: { type: 'number', min: 0 }
    },
    textColor: {
      description: 'Tailwind text color class for the dot and reset button',
      control: { type: 'select' },
      options: [
        'text-blue-500',
        'text-green-500', 
        'text-red-500',
        'text-purple-500',
        'text-orange-500',
        'text-gray-600',
        'text-black', 
        'text-soviet-gold'
      ]
    },
    idClassName: {
      description: 'CSS classes for the question ID styling',
      control: 'text'
    },
    questionId: {
      description: 'HTML ID for the question heading',
      control: 'text'
    }
  },
  args: {
    toggleFinalResult: fn(),
    question: 'Gibt es russische Truppen im Dorf?',
    id: 1,
    textColor: 'text-blue-500',
    idClassName: 'font-gyst font-sans',
    questionId: 'question-1'
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl border rounded-lg shadow-sm bg-white">
        <Story />
        <div className="p-4 text-sm text-gray-500 border-t">
          Question content and answer choices would appear below...
        </div>
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof QuestionHeader>;

// Default story
export const Default: Story = {};

// Long question text
export const LongQuestion: Story = {
  args: {
    question: 'Which of the following sentences correctly demonstrates the use of the subjunctive mood in Spanish when expressing doubt or uncertainty about a past event?',
    id: 5
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how the component handles longer question text with proper wrapping and layout.'
      }
    }
  }
};

// Short question
export const ShortQuestion: Story = {
  args: {
    question: '¿Cómo estás?',
    id: 2
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple, short question demonstrating minimal content layout.'
      }
    }
  }
};

// Different question numbers
export const HighQuestionNumber: Story = {
  args: {
    question: 'Bei Fluchtversuch wird geschossen!',
    id: 127
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how larger question numbers are displayed.'
      }
    }
  }
};

// Different color themes
export const GreenTheme: Story = {
  args: {
    question: 'Which verb form is correct in this context?',
    id: 3,
    textColor: 'text-green-500'
  }
};

export const RedTheme: Story = {
  args: {
    question: 'Identify the grammatical error in this sentence.',
    id: 4,
    textColor: 'text-red-500'
  }
};

export const PurpleTheme: Story = {
  args: {
    question: 'What is the plural form of this noun?',
    id: 6,
    textColor: 'text-purple-500'
  }
};

// Custom font styling
export const CustomIdStyling: Story = {
  args: {
    question: 'Choose the correct pronunciation guide.',
    id: 8,
    idClassName: 'font-mono text-lg font-bold',
    textColor: 'text-orange-500'
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom styling for the question ID number using different font classes.'
      }
    }
  }
};

// Accessibility focused
export const AccessibilityDemo: Story = {
  args: {
    question: 'What does "biblioteca" mean in English?',
    id: 7,
    questionId: 'accessible-question-demo',
    textColor: 'text-gray-600'
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl border rounded-lg shadow-sm bg-white">
        <Story />
        <div className="p-4 border-t bg-blue-50">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">Accessibility Features:</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Question number has aria-label</li>
            <li>• Question text is focusable (tabIndex=0)</li>
            <li>• Reset button has descriptive aria-label and title</li>
            <li>• Icons are hidden from screen readers (aria-hidden)</li>
            <li>• Keyboard navigation support (Enter/Space)</li>
            <li>• Focus ring styling for keyboard users</li>
          </ul>
        </div>
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates all accessibility features including keyboard navigation, ARIA labels, and focus management.'
      }
    }
  }
};

// Interactive reset demo
export const InteractiveReset: Story = {
  render: (args) => {
    const [resetCount, setResetCount] = React.useState(0);
    const [lastReset, setLastReset] = React.useState<string>('');

    return (
      <div className="w-full max-w-2xl border rounded-lg shadow-sm bg-white">
        <QuestionHeader
          {...args}
          toggleFinalResult={() => {
            args.toggleFinalResult();
            setResetCount(prev => prev + 1);
            setLastReset(new Date().toLocaleTimeString());
          }}
        />
        <div className="p-4 border-t bg-gray-50">
          <p className="text-sm text-gray-600">
            Reset button clicked: <span className="font-semibold">{resetCount} times</span>
          </p>
          {lastReset && (
            <p className="text-xs text-gray-500 mt-1">
              Last reset: {lastReset}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-2">
            Try clicking the reset button or using keyboard (Tab to focus, then Enter/Space)
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing reset button functionality and keyboard navigation.'
      }
    }
  }
};

// Multiple questions layout
export const MultipleQuestions: Story = {
  render: (args) => (
    <div className="space-y-4 w-full max-w-2xl">
      <div className="border rounded-lg shadow-sm bg-white">
        <QuestionHeader
          {...args}
          question="What is 'gracias' in English?"
          id={1}
          questionId="question-1"
          textColor="text-blue-500"
        />
      </div>
      <div className="border rounded-lg shadow-sm bg-white">
        <QuestionHeader
          {...args}
          question="Choose the correct article for 'casa'."
          id={2}
          questionId="question-2"
          textColor="text-green-500"
        />
      </div>
      <div className="border rounded-lg shadow-sm bg-white">
        <QuestionHeader
          {...args}
          question="Which verb tense is used in this sentence?"
          id={3}
          questionId="question-3"
          textColor="text-purple-500"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple QuestionHeader components showing how they work in a series of questions with different themes.'
      }
    }
  }
};

// Hover state demo
export const HoverStateDemo: Story = {
  args: {
    question: 'Hover over the reset button to see the interaction states.',
    id: 9,
    textColor: 'text-blue-600'
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl border rounded-lg shadow-sm bg-white">
        <Story />
        <div className="p-4 border-t bg-yellow-50">
          <p className="text-sm text-yellow-800">
            💡 Hover over the reset button to see the color transition and background change
          </p>
        </div>
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Shows the hover and focus states of the reset button with smooth transitions.'
      }
    }
  }
};

// Edge case - very long ID
export const EdgeCaseLongId: Story = {
  args: {
    question: 'This question has an unusually high number.',
    id: 99999,
    textColor: 'text-gray-700'
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case testing with a very large question ID number.'
      }
    }
  }
};