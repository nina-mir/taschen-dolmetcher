import { QuestionType, LanguageType } from '@/types';
import data from '@/assets/data/improved_data_deepseek_en_array.json';
import multipleChoiceData from '@/assets/data/multiple_choice_data_claude.json'
import mediaData from '@/assets/data/imagesData_local.json';
import textData from '@/assets/data/infoData.json';

import Question from '@/components/Question';
import MultiChoiceQuestion from '@/components/question/MultiChoiceQuestion';

import knuthRandomizer from '@/utils/helpers'


interface QuestionsContainerProps {
  fromLanguage: LanguageType;
  toLanguage: LanguageType;
  qFormat: QuestionType;
}

const shuffledMediaData = knuthRandomizer(mediaData)
const shuffledTextData = knuthRandomizer(textData)

const QuestionsContainer = ({ fromLanguage, toLanguage, qFormat }: QuestionsContainerProps) => {
  if (qFormat === 'choosing') {
    const questions = data.map((item, idx) => (
      <MultiChoiceQuestion
        key={idx}
        id={idx}
        de={item.de}
        en={item.en}
        ru={item.ru}
        choices={multipleChoiceData[idx][toLanguage]}
        phonetic={item.phonetic}
        fromLanguage={fromLanguage}
        toLanguage={toLanguage}
        media={shuffledMediaData[idx]}
        info={shuffledTextData[idx]}
      />
    ));

    return (
      <div className='w-full flex flex-col items-center content-center gap-5'>
        {questions}
      </div>
    )
  }

  const questions = data.map((item, idx) => (
    <Question
      key={idx}
      id={idx}
      de={item.de}
      en={item.en}
      ru={item.ru}
      phonetic={item.phonetic}
      fromLanguage={fromLanguage}
      toLanguage={toLanguage}
      media={mediaData[idx]}
      info={textData[idx]}
    />
  ));

  return (
    <div className='w-full flex flex-col items-center content-center gap-5'>
      {questions}
    </div>
  )
};

export default QuestionsContainer;
