import { useState, useEffect } from 'react';
import { LanguageType } from '@/types'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import germanFlag from '@/assets/german_flag.svg'
import usFlag from '@/assets/english.svg'
import russianFlag from '@/assets/russia.svg'
import topographySvg from '@/assets/topography.svg'

interface LanguageSelectorProps {
    initialFrom?: LanguageType;
    initialTo?: LanguageType;
    onLanguageChange: (fromLanguage: LanguageType, toLanguage: LanguageType) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
    initialFrom = 'de',
    initialTo = 'en',
    onLanguageChange

}) => {

    const [fromLanguage, setFromLanguage] = useState<LanguageType>(initialFrom);
    const [toLanguage, setToLanguage] = useState<LanguageType>(initialTo);

    useEffect(() => {
        onLanguageChange(fromLanguage, toLanguage);
    }, [fromLanguage, toLanguage, onLanguageChange])

    // Handle from language change
    const handleFromLanguageChange = (value: LanguageType) => {
        setFromLanguage(value);
    };

    // Handle to language change
    const handleToLanguageChange = (value: LanguageType) => {
        setToLanguage(value);
    };

    const handleSwap = () => {
        setFromLanguage(toLanguage)
        setToLanguage(fromLanguage)
    }

    return (
        <div
            style={{
                backgroundImage: `url(${topographySvg})`
            }}
            className="bg-contain bg-repeat w-full"
        >
            <div className='w-[90%] flex justify-center mt-5 mb-5 gap-[1.5rem]  md:gap-10 m-auto'>
                {/* <div className='flex flex-row items-center gap-4'> */}
                <div>
                    <Label htmlFor="inputLanguage" className='invisible'></Label>
                    <div className=' md:max-w-[200px]'>
                        <Select value={fromLanguage} onValueChange={handleFromLanguageChange}>
                            <SelectTrigger
                                id="inputLanguage"
                                className="max-w-[5rem] md:min-w-[10rem] text-1xl"
                            >
                                <SelectValue placeholder="choose a language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ru">
                                    <img
                                        src={russianFlag}
                                        alt="Soviet flag"
                                        className='w-8 grayscale'
                                    />
                                    русский
                                </SelectItem>
                                <SelectItem value="de" className="flex items-center gap-2">
                                    <img
                                        src={germanFlag}
                                        alt="German flag"
                                        className='w-8 grayscale'
                                    />
                                    Deutsch
                                </SelectItem>
                                <SelectItem value="en">
                                    <img
                                        src={usFlag}
                                        alt="American flag"
                                        className='w-8 grayscale'
                                    />English
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                </div>

                {/* </div> */}
                <span className='
                    hover:cursor-pointer
                    w-10 
                    '
                    onClick={handleSwap} >
                    <svg
                        className='
                    stroke-stone-300
                    fill-red-500
                    '
                        focusable="false"
                        fill="pink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path>
                    </svg>


                </span>

                <div>

                    <Label htmlFor="outLanguage" className='invisible'></Label>
                    <div className='md:max-w-[200px]'>
                        <Select value={toLanguage} onValueChange={handleToLanguageChange}>
                            <SelectTrigger
                                id="outLanguage"
                                className="max-w-[5rem] md:min-w-[10rem] text-1xl  bg-stone-500/20"

                            >
                                <SelectValue placeholder="choose a language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ru">
                                    <img
                                        src={russianFlag}
                                        alt="Soviet flag"
                                        className='w-8 grayscale'
                                    />
                                    русский
                                </SelectItem>
                                <SelectItem value="de" className="flex items-center gap-2">
                                    <img
                                        src={germanFlag}
                                        alt="German flag"
                                        className='w-8 grayscale'
                                    />
                                    Deutsch
                                </SelectItem>
                                <SelectItem value="en">
                                    <img
                                        src={usFlag}
                                        alt="American flag"
                                        className='w-8 grayscale'
                                    />
                                    English
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                </div>

                {/* </div> */}
            </div>
        </div>
    )
}

export default LanguageSelector;
