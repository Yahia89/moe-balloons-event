import { useState, useEffect } from 'react';
import ImageCard from './ImageCard';
import Lightbox from './Lightbox';
import { useImageGallery } from '../hooks/useImageGallery';
import { getGalleryImages, ImageData } from '../utils/imageUtils';

interface ImageGalleryProps {
  className?: string;
}

export default function ImageGallery({ className = '' }: ImageGalleryProps) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    selectedImageIndex,
    isLightboxOpen,
    openLightbox,
    closeLightbox,
    goToNext,
    goToPrevious,
  } = useImageGallery(images);

  // Load images on component mount
  useEffect(() => {
    try {
      const galleryImages = getGalleryImages();
      setImages(galleryImages);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load gallery images');
      setIsLoading(false);
    }
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-6xl mb-4">📷</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Unable to Load Gallery
        </h3>
        <p className="text-gray-600 mb-4">
          We're having trouble loading our event photos right now.
        </p>
        <a
          href="#contact"
          className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
        >
          Contact Us for Photos
        </a>
      </div>
    );
  }

  // Empty state
  if (images.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-6xl mb-4">🎈</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Gallery Coming Soon
        </h3>
        <p className="text-gray-600 mb-4">
          We're currently updating our gallery with beautiful event photos.
        </p>
        <a
          href="#contact"
          className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
        >
          Get in Touch
        </a>
      </div>
    );
  }

  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {images.map((image) => (
          <ImageCard
            key={image.index}
            image={image}
            onClick={openLightbox}
          />
        ))}
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={selectedImageIndex}
          isOpen={isLightboxOpen}
          onClose={closeLightbox}
          onNext={goToNext}
          onPrevious={goToPrevious}
        />
      )}
    </>
  );
}