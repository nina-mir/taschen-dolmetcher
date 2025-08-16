import type { Meta, StoryObj } from '@storybook/react';
import ContentSection from './ContentSection';
import { MediaItem, InfoItem } from '@/types';
import { useState } from 'react';

// Mock data
const mockMediaItem: MediaItem = {
  imgUrl: 'https://picsum.photos/600/400?random=1',
  altText: 'Historical photograph showing soldiers during the Battle of Stalingrad',
  imgCaption: 'Soviet soldiers defending a building during the Battle of Stalingrad, winter 1942'
};

const mockInfoItem: InfoItem = {
  text: 'The Battle of Stalingrad (1942-1943) was a major turning point in World War II, marking the beginning of Germany\'s retreat on the Eastern Front. The urban warfare was particularly brutal, with fighting occurring house by house.',
  sourceChicago: 'Beevor, Antony. Stalingrad: The Fateful Siege: 1942-1943. New York: Viking, 1998.'
};

const mockLongMediaItem: MediaItem = {
  imgUrl: 'https://picsum.photos/800/600?random=2',
  altText: 'Detailed historical map showing troop movements and strategic positions',
  imgCaption: 'Strategic map depicting the encirclement of German forces during Operation Uranus, showing Soviet troop movements from November 19-23, 1942, with detailed annotations of key military positions and supply lines'
};

const mockLongInfoItem: InfoItem = {
  text: 'Operation Uranus was the code name for the Soviet strategic operation that led to the encirclement of German forces at Stalingrad. Launched on November 19, 1942, it involved coordinated attacks by multiple Soviet army groups. The operation successfully cut off the German Sixth Army and parts of the Fourth Panzer Army, trapping over 250,000 Axis soldiers in the Stalingrad pocket. This encirclement marked the beginning of the end for German forces on the Eastern Front.',
  sourceChicago: 'Glantz, David M., and Jonathan M. House. When Titans Clashed: How the Red Army Stopped Hitler. Lawrence: University Press of Kansas, 1995, pp. 142-178.'
};

const mockPortraitMediaItem: MediaItem = {
  imgUrl: 'https://picsum.photos/400/600?random=3',
  altText: 'Portrait photograph of a World War II military leader',
  imgCaption: 'General Vasily Chuikov, commander of the 62nd Army during the Battle of Stalingrad'
};

const mockScienceMediaItem: MediaItem = {
  imgUrl: 'https://picsum.photos/500/300?random=4',
  altText: 'Scientific diagram showing DNA structure',
  imgCaption: 'Double helix structure of DNA showing base pairs and sugar-phosphate backbone'
};

const mockScienceInfoItem: InfoItem = {
  text: 'DNA (deoxyribonucleic acid) is the hereditary material in humans and almost all other organisms. It contains the genetic instructions needed to develop and maintain life.',
  sourceChicago: 'Watson, J. D., & Crick, F. H. (1953). Molecular structure of nucleic acids. Nature, 171(4356), 737-738.'
};

// Interactive wrapper to handle state
const InteractiveWrapper = (args: any) => {
  const [showInfo, setShowInfo] = useState(args.showInfo || 'block');
  
  return (
    <div className="h-screen bg-gray-900 relative">
      <ContentSection 
        {...args} 
        showInfo={showInfo}
        onToggleInfo={setShowInfo}
      />
      {showInfo === 'hidden' && (
        <div className="absolute top-4 left-4 text-white bg-black/50 p-2 rounded">
          Content is hidden - this simulates the parent component's toggle functionality
        </div>
      )}
    </div>
  );
};

const meta: Meta<typeof ContentSection> = {
  title: 'UI Components/ContentSection',
  component: ContentSection,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1f2937' },
        { name: 'light', value: '#f9fafb' }
      ]
    },
    docs: {
      description: {
        component: 'A complex orchestrator component that manages media display, information panels, and responsive layouts. Combines MediaImage, InfoText, and CollapsibleInfo components with responsive behavior and toggle functionality.'
      }
    }
  },
  argTypes: {
    media: {
      description: 'Media item containing image URL, alt text, and caption',
      control: 'object'
    },
    info: {
      description: 'Information item with text content and source citation',
      control: 'object'
    },
    showInfo: {
      description: 'Visibility state for the content section',
      control: { type: 'select' },
      options: ['block', 'hidden']
    },
    onToggleInfo: {
      description: 'Callback function to handle visibility toggle',
      action: 'toggled'
    }
  },
  args: {
    media: mockMediaItem,
    info: mockInfoItem,
    showInfo: 'block'
  }
};

export default meta;
type Story = StoryObj<typeof ContentSection>;

// Default story with interactive state
export const Default: Story = {
  render: InteractiveWrapper,
  parameters: {
    docs: {
      description: {
        story: 'Default ContentSection with standard historical content. Features responsive layout that changes between mobile and desktop views.'
      }
    }
  }
};

// Long content to test layout
export const LongContent: Story = {
  render: InteractiveWrapper,
  args: {
    media: mockLongMediaItem,
    info: mockLongInfoItem
  },
  parameters: {
    docs: {
      description: {
        story: 'ContentSection with longer captions and information text to test text wrapping and layout behavior.'
      }
    }
  }
};

