import type { Meta, StoryObj } from '@storybook/react';
import MultiChoiceQuestion from './MultiChoiceQuestion';
import { MediaItem, InfoItem, LanguageType } from '@/types';

// Mock data for different question types
const mockHistoryMediaItem: MediaItem = {
  imgUrl: 'https://picsum.photos/600/400?random=1',
  altText: 'Historical photograph from World War II showing soldiers in combat',
  imgCaption: 'Soviet soldiers defending Stalingrad during the winter of 1942-1943'
};

const mockHistoryInfoItem: InfoItem = {
  text: 'The Battle of Stalingrad was one of the bloodiest battles in human history and marked a turning point in World War II. The urban warfare lasted for months with devastating casualties on both sides.',
  sourceChicago: 'Beevor, Antony. Stalingrad: The Fateful Siege: 1942-1943. New York: Viking, 1998.'
};

const mockScienceMediaItem: MediaItem = {
  imgUrl: 'https://picsum.photos/500/400?random=2',
  altText: 'Scientific diagram showing molecular structure',
  imgCaption: 'Molecular structure of water (H2O) showing hydrogen bonds'
};

const mockScienceInfoItem: InfoItem = {
  text: 'Water is a polar molecule consisting of two hydrogen atoms covalently bonded to one oxygen atom. The bent molecular geometry creates a dipole moment.',
  sourceChicago: 'Pauling, L. (1960). The Nature of the Chemical Bond. Cornell University Press.'
};

const mockLanguageMediaItem: MediaItem = {
  imgUrl: 'https://picsum.photos/600/350?random=3',
  altText: 'Traditional German architecture showing half-timbered buildings',
  imgCaption: 'Traditional German Fachwerk (half-timbered) architecture in a medieval town'
};

const mockLanguageInfoItem: InfoItem = {
  text: 'German architecture has evolved over centuries, with half-timbered construction being particularly characteristic of medieval and early modern periods.',
  sourceChicago: 'Binding, Günther. German Gothic Church Architecture. Yale University Press, 2000.'
};

// Interactive wrapper for full functionality testing
const InteractiveWrapper = (args: any) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-4 flex items-center justify-center">
      <MultiChoiceQuestion {...args} />
    </div>
  );
};

const meta: Meta<typeof MultiChoiceQuestion> = {
  title: 'UI Components/MultiChoiceQuestion',
  component: MultiChoiceQuestion,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f3f4f6' },
        { name: 'dark', value: '#1f2937' },
        { name: 'gradient', value: 'linear-gradient(to bottom, #f3f4f6, #d1d5db)' }
      ]
    },
    docs: {
      description: {
        component: 'The main orchestrator component that combines all UI elements into a complete multiple choice question interface. Handles language switching, answer validation, feedback display, and responsive layouts. Integrates QuestionHeader, ContentSection, AnswerChoices, SubmitSection, and FeedbackOverlay components.'
      }
    }
  },
  argTypes: {
    id: {
      description: 'Unique identifier for the question',
      control: 'number'
    },
    de: {
      description: 'German text for the question/answer',
      control: 'text'
    },
    en: {
      description: 'English translations (array for multiple variations)',
      control: 'object'
    },
    phonetic: {
      description: 'Phonetic pronunciation guide',
      control: 'text'
    },
    ru: {
      description: 'Russian text for the question/answer',
      control: 'text'
    },
    choices: {
      description: 'Array of answer choices for the multiple choice question',
      control: 'object'
    },
    fromLanguage: {
      description: 'Source language for the question',
      control: { type: 'select' },
      options: ['de', 'en', 'ru']
    },
    toLanguage: {
      description: 'Target language for the answer',
      control: { type: 'select' },
      options: ['de', 'en', 'ru']
    },
    media: {
      description: 'Media item with image and caption information',
      control: 'object'
    },
    info: {
      description: 'Additional context information with source citation',
      control: 'object'
    }
  },
  args: {
    id: 1,
    de: 'Das Haus',
    en: ['The house', 'House'],
    phonetic: 'das hows',
    ru: 'дом',
    choices: ['The house', 'The car', 'The tree', 'The building'],
    fromLanguage: 'de' as LanguageType,
    toLanguage: 'en' as LanguageType,
    media: mockLanguageMediaItem,
    info: mockLanguageInfoItem
  }
};

