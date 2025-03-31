import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const LanguageSelector: React.FC = () => {
    return (
        <div className="bg-[url('topography.svg')] bg-contain bg-repeat w-full flex justify-center items-center">
            <div className='flex flex-col md:flex-row mt-5 mb-5 justify-between md:gap-30 gap-4'>
                <div className='flex flex-col sm:flex-row items-center gap-4'>
                    <Label htmlFor="inputLanguage" className='font-gyst text-2xl whitespace-nowrap'>From</Label>
                    <div className='max-w-[200px]'>
                        <Select defaultValue="de">
                            <SelectTrigger
                                id="inputLanguage"
                                className="min-w-[10rem] text-1xl"
                            >
                                <SelectValue placeholder="choose a language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ru">
                                    <img
                                        src='russia.svg'
                                        alt="Soviet flag"
                                        className='w-8 grayscale'
                                    />
                                    русский
                                </SelectItem>
                                <SelectItem value="de" className="flex items-center gap-2">
                                    <img
                                        src='/german_flag.svg'
                                        alt="German flag"
                                        className='w-8 grayscale'          
                                    />
                                    Deutsch
                                </SelectItem>
                                <SelectItem value="en">
                                    <img
                                        src='/english.svg'
                                        alt="American flag"
                                        className='w-8 grayscale'
                                    />English
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row items-center gap-4 w-full'>
                    <Label htmlFor="outLanguage" className='font-gyst text-2xl whitespace-nowrap'>To</Label>
                    <div className='w-full max-w-[200px]'>
                        <Select defaultValue="en">
                            <SelectTrigger
                                id="outLanguage"
                                className="min-w-[10rem] text-1.5xl bg-stone-500/20"
                            >
                                <SelectValue placeholder="choose a language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ru">
                                    <img
                                        src='russia.svg'
                                        alt="Soviet flag"
                                        className='w-8 grayscale'
                                    />
                                    русский
                                </SelectItem>
                                <SelectItem value="de" className="flex items-center gap-2">
                                    <img
                                        src='/german_flag.svg'
                                        alt="German flag"
                                        className='w-8 grayscale'
                                    />
                                    Deutsch
                                </SelectItem>
                                <SelectItem value="en">
                                    <img
                                        src='/english.svg'
                                        alt="American flag"
                                        className='w-8 grayscale'
                                    />
                                    English
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LanguageSelector;
