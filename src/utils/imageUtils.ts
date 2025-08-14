// Image data interface
export interface ImageData {
  src: string;
  alt: string;
  filename: string;
  index: number;
}

// Gallery configuration interface
export interface GalleryConfig {
  imagesPerRow: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  imageAspectRatio: string;
  lazyLoading: boolean;
  showImageCount: boolean;
}

// Default gallery configuration
export const defaultGalleryConfig: GalleryConfig = {
  imagesPerRow: {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
  imageAspectRatio: "aspect-square",
  lazyLoading: true,
  showImageCount: true,
};

// Function to get all images from the public/images directory
export function getGalleryImages(): ImageData[] {
  // List of all image filenames in public/images directory
  const imageFilenames = [
    'PHOTO-2025-07-04-23-14-26.jpg',
    'PHOTO-2025-07-04-23-14-33.jpg',
    'PHOTO-2025-07-04-23-14-48.jpg',
    'PHOTO-2025-07-04-23-14-50.jpg',
    'PHOTO-2025-07-04-23-15-01.jpg',
    '7019a44b-a1a4-4a06-b717-e951aeb36781.jpg',
    'PHOTO-2025-07-04-23-15-02.jpg',
    'PHOTO-2025-07-04-23-15-03 2.jpg',
    'PHOTO-2025-07-04-23-15-03.jpg',
    'PHOTO-2025-07-04-23-15-05.jpg',
    'PHOTO-2025-07-04-23-15-06.jpg',
    'PHOTO-2025-07-04-23-17-27 2.jpg',
    'PHOTO-2025-07-04-23-17-27.jpg',
    'PHOTO-2025-07-04-23-17-29.jpg',
    'PHOTO-2025-07-04-23-21-08.jpg',
    'PHOTO-2025-07-04-23-25-35.jpg',
    'PHOTO-2025-07-04-23-25-39.jpg',
    '11ac85f3-f6c2-40d7-88ee-310d8b2156c6.jpg',
    '48afd2ec-5ddf-4469-9873-8e42135074ab.jpg',
    '80e912f8-3eb3-4bbd-b3a2-9fee8f55bc08.jpg'
  ];

  return imageFilenames.map((filename, index) => ({
    src: `/images/${filename}`,
    alt: `Balloon decoration event photo ${index + 1}`,
    filename,
    index,
  }));
}

// Utility function to generate descriptive alt text based on filename
export function generateAltText(filename: string, index: number): string {
  // Extract date from filename if possible
  const dateMatch = filename.match(/PHOTO-(\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? dateMatch[1] : '';
  
  return `Beautiful balloon decoration from ${date ? `event on ${date}` : `event photo ${index + 1}`}`;
}

// Function to preload images for better performance
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Function to preload multiple images
export async function preloadImages(images: ImageData[]): Promise<void> {
  const preloadPromises = images.map(image => preloadImage(image.src));
  await Promise.allSettled(preloadPromises);
}