export default meta;
type Story = StoryObj<typeof MultiChoiceQuestion>;

// Default German to English question
export const Default: Story = {
  render: InteractiveWrapper,
  parameters: {
    docs: {
      description: {
        story: 'Standard German to English translation question. Shows the complete workflow from question display through answer selection and feedback.'
      }
    }
  }
};

// English to German translation
export const EnglishToGerman: Story = {
  render: InteractiveWrapper,
  args: {
    id: 2,
    de: 'Der Baum',
    en: ['The tree', 'Tree'],
    phonetic: 'der bowm',
    ru: 'дерево',
    choices: ['Der Baum', 'Das Auto', 'Die Katze', 'Der Hund'],
    fromLanguage: 'en' as LanguageType,
    toLanguage: 'de' as LanguageType
  },
  parameters: {
    docs: {
      description: {
        story: 'Reverse translation from English to German, testing the language switching functionality.'
      }
    }
  }
};

// Russian to English translation
export const RussianToEnglish: Story = {
  render: InteractiveWrapper,
  args: {
    id: 3,
    de: 'Das Wasser',
    en: ['Water', 'The water'],
    phonetic: 'das vas-ser',
    ru: 'вода',
    choices: ['Water', 'Fire', 'Earth', 'Air'],
    fromLanguage: 'ru' as LanguageType,
    toLanguage: 'en' as LanguageType,
    media: mockScienceMediaItem,
    info: mockScienceInfoItem
  },
  parameters: {
    docs: {
      description: {
        story: 'Russian to English translation with scientific content and imagery.'
      }
    }
  }
};

// Complex historical question
export const HistoricalQuestion: Story = {
  render: InteractiveWrapper,
  args: {
    id: 4,
    de: 'Der Krieg',
    en: ['The war', 'War'],
    phonetic: 'der kreek',
    ru: 'война',
    choices: ['The war', 'The peace', 'The battle', 'The victory'],
    fromLanguage: 'de' as LanguageType,
    toLanguage: 'en' as LanguageType,
    media: mockHistoryMediaItem,
    info: mockHistoryInfoItem
  },
  parameters: {
    docs: {
      description: {
        story: 'Historical context question with war-related vocabulary and detailed background information.'
      }
    }
  }
};

// Difficult question with multiple correct answers
export const MultipleCorrectAnswers: Story = {
  render: InteractiveWrapper,
  args: {
    id: 5,
    de: 'Die Familie',
    en: ['The family', 'Family'],
    phonetic: 'dee fah-mee-lee-eh',
    ru: 'семья',
    choices: ['The family', 'Family', 'The relatives', 'The household'],
    fromLanguage: 'de' as LanguageType,
    toLanguage: 'en' as LanguageType
  },
  parameters: {
    docs: {
      description: {
        story: 'Question with multiple acceptable answers to test the answer validation logic.'
      }
    }
  }
};

// Long vocabulary words
export const LongVocabulary: Story = {
  render: InteractiveWrapper,
  args: {
    id: 6,
    de: 'Die Geschwindigkeit',
    en: ['The speed', 'Speed', 'Velocity'],
    phonetic: 'dee geh-shvin-dish-kite',
    ru: 'скорость',
    choices: ['The speed', 'The distance', 'The time', 'The acceleration'],
    fromLanguage: 'de' as LanguageType,
    toLanguage: 'en' as LanguageType,
    media: mockScienceMediaItem,
    info: mockScienceInfoItem
  },
  parameters: {
    docs: {
      description: {
        story: 'Question with longer vocabulary words to test text wrapping and layout behavior.'
      }
    }
  }
};

