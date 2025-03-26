import { DotFilledIcon, ShadowIcon, BorderSolidIcon } from "@radix-ui/react-icons"
import { NavigationMenuDemo } from './Navbar'


const Header: React.FC = () => {
    return (
        <header className="
        flex 
        flex-col 
        justify-center 
        items-center 
        min-h-[5rem] 
        outline
        "
        >
            <div className="bg-gray-500 flex justify-center self-stretch">
            <NavigationMenuDemo/>
            </div>
            <h1 className="
            text-4xl 
            font-gyst 
            font-bold
            border
            mt-6
            mb-3
            "
            >
                Taschen
                <BorderSolidIcon className="inline w-6 h-6 text-red-600 " />
                Dolmetscher
                <DotFilledIcon className="inline w-6 h-6 text-red-600" />
                <span className="
                font-light 
                italic 
                tracking-widest 
                text-5xl
                "
                >
                    Revisited
                </span>
            </h1>
            <ShadowIcon className="bg-soviet-gold rounded-full" />
            <div className="flex flex-row justify-center items-center">
                <img 
                src='/taschen-cover-2.svg' 
                className='w-40 fixed -bottom-4 rotate-10 -right-20' />
                 <img 
                src='/taschen-cover-2.svg' 
                className='w-40 fixed -bottom-10 -rotate-5 -left-20' />
                <img src='/taschen-cover-1.svg' className='w-50 fixed -right-25' />
                <img src='/taschen-cover-1.svg' className='w-50 fixed -left-25 -top-2' />


                <h2 className="font-garamond-pp text-xl max-w-1/2 text-center text-wrap">
                    A linguistic and historical journey through WW2 German-Russian phrases
                    as a language learning game
                </h2>
            </div>

        </header>
    );
};

export default Header;
