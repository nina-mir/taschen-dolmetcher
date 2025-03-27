import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { CircleIcon, BorderNoneIcon } from "@radix-ui/react-icons"



const LanguageSelctor: React.FC = () => {
    return (
        <div className='flex gap-1 mt-5 ml-[10rem] justify-start self-start '>
            <div className=' w-5 h-5 self-center bg-gradient-to-r rounded-full bg-[linear-gradient(#000_33.333%,#FF0000_33.33%_66.666%,#FFCC00_66.666%)]'></div>
            <Label htmlFor="inputLanguage">from </Label>
            <Select>
                <SelectTrigger id="inputLanguage" className="w-[180px]">
                    <SelectValue placeholder="Deutsch" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ru">русский</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default LanguageSelctor;