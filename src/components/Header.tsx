import { DotFilledIcon, ShadowIcon, BorderSolidIcon } from "@radix-ui/react-icons"


const Header: React.FC = () => {
    return (
        <header className="
        flex 
        flex-col 
        justify-center 
        items-center 
        min-h-[5rem]
        w-full
        px-4
        overflow-x-hidden 
        mt-12
        "
        >
          
            <h1 className="
            flex 
            flex-col
            items-center
            md:flex-row
            text-3xl
            md:text-4xl 
            font-gyst 
            font-bold
            mt-1
            mb-1
            "
            >
                <span>
                    Taschen
                    <BorderSolidIcon className="inline w-6 h-6 text-red-600 " />
                    Dolmetscher
                </span>
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
            {/* <div className="flex flex-row justify-center items-center"> */}
                <img
                    src='/taschen-cover-2.svg'
                    className='w-40 fixed -bottom-4 rotate-10 -right-20' />
                <img
                    src='/taschen-cover-2.svg'
                    className='w-40 fixed -bottom-10 -rotate-5 -left-20' />
                <img src='/taschen-cover-1.svg' 
                className='w-50 fixed top-90 md:top-10 -left-25' />
                <img src='/taschen-cover-1.svg' 
                className='
                w-50 fixed -right-25 top-60
                md:-top-2
                ' 
                />


                <h2 className="font-garamond-pp text-xl max-w-md text-center text-wrap mb-2 ">
                    A linguistic and historical journey through WW2 German-Russian phrases
                    as a language learning game
                </h2>
            {/* </div> */}

        </header>
    );
};

export default Header;
