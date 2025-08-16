import type { Meta, StoryObj } from '@storybook/react';
import MediaImage from './MediaImage';
import { MediaItem } from '@/types';

// Mock MediaItem data
const mockMediaItem: MediaItem =  {
    imgUrl: "https://hood.resourcespace.com/pages/download.php?ref=19303&size=obl&ext=jpg&page=1&alternative=-1&watermarked=&k=&noattach=true&v=1643145073&access_key=MTNjZDVhMWI0YTBiYjZjZjM3NmEyNTIwZWMxMTRkNDRmMjBjNTA3Yzc3MTJlZjgzMThhOTkzN2I4ODhhOGZiMTY0ZjkyZDllNWZlZWM2N2YxNTczZTFmYzM2NmE3OWM3NTQyOWE4OGE0YmZhZWExMTA3NDYzNDZlOThmMWNkYzlAQDNmYTgxY2ZiNDAwOTliZGFjYjhmYjdjZDgyYzA2Njg5Mzg1MjQ2NWY3OGEyOTI2NTE0MjA5ODQzYTRiZTE4M2QzZDhkNjIwYWQyNmNmYWVkZjBiZjhhN2Q2MTRiYzMwOWUyMDIwYmVkM2MzZDI1ZmFlOTc5NDgzMGU2ZDBiYjY2MjExZjVjMWVmNTJkZDVjMWUxZWY0NTI3MDc4MzI4ZmIzM2M0MTQ1Y2Q0ZDg5ZjMyMjBhNWZhMDc3NDliZGM3YzM0YWJkMGI4YzM4YzY1NTU5MGZlMmFhZmVmOGFlNzU0YzZmZGEzOWU4MDY5N2I5Y2U5NjUwZjU1NjZlMzc2YzhmOGQzYzNkNTgzYjBiZmJjNTc5ZDIxZTc0OGY1YzY4OGYyNGJlOGIyMmYyMTg2M2UxZWQ1NjVhYmJiOGM1NzE0M2QwNzViYTNkNDMzMWRlY2Q0MWQyMzZjMGQ0ZDU0MTJlYzlkYjUyYmZmYWIwOWY1ZThmZTNhN2ZiOWJhNWFhZTBmN2FmNzg0MWEyZmYxYWY2ZGMyYzZjNzIwNGM4YmQ4MzdkOTlhYzhjOTQ1MzQxY2JhQEAyM2ViMjdlYTkzZjExN2IzOWE5NDY4ZjM0YzdlMTcyNmI5MjMwN2ZmOWZlOGI0MzQ0NzJkNzg2NmMxMzE3NWQ4",
    sourceUrl: "https://hoodmuseum.dartmouth.edu/objects/ph.2003.56.65#",
    imgCaption:"Digging Anti-Tank Trenches Near Moscow - Dmitri Baltermants, Russian (born Warsaw, Poland), 1912 - 1990",
    altText : "A line of mostly women workers digging a long anti-tank trench with shovels and wearing jackets and headscarves in muddy ground."
}
const mockMediaItemNoAlt: MediaItem = {
   imgUrl: "https://hood.resourcespace.com/pages/download.php?ref=19303&size=obl&ext=jpg&page=1&alternative=-1&watermarked=&k=&noattach=true&v=1643145073&access_key=MTNjZDVhMWI0YTBiYjZjZjM3NmEyNTIwZWMxMTRkNDRmMjBjNTA3Yzc3MTJlZjgzMThhOTkzN2I4ODhhOGZiMTY0ZjkyZDllNWZlZWM2N2YxNTczZTFmYzM2NmE3OWM3NTQyOWE4OGE0YmZhZWExMTA3NDYzNDZlOThmMWNkYzlAQDNmYTgxY2ZiNDAwOTliZGFjYjhmYjdjZDgyYzA2Njg5Mzg1MjQ2NWY3OGEyOTI2NTE0MjA5ODQzYTRiZTE4M2QzZDhkNjIwYWQyNmNmYWVkZjBiZjhhN2Q2MTRiYzMwOWUyMDIwYmVkM2MzZDI1ZmFlOTc5NDgzMGU2ZDBiYjY2MjExZjVjMWVmNTJkZDVjMWUxZWY0NTI3MDc4MzI4ZmIzM2M0MTQ1Y2Q0ZDg5ZjMyMjBhNWZhMDc3NDliZGM3YzM0YWJkMGI4YzM4YzY1NTU5MGZlMmFhZmVmOGFlNzU0YzZmZGEzOWU4MDY5N2I5Y2U5NjUwZjU1NjZlMzc2YzhmOGQzYzNkNTgzYjBiZmJjNTc5ZDIxZTc0OGY1YzY4OGYyNGJlOGIyMmYyMTg2M2UxZWQ1NjVhYmJiOGM1NzE0M2QwNzViYTNkNDMzMWRlY2Q0MWQyMzZjMGQ0ZDU0MTJlYzlkYjUyYmZmYWIwOWY1ZThmZTNhN2ZiOWJhNWFhZTBmN2FmNzg0MWEyZmYxYWY2ZGMyYzZjNzIwNGM4YmQ4MzdkOTlhYzhjOTQ1MzQxY2JhQEAyM2ViMjdlYTkzZjExN2IzOWE5NDY4ZjM0YzdlMTcyNmI5MjMwN2ZmOWZlOGI0MzQ0NzJkNzg2NmMxMzE3NWQ4",
  altText: ''
};

