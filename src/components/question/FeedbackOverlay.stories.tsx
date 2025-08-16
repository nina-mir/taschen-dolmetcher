import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import FeedbackOverlay from './FeedbackOverlay';

const meta: Meta<typeof FeedbackOverlay> = {
  title: 'UI Components/FeedbackOverlay',
  component: FeedbackOverlay,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Overlay component for showing feedback messages when answers are incorrect. Features accessibility support, customizable styling, and optional background imagery.'
      }
    }
  },
  argTypes: {
    isVisible: {
      description: 'Controls whether the overlay is shown or hidden',
      control: 'boolean'
    },
    backgroundImgUrl: {
      description: 'URL of background image to display behind the feedback',
      control: 'text'
    },
    messageText: {
      description: 'Main feedback message text (e.g., wrong❌⚠️falsch❌⚠️неправильный)',
      control: 'text'
    },
    captionText: {
      description: 'Additional caption text shown at bottom',
      control: 'text'
    },
    ariaLabel: {
      description: 'Aria label for the entire feedback overlay',
      control: 'text'
    },
    containerClassName: {
      description: 'CSS classes for the overlay container',
      control: 'text'
    },
    messageClassName: {
      description: 'CSS classes for the main message',
      control: 'text'
    },
    captionClassName: {
      description: 'CSS classes for the caption text',
      control: 'text'
    },
    backgroundStyle: {
      description: 'Additional CSS styles for the background',
      control: 'object'
    }
  },
  args: {
    isVisible: true,
    messageText: 'wrong❌⚠️falsch❌',
    captionText: 'Wrong Answer!',
    ariaLabel: 'Answer feedback'
  },
  decorators: [
    (Story) => (
      <div className="relative w-96 h-64 border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg">
        <div className="absolute inset-2 bg-white rounded border shadow-sm flex items-center justify-center text-gray-400 text-sm">
          Question content would be here
        </div>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof FeedbackOverlay>;

// Default story
export const Default: Story = {};

// Hidden state
export const Hidden: Story = {
  args: {
    isVisible: false
  },
  parameters: {
    docs: {
      description: {
        story: 'When isVisible is false, the overlay renders nothing (null).'
      }
    }
  }
};

// Different languages
export const English: Story = {
  args: {
    messageText: 'WRONG ❌',
    captionText: 'Try again!'
  }
};

export const Spanish: Story = {
  args: {
    messageText: 'INCORRECTO ❌',
    captionText: '¡Inténtalo de nuevo!'
  }
};

export const German: Story = {
  args: {
    messageText: 'FALSCH ❌',
    captionText: 'Versuchen Sie es erneut!'
  }
};

export const Russian: Story = {
  args: {
    messageText: 'НЕПРАВИЛЬНО ❌',
    captionText: 'Попробуйте еще раз!'
  }
};

export const Mixed: Story = {
  args: {
    messageText: 'wrong❌⚠️falsch❌⚠️неправильный',
    captionText: 'Wrong Answer! | ¡Respuesta incorrecta! | Falsche Antwort!'
  }
};

// Without caption
export const NoCaption: Story = {
  args: {
    messageText: 'INCORRECT ❌',
    captionText: undefined
  },
  parameters: {
    docs: {
      description: {
        story: 'Feedback overlay with only the main message, no caption text.'
      }
    }
  }
};

// With background image
export const WithBackgroundImage: Story = {
  args: {
    messageText: 'WRONG ❌',
    captionText: 'Study the image more carefully',
    backgroundImgUrl: 'https://picsum.photos/400/300?random=10'
  },
  parameters: {
    docs: {
      description: {
        story: 'Overlay with a background image, useful for visual learning questions.'
      }
    }
  }
};

// Custom styling - Warning style
export const WarningStyle: Story = {
  args: {
    messageText: 'INCORRECT ⚠️',
    captionText: 'Review the question',
    messageClassName: 'text-2xl text-yellow-900 bg-yellow-400/90 p-4 rounded-lg font-bold border-2 border-yellow-600 shadow-lg',
    captionClassName: 'bg-yellow-900/70 text-yellow-100 px-6 py-3 rounded-lg font-semibold text-lg backdrop-blur-sm border border-yellow-600'
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom warning-style theme with yellow colors and bold styling.'
      }
    }
  }
};

