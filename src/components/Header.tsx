import { DotFilledIcon, ShadowIcon, BorderSolidIcon } from "@radix-ui/react-icons"


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
                <BorderSolidIcon className="inline w-6 h-6 text-red-600 "/>
                Dolmetscher
                <DotFilledIcon className="inline w-6 h-6 text-red-600"/>
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
            <h2 className="font-garamond-pp text-xl max-w-1/2 text-center text-wrap">
            A linguistic and historical journey through WW2 German-Russian phrases 
            as a language learning game
            </h2>
        </header>
    );
};

export default Header;