// Portrait orientation image
export const PortraitImage: Story = {
  render: InteractiveWrapper,
  args: {
    media: mockPortraitMediaItem,
    info: mockInfoItem
  },
  parameters: {
    docs: {
      description: {
        story: 'ContentSection with a portrait-oriented image to test responsive image handling.'
      }
    }
  }
};

// Different subject matter (science)
export const ScienceContent: Story = {
  render: InteractiveWrapper,
  args: {
    media: mockScienceMediaItem,
    info: mockScienceInfoItem
  },
  parameters: {
    docs: {
      description: {
        story: 'ContentSection with scientific content to show versatility across different subject matters.'
      }
    }
  }
};

// Mobile viewport focused
export const MobileView: Story = {
  render: InteractiveWrapper,
  args: {
    media: mockMediaItem,
    info: mockInfoItem
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'ContentSection optimized for mobile viewing. Shows collapsible caption behavior and mobile-specific layout.'
      }
    }
  }
};

// Desktop viewport focused
export const DesktopView: Story = {
  render: InteractiveWrapper,
  args: {
    media: mockMediaItem,
    info: mockInfoItem
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    },
    docs: {
      description: {
        story: 'ContentSection in desktop layout showing side-by-side image and information panel.'
      }
    }
  }
};

// Initially hidden state
export const InitiallyHidden: Story = {
  render: InteractiveWrapper,
  args: {
    media: mockMediaItem,
    info: mockInfoItem,
    showInfo: 'hidden'
  },
  parameters: {
    docs: {
      description: {
        story: 'ContentSection starting in hidden state to test the toggle functionality.'
      }
    }
  }
};

// Test responsiveness across viewports
export const ResponsiveTest: Story = {
  render: InteractiveWrapper,
  args: {
    media: mockLongMediaItem,
    info: mockLongInfoItem
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1200px', height: '800px' } },
        ultrawide: { name: 'Ultrawide', styles: { width: '1920px', height: '1080px' } }
      }
    },
    docs: {
      description: {
        story: 'ContentSection tested across multiple viewport sizes to verify responsive behavior.'
      }
    }
  }
};

// Accessibility focused
export const AccessibilityTest: Story = {
  render: (args) => {
    const [showInfo, setShowInfo] = useState('block');
    
    return (
      <div className="h-screen bg-gray-900 relative">
        <div className="absolute top-4 left-4 z-10 bg-blue-900/80 text-white p-3 rounded text-sm max-w-md">
          <h4 className="font-semibold mb-2">Accessibility Features:</h4>
          <ul className="text-xs space-y-1">
            <li>• Screen reader labels and descriptions</li>
            <li>• Proper ARIA roles and states</li>
            <li>• Keyboard navigation support</li>
            <li>• Focus management</li>
            <li>• Semantic HTML structure</li>
          </ul>
        </div>
        <ContentSection 
          {...args} 
          showInfo={showInfo}
          onToggleInfo={setShowInfo}
        />
      </div>
    );
  },
  args: {
    media: mockMediaItem,
    info: mockInfoItem
  },
  parameters: {
    docs: {
      description: {
        story: 'ContentSection with focus on accessibility features including ARIA labels, roles, and keyboard navigation.'
      }
    }
  }
};

// Performance test with multiple rapid toggles
export const InteractionTest: Story = {
  render: (args) => {
    const [showInfo, setShowInfo] = useState('block');
    const [toggleCount, setToggleCount] = useState(0);
    
    const handleToggle = (state: string) => {
      setShowInfo(state);
      setToggleCount(prev => prev + 1);
    };
    
    return (
      <div className="h-screen bg-gray-900 relative">
        <div className="absolute top-4 right-4 z-10 bg-green-900/80 text-white p-3 rounded text-sm">
          <div>Toggle count: {toggleCount}</div>
          <button 
            onClick={() => handleToggle(showInfo === 'hidden' ? 'block' : 'hidden')}
            className="mt-2 px-3 py-1 bg-green-600 rounded text-xs hover:bg-green-500"
          >
            Manual Toggle
          </button>
        </div>
        <ContentSection 
          {...args} 
          showInfo={showInfo}
          onToggleInfo={handleToggle}
        />
      </div>
    );
  },
  args: {
    media: mockMediaItem,
    info: mockInfoItem
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive test for ContentSection toggle functionality with manual controls and usage tracking.'
      }
    }
  }
};

// Error state simulation (missing image)
export const ErrorState: Story = {
  render: InteractiveWrapper,
  args: {
    media: {
      imgUrl: 'https://broken-image-url-that-will-fail.jpg',
      altText: 'Image that will fail to load',
      imgCaption: 'This image demonstrates error handling when the image URL is invalid'
    },
    info: mockInfoItem
  },
  parameters: {
    docs: {
      description: {
        story: 'ContentSection with a broken image URL to test error handling and fallback behavior.'
      }
    }
  }
};

// Minimal content
export const MinimalContent: Story = {
  render: InteractiveWrapper,
  args: {
    media: {
      imgUrl: 'https://picsum.photos/300/200?random=5',
      altText: 'Simple image',
      imgCaption: 'Brief caption'
    },
    info: {
      text: 'Short information text.',
      sourceChicago: 'Brief Source (2024).'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'ContentSection with minimal content to test layout with short text and captions.'
      }
    }
  }
};