// Custom styling - Minimal style
export const MinimalStyle: Story = {
  args: {
    messageText: 'Try again',
    captionText: 'Not quite right',
    messageClassName: 'text-lg text-gray-800 bg-white/95 p-3 rounded-md shadow-sm border',
    captionClassName: 'bg-gray-100/90 text-gray-700 px-4 py-2 rounded-md text-sm backdrop-blur-sm',
    containerClassName: 'absolute inset-0 flex flex-col items-center justify-center gap-4 z-10'
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal, clean styling with subtle colors and centered layout.'
      }
    }
  }
};

// Custom styling - Dramatic style
export const DramaticStyle: Story = {
  args: {
    messageText: 'WRONG! ❌',
    captionText: 'Better luck next time!',
    messageClassName: 'text-3xl text-white bg-red-600/95 p-6 rounded-xl font-black shadow-2xl border-4 border-red-800 transform -rotate-2',
    captionClassName: 'bg-black/80 text-red-400 px-6 py-4 rounded-lg font-bold text-xl backdrop-blur-md shadow-lg border border-red-600',
    containerClassName: 'absolute inset-0 flex flex-col items-center justify-between p-8 z-10',
    backgroundStyle: { 
      backgroundColor: 'rgba(220, 38, 38, 0.1)',
      backgroundBlendMode: 'multiply' as const
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'High-impact dramatic styling with rotation, shadows, and intense colors.'
      }
    }
  }
};

// Accessibility showcase
export const AccessibilityShowcase: Story = {
  args: {
    messageText: 'INCORRECT ❌',
    captionText: 'This overlay announces to screen readers',
    ariaLabel: 'Answer feedback: Your answer was incorrect, please try again'
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <div className="relative w-96 h-64 border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg">
          <div className="absolute inset-2 bg-white rounded border shadow-sm flex items-center justify-center text-gray-400 text-sm">
            Question content area
          </div>
          <Story />
        </div>
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">Accessibility Features:</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• <code>role="alert"</code> - Immediately announces to screen readers</li>
            <li>• <code>aria-live="assertive"</code> - Interrupts other announcements</li>
            <li>• <code>aria-label</code> - Provides context for the overlay</li>
            <li>• Semantic HTML structure with header/footer roles</li>
            <li>• High contrast colors for visibility</li>
          </ul>
        </div>
        
      </div>
    )
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Demonstrates all accessibility features including ARIA roles, live regions, and semantic structure.'
      }
    }
  }
};

// Different screen sizes
export const MobileView: Story = {
  args: {
    messageText: 'WRONG ❌',
    captionText: 'Try again!',
    messageClassName: 'text-lg text-soviet-gold bg-red-500/80 p-2 rounded',
    captionClassName: 'bg-black/50 text-white px-3 py-2 rounded font-semibold text-base backdrop-blur-sm'
  },
  decorators: [
    (Story) => (
      <div className="relative w-80 h-48 border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg">
        <div className="absolute inset-2 bg-white rounded border shadow-sm flex items-center justify-center text-gray-400 text-xs">
          Mobile question view
        </div>
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Optimized for mobile screens with smaller text and padding.'
      }
    }
  }
};