const mockMediaItemBroken: MediaItem = {
  imgUrl: 'https://broken-url-that-will-fail.jpg',
  altText: 'This image will fail to load'
};

const meta: Meta<typeof MediaImage> = {
  title: 'UI Components/MediaImage',
  component: MediaImage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A responsive image component with accessibility features and error handling.'
      }
    }
  },
  argTypes: {
    media: {
      description: 'Media item containing image URL and alt text',
      control: 'object'
    },
    className: {
      description: 'CSS classes for styling the image',
      control: 'text'
    },
    id: {
      description: 'HTML id attribute for the image',
      control: 'text'
    },
    ariaDescribedby: {
      description: 'ID of element that describes this image',
      control: 'text'
    },
    role: {
      description: 'ARIA role for the image',
      control: 'text'
    },
    loading: {
      description: 'Loading behavior for the image',
      control: { type: 'select' },
      options: ['lazy', 'eager']
    },
    fetchPriority: {
      description: 'Fetch priority hint for the image',
      control: { type: 'select' },
      options: ['high', 'low', 'auto']
    }
  },
  args: {
    media: mockMediaItem,
    className: 'w-full h-auto rounded-lg shadow-md',
    loading: 'lazy',
    fetchPriority: 'auto'
  }
};

export default meta;
type Story = StoryObj<typeof MediaImage>;

// Default story
export const Default: Story = {};

// Small image variant
export const Small: Story = {
  args: {
    className: 'w-32 h-24 object-cover rounded-md'
  }
};

// Large image variant
export const Large: Story = {
  args: {
    className: 'w-96 h-64 object-cover rounded-xl shadow-lg'
  }
};

// Responsive image
export const Responsive: Story = {
  args: {
    className: 'max-w-full h-auto md:max-w-md lg:max-w-lg rounded-lg'
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1024px', height: '768px' } }
      }
    }
  }
};

// Image with no alt text (accessibility edge case)
export const NoAltText: Story = {
  args: {
    media: mockMediaItemNoAlt,
    className: 'w-64 h-48 object-cover rounded-lg'
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how the component handles missing alt text by providing a fallback message.'
      }
    }
  }
};

// High priority loading (above the fold)
export const HighPriority: Story = {
  args: {
    loading: 'eager',
    fetchPriority: 'high',
    className: 'w-full max-w-md h-auto rounded-lg'
  },
  parameters: {
    docs: {
      description: {
        story: 'Image configured for high priority loading, suitable for above-the-fold content.'
      }
    }
  }
};

// With accessibility attributes
export const WithAccessibility: Story = {
  args: {
    id: 'question-image-1',
    ariaDescribedby: 'image-description',
    role: 'img',
    className: 'w-64 h-48 object-cover rounded-lg border-2 border-blue-300'
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <p id="image-description" className="mt-2 text-sm text-gray-600">
          This image is part of a multiple choice question and shows relevant visual context.
        </p>
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Image with full accessibility attributes including describedby reference.'
      }
    }
  }
};