// Mobile optimized view
export const MobileView: Story = {
  render: InteractiveWrapper,
  args: {
    id: 7,
    de: 'Die Stadt',
    en: ['The city', 'City'],
    phonetic: 'dee shtat',
    ru: 'город',
    choices: ['The city', 'The village', 'The town', 'The country']
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Question optimized for mobile viewing with responsive layout adjustments.'
      }
    }
  }
};

// Question with no phonetic guide
export const NoPhonetic: Story = {
  render: InteractiveWrapper,
  args: {
    id: 8,
    de: 'Ja',
    en: ['Yes'],
    ru: 'да',
    choices: ['Yes', 'No', 'Maybe', 'Sometimes'],
    fromLanguage: 'de' as LanguageType,
    toLanguage: 'en' as LanguageType
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple question without phonetic pronunciation guide to test optional prop handling.'
      }
    }
  }
};

// All language combinations showcase
export const LanguageCombinations: Story = {
  render: (args) => (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-4 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Language Combination Examples</h2>
        <p className="text-gray-600 mt-2">Different language pairs showing versatility</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {/* German to English */}
        <MultiChoiceQuestion 
          id={10}
          de="Das Buch"
          en={['The book', 'Book']}
          phonetic="das bookh"
          ru="книга"
          choices={['The book', 'The paper', 'The pen', 'The table']}
          fromLanguage="de"
          toLanguage="en"
          media={mockLanguageMediaItem}
          info={mockLanguageInfoItem}
        />
        
        {/* English to Russian */}
        <MultiChoiceQuestion 
          id={11}
          de="Die Sonne"
          en={['The sun', 'Sun']}
          phonetic="dee zon-neh"
          ru="солнце"
          choices={['солнце', 'луна', 'звезда', 'небо']}
          fromLanguage="en"
          toLanguage="ru"
          media={mockScienceMediaItem}
          info={mockScienceInfoItem}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Multiple questions showing different language pair combinations in a grid layout.'
      }
    }
  }
};

// Accessibility focused test
export const AccessibilityTest: Story = {
  render: (args) => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 flex items-center justify-center">
      <div className="max-w-4xl mx-auto">
        <div className="bg-blue-900/10 p-4 rounded-lg mb-6 text-center">
          <h3 className="font-semibold text-blue-900 mb-2">Accessibility Features Test</h3>
          <p className="text-blue-800 text-sm">
            Use keyboard navigation (Tab, Enter, Arrow keys) and screen reader to test accessibility features
          </p>
        </div>
        <MultiChoiceQuestion {...args} />
      </div>
    </div>
  ),
  args: {
    id: 9,
    de: 'Die Musik',
    en: ['The music', 'Music'],
    phonetic: 'dee moo-zeek',
    ru: 'музыка',
    choices: ['The music', 'The sound', 'The song', 'The noise'],
    fromLanguage: 'de' as LanguageType,
    toLanguage: 'en' as LanguageType
  },
  parameters: {
    docs: {
      description: {
        story: 'Accessibility-focused test with keyboard navigation, ARIA labels, and screen reader support.'
      }
    }
  }
};

// Error simulation (for testing robustness)
export const StressTest: Story = {
  render: InteractiveWrapper,
  args: {
    id: 999,
    de: 'Donaudampfschifffahrtsgesellschaftskapitän',
    en: ['Danube steamship company captain', 'Captain of the Danube steamship company'],
    phonetic: 'doh-now-dampf-shif-fahrts-geh-zel-shafts-kah-pee-tahn',
    ru: 'капитан дунайского пароходного общества',
    choices: [
      'Danube steamship company captain',
      'River boat operator',
      'Maritime transportation manager', 
      'Naval officer'
    ],
    fromLanguage: 'de' as LanguageType,
    toLanguage: 'en' as LanguageType,
    media: mockHistoryMediaItem,
    info: {
      text: 'This extremely long German compound word demonstrates the language\'s ability to create complex terms by combining multiple concepts. Such words test the interface\'s ability to handle very long text strings in various components.',
      sourceChicago: 'Linguistic Society of Germany. Complex Compound Words in German. Academic Press, 2020.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Stress test with extremely long German compound words to test layout robustness and text handling.'
      }
    }
  }
};