export const DesktopView: Story = {
  args: {
    messageText: 'INCORRECT ❌',
    captionText: 'Review the question and try again',
    messageClassName: 'text-3xl text-soviet-gold bg-red-500/80 p-6 md:self-start rounded-lg shadow-lg',
    captionClassName: 'bg-black/50 text-white px-6 py-4 rounded-lg font-semibold text-xl backdrop-blur-sm'
  },
  decorators: [
    (Story) => (
      <div className="relative w-[600px] h-80 border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg">
        <div className="absolute inset-4 bg-white rounded border shadow-sm flex items-center justify-center text-gray-400">
          Desktop question view - larger content area
        </div>
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Desktop-optimized layout with larger text and spacing.'
      }
    }
  }
};

// Interactive demo
export const InteractiveDemo: Story = {
  render: (args) => {
    const [isVisible, setIsVisible] = React.useState(true);
    const [currentMessage, setCurrentMessage] = React.useState(0);
    
    const messages = [
      { text: 'WRONG ❌', caption: 'Try again!' },
      { text: 'INCORRECT ⚠️', caption: 'Not quite right' },
      { text: 'FALSCH ❌', caption: 'Versuchen Sie es erneut!' },
      { text: 'НЕПРАВИЛЬНО ❌', caption: 'Попробуйте еще раз!' }
    ];

    const toggleVisibility = () => setIsVisible(!isVisible);
    const nextMessage = () => setCurrentMessage((prev) => (prev + 1) % messages.length);

    return (
      <div className="w-full max-w-2xl space-y-4">
        <div className="relative flex gap-2 justify-center">
          <button
            onClick={toggleVisibility}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {isVisible ? 'Hide' : 'Show'} Overlay
          </button>
          <button
            onClick={nextMessage}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Next Message
          </button>
        </div>
        
        <div className="relative w-full h-64 border-2 border-dashed border-gray-300 bg-red-500 rounded-lg">
          <div className="absolute inset-4 bg-white rounded border shadow-sm flex items-center justify-center text-gray-400">
            Interactive demo - use buttons above
          </div>
          <FeedbackOverlay
            {...args}
            isVisible={isVisible}
            messageText={messages[currentMessage].text}
            captionText={messages[currentMessage].caption}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo allowing you to toggle visibility and cycle through different feedback messages.'
      }
    }
  }
};

// Multiple overlays context
export const InQuestionContext: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-2xl mx-auto bg-white border rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Question 5: What is the capital of Spain?</h2>
          <div className="space-y-2 mb-4">
            <label className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
              <input type="radio" name="answer" value="a" className="text-red-500" />
              <span>Barcelona</span>
              <span className="ml-auto text-red-500 font-bold">✗ Selected</span>
            </label>
            <label className="flex items-center space-x-2 p-2 border rounded">
              <input type="radio" name="answer" value="b" />
              <span>Madrid</span>
              <span className="ml-auto text-green-500">✓ Correct</span>
            </label>
            <label className="flex items-center space-x-2 p-2 border rounded">
              <input type="radio" name="answer" value="c" />
              <span>Seville</span>
            </label>
          </div>
          <button className="w-full py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed">
            SUBMIT (Answered incorrectly)
          </button>
        </div>
        <div className="relative h-48 bg-gradient-to-br from-red-100 to-orange-100">
          <Story />
        </div>
      </div>
    )
  ],
  args: {
    messageText: 'INCORRECTO ❌',
    captionText: 'Madrid is the capital of Spain!'
  },
  parameters: {
    docs: {
      description: {
        story: 'FeedbackOverlay shown in the context of a complete multiple choice question after an incorrect answer.'
      }
    }
  }
};


// import type { Meta, StoryObj } from '@storybook/react';
// import React from 'react';
// import FeedbackOverlay from './FeedbackOverlay';

