// QuestionsContainer.tsx

// import { MediaItem, InfoItem } from '@/types';

import data from '@/assets/data/improved_data_deepseek_en_array.json';
import mediaData from '@/assets/data/imagesData.json';
import textData from '@/assets/data/infoData.json';

import Question from '@/components/Question';

interface QuestionsContainerProps {
  fromLanguage: string;
  toLanguage: string;
}

const QuestionsContainer = ({ fromLanguage, toLanguage }: QuestionsContainerProps) => {
  // ToDO add pagination state here
  // const [currentPage, setCurrentPage] = useState(1);
  // const questionsPerPage = 10;

  const questions = data.map((item, idx) => {

      return <Question
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
  });

  return <div className='w-full flex flex-col items-center content-center gap-5'>
    {questions}
  </div>
};

export default QuestionsContainer;