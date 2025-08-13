// MediaImage - just the img tag with responsive classes

import { MediaItem } from '@/types';

interface MediaImageProps{
    media: MediaItem;
    className : string;
}

const MediaImage: React.FC<MediaImageProps> = ({
    media,
    className
}) =>{
    return (
        <img 
        src={media.imgUrl} 
        className={className}
        alt={media.altText == '' ? 'kein Alternativtext verfügbar.☹️' : media.altText } />

    )
}

export default MediaImage;

// <img src={media.imgUrl} 
// className="block md:hidden rounded-t-xl md:rounded-t-none mr-0 md:max-h-[70vh] md:w-[50%]" />


{/* <img 
src={media.imgUrl} 
className="rounded-t-xl md:rounded-t-none md:max-h-[70vh] md:w-[50%] my-auto" /> */}
