import { LanguageType } from '@/types';

export function figureQA(
  fromLanguage: LanguageType,
  toLanguage: LanguageType,
  de: string,
  en: string[],
  ru: string
): [string, string | string[]] {
  let question = ''
  let answer: string | string[] = ''

  if (fromLanguage === 'de') {
    question = de
  } else if (fromLanguage === 'en') {
    question = en[0]
  } else {
    question = ru
  }

  if (toLanguage === 'de') {
    answer = de
  } else if (toLanguage === 'en') {
    answer = en
  } else {
    answer = ru
  }

  return [question, answer]
}