// Error state (broken image URL)
export const BrokenImage: Story = {
  args: {
    media: mockMediaItemBroken,
    className: 'w-64 h-48 object-cover rounded-lg border border-red-300'
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows error handling when an image fails to load. The alt text is updated to indicate the failure.'
      }
    }
  }
};

// Different aspect ratios
export const SquareAspect: Story = {
  args: {
    media: {
      imgUrl: 'https://picsum.photos/300/300?random=3',
      altText: 'Square format image for profile or thumbnail use'
    },
    className: 'w-48 h-48 object-cover rounded-full'
  }
};

export const WideAspect: Story = {
  args: {
    media: {
      imgUrl: 'https://picsum.photos/600/200?random=4',
      altText: 'Wide banner-style image'
    },
    className: 'w-full h-32 object-cover rounded-lg'
  }
};

// Multiple images in a grid (showing component reusability)
export const ImageGrid: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-4 max-w-md">
      <MediaImage 
        {...args} 
        media={{ 
            imgUrl: "https://dam.media.un.org/AssetLink/0twswgmw6b000msq6a86r2g0ae0gw66d",
            sourceUrl: "https://media.un.org/photo/en/asset/oun7/oun7196164",
            imgCaption: "[2015] A view of the National Museum of the History of the Great Patriotic War (of 1941-1945), on the day of Secretary-General Ban Ki-moon's visit to Kiev.",
            credit: "UN Photo/Andrey Krepkih",
            altText: "Museum of Great Patriotic War, Kiev, Ukrain"        
        }}
        className="w-full h-32 object-cover rounded-md"
      />
      <MediaImage 
        {...args} 
        media={{ imgUrl: 'https://picsum.photos/200/200?random=6', altText: 'Grid image 2' }}
        className="w-full h-32 object-cover rounded-md"
      />
      <MediaImage 
        {...args} 
        media={{imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/%D0%A4%D0%BE%D0%BD%D1%82%D0%B0%D0%BD_%C2%AB%D0%94%D0%B5%D1%82%D1%81%D0%BA%D0%B8%D0%B9_%D1%85%D0%BE%D1%80%D0%BE%D0%B2%D0%BE%D0%B4%C2%BB_%D0%B2_%D0%A1%D1%82%D0%B0%D0%BB%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4%D0%B5_%D0%BF%D0%BE%D1%81%D0%BB%D0%B5_%D0%BD%D0%B0%D0%BB%D0%B5%D1%82%D0%B0_%D0%BD%D0%B5%D0%BC%D0%B5%D1%86%D0%BA%D0%BE%D0%B9_%D0%B0%D0%B2%D0%B8%D0%B0%D1%86%D0%B8%D0%B8.jpg/2560px-%D0%A4%D0%BE%D0%BD%D1%82%D0%B0%D0%BD_%C2%AB%D0%94%D0%B5%D1%82%D1%81%D0%BA%D0%B8%D0%B9_%D1%85%D0%BE%D1%80%D0%BE%D0%B2%D0%BE%D0%B4%C2%BB_%D0%B2_%D0%A1%D1%82%D0%B0%D0%BB%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4%D0%B5_%D0%BF%D0%BE%D1%81%D0%BB%D0%B5_%D0%BD%D0%B0%D0%BB%D0%B5%D1%82%D0%B0_%D0%BD%D0%B5%D0%BC%D0%B5%D1%86%D0%BA%D0%BE%D0%B9_%D0%B0%D0%B2%D0%B8%D0%B0%D1%86%D0%B8%D0%B8.jpg",
        sourceUrl: "https://www.culture.ru/materials/258137/12-legendarnykh-voennykh-snimkov",
        imgCaption: "Stalingrad, Children fountain. 1942",
        photog:"Emmanuil Yevzerikhin. Russian, 1911-1984",
        altText: "A metal sculpture of six dnacing children around a crocodile that was bombed and burnt during the air raid in Stalingrad." }}
        className="w-full h-32 object-cover rounded-md"
      />
      <MediaImage 
        {...args} 
        media={{ imgUrl: 'https://picsum.photos/200/200?random=8', altText: 'Grid image 4' }}
        className="w-full h-32 object-cover rounded-md"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple MediaImage components arranged in a grid to show reusability.'
      }
    }
  }
};