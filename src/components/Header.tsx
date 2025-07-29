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
        max-w-full
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
                    className='
                    w-25 
                    md:w-20
                     fixed 
                     -bottom-4 
                     rotate-10 
                     md:-right-4 
                     -right-13
                    fill-red-600
                    ' />
                <img
                    src='/taschen-cover-2.svg'
                    className='w-25 md:w-30 fixed -bottom-5 md:-bottom-8 
                    -rotate-5 md:-left-14 -left-11' />
                <img src='/taschen-cover-1.svg' 
                className='w-35  md:w-30 fixed top-90 md:top-10 md:-left-13 -left-20' />
                <img src='/taschen-cover-1.svg' 
                className='
                w-40 
                md:w-50 fixed 
                -right-20
                md:-right-25 
                top-60
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
