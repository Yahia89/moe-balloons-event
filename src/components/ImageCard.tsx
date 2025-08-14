import Image from 'next/image';
import { ImageData } from '../utils/imageUtils';

interface ImageCardProps {
  image: ImageData;
  onClick: (index: number) => void;
}

export default function ImageCard({ image, onClick }: ImageCardProps) {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onClick(image.index);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      onClick(image.index);
    }
  };

  return (
    <div
      className="relative group overflow-hidden rounded-2xl aspect-square bg-gradient-to-br from-pink-200 to-purple-200 cursor-pointer focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View larger version of ${image.alt}`}
      style={{ userSelect: 'none' }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110 pointer-events-none"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading="lazy"
        draggable={false}
      />
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-4 left-4 text-white">
          <h4 className="font-semibold text-sm">Event Photo</h4>
          <p className="text-xs opacity-90">Click to view larger</p>
        </div>
        
        {/* Zoom icon */}
        <div className="absolute top-4 right-4 text-white opacity-80">
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
}