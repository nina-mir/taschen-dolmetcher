// QuestionsContainer.tsx
// import { useState } from 'react';
import data from '@/data/data.json';
import Question from '@/components/Question';

interface QuestionsContainerProps {
  fromLanguage: string;
  toLanguage: string;
}

const QuestionsContainer = ({ fromLanguage, toLanguage }: QuestionsContainerProps) => {
  // ToDO add pagination state here
  // const [currentPage, setCurrentPage] = useState(1);
  // const questionsPerPage = 10;
  
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
    />
  ));

  return <>{questions}</>
};

export default QuestionsContainer;