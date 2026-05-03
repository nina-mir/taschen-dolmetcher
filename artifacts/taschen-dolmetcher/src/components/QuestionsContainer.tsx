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
  onAnswer: (isCorrect: boolean) => void;
}

// Shuffle question indices once per session so data + multipleChoiceData stay in sync
const questionIndices: number[] = knuthRandomizer(data.map((_, i) => i))

// Media and info are independent — shuffle them separately
const shuffledMediaData = knuthRandomizer([...mediaData])
const shuffledTextData = knuthRandomizer([...textData])

const QuestionsContainer = ({ fromLanguage, toLanguage, qFormat, onAnswer }: QuestionsContainerProps) => {
  if (qFormat === 'choosing') {
    const questions = questionIndices.map((dataIdx, displayIdx) => (
      <MultiChoiceQuestion
        key={dataIdx}
        id={displayIdx + 1}
        de={data[dataIdx].de}
        en={data[dataIdx].en}
        ru={data[dataIdx].ru}
        choices={multipleChoiceData[dataIdx][toLanguage]}
        phonetic={data[dataIdx].phonetic}
        fromLanguage={fromLanguage}
        toLanguage={toLanguage}
        media={shuffledMediaData[displayIdx]}
        info={shuffledTextData[displayIdx]}
        onAnswer={onAnswer}
      />
    ));

    return (
      <div className='w-full flex flex-col items-center content-center gap-5'>
        {questions}
      </div>
    )
  }

  const questions = questionIndices.map((dataIdx, displayIdx) => (
    <Question
      key={dataIdx}
      id={displayIdx + 1}
      de={data[dataIdx].de}
      en={data[dataIdx].en}
      ru={data[dataIdx].ru}
      phonetic={data[dataIdx].phonetic}
      fromLanguage={fromLanguage}
      toLanguage={toLanguage}
      media={shuffledMediaData[displayIdx]}
      info={shuffledTextData[displayIdx]}
      onAnswer={onAnswer}
    />
  ));

  return (
    <div className='w-full flex flex-col items-center content-center gap-5'>
      {questions}
    </div>
  )
};

export default QuestionsContainer;