// const meta: Meta<typeof FeedbackOverlay> = {
//   title: 'UI Components/FeedbackOverlay',
//   component: FeedbackOverlay,
//   parameters: {
//     layout: 'centered',
//     docs: {
//       description: {
//         component: 'Overlay component that provides visual feedback for incorrect answers. Features background images, multilingual support, and accessibility announcements.'
//       }
//     }
//   },
//   argTypes: {
//     isVisible: {
//       description: 'Controls whether the overlay is visible',
//       control: 'boolean'
//     },
//     backgroundImgUrl: {
//       description: 'Optional background image URL for the overlay',
//       control: 'text'
//     },
//     messageText: {
//       description: 'Main feedback message (supports multilingual text)',
//       control: 'text'
//     },
//     captionText: {
//       description: 'Additional caption text at the bottom',
//       control: 'text'
//     },
//     ariaLabel: {
//       description: 'Accessibility label for the overlay',
//       control: 'text'
//     }
//   },
//   args: {
//     isVisible: true,
//     messageText: 'Wrong ❌',
//     captionText: 'Wrong Answer!',
//     ariaLabel: 'Answer feedback'
//   },
//   decorators: [
//     (Story) => (
//       <div className="relative w-96 h-64 bg-gradient-to-br from-blue-100 to-purple-900 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
//         <div className="absolute inset-4 bg-black rounded border flex items-center justify-center text-gray-400 text-sm">
//           Question content would be here
//         </div>
//         <Story />
//       </div>
//     )
//   ]
// };

// export default meta;
// type Story = StoryObj<typeof FeedbackOverlay>;

// // Default story
// export const Default: Story = {};

// // Hidden state
// export const Hidden: Story = {
//   args: {
//     isVisible: false
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: 'When isVisible is false, the component returns null and renders nothing.'
//       }
//     }
//   }
// };

// // Multilingual messages
// export const Spanish: Story = {
//   args: {
//     messageText: 'Incorrecto ❌',
//     captionText: '¡Respuesta Incorrecta!',
//     ariaLabel: 'Retroalimentación de respuesta'
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: 'Spanish language feedback message.'
//       }
//     }
//   }
// };

// export const German: Story = {
//   args: {
//     messageText: 'Falsch ❌⚠️',
//     captionText: 'Falsche Antwort!',
//     ariaLabel: 'Antwort-Feedback'
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: 'German language feedback message with warning emoji.'
//       }
//     }
//   }
// };

// export const Russian: Story = {
//   args: {
//     messageText: 'Неправильно ❌',
//     captionText: 'Неправильный ответ!',
//     ariaLabel: 'Обратная связь по ответу'
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: 'Russian language feedback message.'
//       }
//     }
//   }
// };

// // With background image
// export const WithBackgroundImage: Story = {
//   args: {
//     backgroundImgUrl: 'https://picsum.photos/400/300?random=1',
//     messageText: 'Wrong ❌⚠️',
//     captionText: 'Try Again!'
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: 'Feedback overlay with a background image. The image uses contain sizing and center positioning.'
//       }
//     }
//   }
// };

// // Without caption
// export const NoCaption: Story = {
//   args: {
//     messageText: 'Incorrect ❌',
//     captionText: undefined
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: 'Feedback overlay with only the main message, no bottom caption.'
//       }
//     }
//   }
// };

// // Long message text
// export const LongMessage: Story = {
//   args: {
//     messageText: 'Oops! That\'s not quite right ❌⚠️',
//     captionText: 'Don\'t worry, keep trying!'
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: 'Feedback with longer message text to test text wrapping and layout.'
//       }
//     }
//   }
// };

// // Custom styling example
// export const CustomStyling: Story = {
//   args: {
//     messageText: 'Not Correct ⚠️',
//     captionText: 'Review and try again'
//   },
//   decorators: [
//     (Story) => (
//       <div className="relative w-96 h-64 bg-gradient-to-br from-red-100 to-orange-100 border-2 border-red-200 rounded-lg overflow-hidden">
//         <div className="absolute inset-4 bg-white rounded border flex items-center justify-center text-gray-400 text-sm">
//           Math Problem: 2 + 2 = ?
//         </div>
//         <Story />
//       </div>
//     )
//   ],
//   parameters: {
//     docs: {
//       description: {
//         story: 'Feedback overlay in a custom-styled container with red theme to match error state.'
//       }
//     }
//   }
// };

