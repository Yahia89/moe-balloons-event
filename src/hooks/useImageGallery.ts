import { useState, useEffect, useCallback } from 'react';
import { ImageData } from '../utils/imageUtils';

interface UseImageGalleryReturn {
  selectedImageIndex: number | null;
  isLightboxOpen: boolean;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;
  goToNext: () => void;
  goToPrevious: () => void;
  goToImage: (index: number) => void;
}

export function useImageGallery(images: ImageData[]): UseImageGalleryReturn {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = useCallback((index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setSelectedImageIndex(null);
  }, []);

  const goToNext = useCallback(() => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  }, [selectedImageIndex, images.length]);

  const goToPrevious = useCallback(() => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  }, [selectedImageIndex]);

  const goToImage = useCallback((index: number) => {
    if (index >= 0 && index < images.length) {
      setSelectedImageIndex(index);
    }
  }, [images.length]);

  // Keyboard event handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      switch (event.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goToNext();
          break;
        default:
          break;
      }
    };

    if (isLightboxOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scrolling when lightbox is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen, closeLightbox, goToNext, goToPrevious]);

  return {
    selectedImageIndex,
    isLightboxOpen,
    openLightbox,
    closeLightbox,
    goToNext,
    goToPrevious,
    goToImage,
  };
}