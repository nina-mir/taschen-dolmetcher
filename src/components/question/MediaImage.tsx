// MediaImage - just the img tag with responsive classes

import { MediaItem } from '@/types';

interface MediaImageProps {
    media: MediaItem;
    className: string;
    // New accessibility props
    id?: string;
    ariaDescribedby?: string;
    role?: string;
    loading?: 'lazy' | 'eager';
    fetchPriority?: 'high' | 'low' | 'auto';
}

const MediaImage: React.FC<MediaImageProps> = ({
    media,
    className,
    // accessibility props
    id,
    ariaDescribedby,
    role,
    loading = 'eager',
    fetchPriority = 'auto'
}) => {
    // Improve alt text handling
    const getAltText = (altText: string | undefined): string => {
        if (!altText || altText.trim() === '') {
            return 'No alternative text available';
        }
        return altText;
    };

    // Check if image is decorative (empty alt text intentionally)
    const isDecorative = false //media.altText === '';
    
    return (
        <img 
            id={id}
            src={media.imgUrl} 
            className={className}
            alt={getAltText(media.altText)}
            aria-describedby={ariaDescribedby}
            role={role}
            loading={loading}
            fetchPriority={fetchPriority}
            // If decorative, hide from screen readers
            aria-hidden={isDecorative ? 'true' : undefined}
            // Add error handling
            onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.alt = `Image could not be loaded: ${media.altText || 'No description available'}`;
                // Optionally, you could set a fallback src here
                // target.src = '/path/to/fallback-image.jpg';
            }}
            // onLoad={(e) => {   
            //     // Optional: Log successful image load for debugging
            //     const target = e.target as HTMLImageElement;
            //     if (process.env.NODE_ENV === 'development') {
            //         console.debug(`Image loaded successfully: ${target.src}`);
            //     }
            // }}
        />
    );
}

export default MediaImage;


// interface MediaImageProps{
//     media: MediaItem;
//     className : string;
// }

// const MediaImage: React.FC<MediaImageProps> = ({
//     media,
//     className
// }) =>{
//     return (
//         <img 
//         src={media.imgUrl} 
//         className={className}
//         alt={media.altText == '' ? 'kein Alternativtext verfügbar.☹️' : media.altText } />

//     )
// }

// export default MediaImage;

// <img src={media.imgUrl} 
// className="block md:hidden rounded-t-xl md:rounded-t-none mr-0 md:max-h-[70vh] md:w-[50%]" />


{/* <img 
src={media.imgUrl} 
className="rounded-t-xl md:rounded-t-none md:max-h-[70vh] md:w-[50%] my-auto" /> */}