// // Minimal feedback
// export const Minimal: Story = {
//   args: {
//     messageText: '❌',
//     captionText: ''
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: 'Minimal feedback with just an emoji, no caption text.'
//       }
//     }
//   }
// };

// // Multiple emoji styles
// export const EmojiVariations: Story = {
//   render: (args) => (
//     <div className="grid grid-cols-2 gap-0 p-0 h-fit bg-gray-700">
//       <div className="relative w-48 h-32 bg-gray-100 rounded-lg overflow-hidden border">
//         <div className="absolute inset-2 bg-white rounded flex items-center justify-center text-xs text-gray-400">
//           Question A
//         </div>
//         <FeedbackOverlay
//           {...args}
//           messageText="Wrong ❌"
//           captionText="Try again!"
//         />
//       </div>
//       <div className="relative w-48 h-32 bg-gray-100 rounded-lg overflow-hidden border">
//         <div className="absolute inset-2 bg-white rounded flex items-center justify-center text-xs text-gray-400">
//           Question B
//         </div>
//         <FeedbackOverlay
//           {...args}
//           messageText="Incorrect ⚠️"
//           captionText="Not quite!"
//         />
//       </div>
//       <div className="relative w-48 h-32 bg-gray-500 rounded-lg overflow-hidden border">
//         <div className="absolute inset-2 bg-white rounded flex items-center justify-center text-xs text-gray-400">
//           Question C
//         </div>
//         <FeedbackOverlay
//           {...args}
//           messageText="Nope ✖️"
//           captionText="Keep trying!"
//         />
//       </div>
//       <div className="relative w-48 h-30 bg-gray-500 rounded-lg border">
//         <div className="bg-white inset-2 absolute items-center rounded flex justify-center text-xs text-gray-400">
//           Question D
//         </div>
//         <FeedbackOverlay
//           {...args}
//           messageText="False 🚫"
//           captionText="Review the options"
//         />
//       </div>
//     </div>
//   ),
//   parameters: {
//     docs: {
//       description: {
//         story: 'Different emoji and message combinations for various feedback styles.'
//       }
//     }
//   }
// };

// // Accessibility showcase
// export const AccessibilityDemo: Story = {
//   args: {
//     messageText: 'Incorrect Answer ❌',
//     captionText: 'The correct answer was option C',
//     ariaLabel: 'Wrong answer feedback with explanation'
//   },
//   decorators: [
//     (Story) => (
//       <div className="relative w-full ">
//         <div className="bg-blue-50 rounded z-100 mb-2">
//           <h3 className="text-sm font-semibold text-blue-800">Accessibility Features:</h3>
//           <ul className="text-xs text-blue-700">
//             <li>• <code>role="alert"</code> for immediate screen reader announcement</li>
//             <li>• <code>aria-live="assertive"</code> for priority announcements</li>
//             <li>• <code>aria-label</code> provides context for the feedback</li>
//             <li>• <code>role="status"</code> for the main message</li>
//             <li>• <code>role="complementary"</code> for additional information</li>
//           </ul>
//         </div>
//         <div className="p-5 relative h-28 bg-gradient-to-br from-gray-500 to-gray-900 rounded-lg border">
//           <div className="text-right bg-gray-900 rounded  flex flex-col text-gray-200 text-lg p-4 w-full">
//             <span className=''>Which planet is closest to the Sun?<br />
//             <span className=" text-xs mt-11 block">Your answer: Earth (incorrect)</span>
//             </span>
//           </div>
//           <Story />
//         </div>
//       </div>
//     )
//   ],
//   parameters: {
//     docs: {
//       description: {
//         story: 'Demonstrates accessibility features including ARIA roles and live regions for screen reader support.'
//       }
//     }
//   }
// };

