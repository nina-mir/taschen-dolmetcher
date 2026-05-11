import { MediaItem } from '@/types';

interface MediaImageProps {
  media: MediaItem;
  className: string;
  id?: string;
  ariaDescribedby?: string;
  role?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
}

const MediaImage: React.FC<MediaImageProps> = ({
  media,
  className,
  id,
  ariaDescribedby,
  role,
  loading = 'eager',
  fetchPriority = 'auto',
}) => {
  const getAltText = (altText: string | undefined): string => {
    if (!altText || altText.trim() === '') {
      return 'No alternative text available';
    }
    return altText;
  };

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
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.alt = `Image could not be loaded: ${media.altText || 'No description available'}`;
      }}
    />
  );
}

export default MediaImage;