// // Interactive demo with toggle
// export const InteractiveToggle: Story = {
//   render: (args) => {
//     const [isVisible, setIsVisible] = React.useState(false);
//     const [messageIndex, setMessageIndex] = React.useState(0);
    
//     const messages = [
//       { text: 'Wrong ❌', caption: 'Try again!' },
//       { text: 'Incorrect ⚠️', caption: 'Not quite right!' },
//       { text: 'Falsch ❌', caption: 'Falsche Antwort!' },
//       { text: 'Неправильно ❌', caption: 'Попробуй еще раз!' }
//     ];
    
//     const currentMessage = messages[messageIndex];
    
//     return (
//       <div className="w-full max-w-md">
//         <div className="flex gap-2 justify-center flex-wrap">
//           <button
//             onClick={() => setIsVisible(!isVisible)}
//             className={`px-4 rounded text-sm font-medium transition-colors z-10 ${
//               isVisible 
//                 ? 'bg-red-500 text-white hover:bg-red-600' 
//                 : 'bg-green-500 text-white hover:bg-green-600'
//             }`}
//           >
//             {isVisible ? 'Hide Feedback' : 'Show Feedback'}
//           </button>
//           <button
//             onClick={() => setMessageIndex((prev) => (prev + 1) % messages.length)}
//             className="px-4 z-10 bg-blue-500 text-white rounded text-sm font-medium hover:bg-blue-600 transition-colors"
//           >
//             Change Message
//           </button>
//         </div>
//         <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg overflow-hidden border">
//           <div className="gap-3 absolute inset-1 bg-gray-400 rounded border flex items-center justify-center text-gray-900 text-lg text-center">
//             <span>What is 5 + 3?</span>
//             <div className="mt-2 space-x-2">
//               <button className="px-2 py-1 bg-gray-200 rounded text-lg">6</button>
//               <button className="px-2 py-1 bg-red-200 rounded text-lg border-2 border-red-400">7</button>
//               <button className="px-2 py-1 bg-gray-200 rounded text-lg">8</button>
//             </div>
//           </div>
//           <FeedbackOverlay
//             {...args}
//             isVisible={isVisible}
//             messageText={currentMessage.text}
//             captionText={currentMessage.caption}
//           />
//         </div>
//         <p className="text-xs text-gray-500 mt-2 text-center z-10">
//           Click buttons to toggle visibility and cycle through different feedback messages
//         </p>
//       </div>
//     );
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: 'Interactive demo allowing you to toggle visibility and cycle through different feedback messages.'
//       }
//     }
//   }
// };

// // Large screen layout
// export const LargeScreen: Story = {
//   args: {
//     messageText: 'Incorrect ❌⚠️',
//     captionText: 'The answer was B) Paris',
//     // backgroundImgUrl: 'https://picsum.photos/800/400?random=2'
//   },
//   decorators: [
//     (Story) => (
//       <div className=" w-[600px] h-80 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl overflow-hidden border shadow-lg">
//         <div className="absolute inset-8 bg-white rounded-lg border flex items-center justify-center text-gray-400">
//           <div className="text-center">
//             <h3 className="text-lg font-semibold mb-2">Geography Question</h3>
//             <p>What is the capital of France?</p>
//             <div className="mt-4 space-x-4">
//               <span className="px-3 py-1 bg-gray-200 rounded">A) London</span>
//               <span className="px-3 py-1 bg-red-200 border-2 border-red-400 rounded">B) Berlin</span>
//               <span className="px-3 py-1 bg-gray-200 rounded">C) Paris</span>
//             </div>
//           </div>
//         </div>
//         <Story />
//       </div>
//     )
//   ],
//   parameters: {
//     docs: {
//       description: {
//         story: 'Feedback overlay on a larger screen layout with background image and detailed question context.'
//       }
//     }
//   }
// };