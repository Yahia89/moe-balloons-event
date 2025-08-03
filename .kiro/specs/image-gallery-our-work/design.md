# Design Document

## Overview

The "Our Work" image gallery feature will replace the existing placeholder gallery section in the current page.tsx file. It will dynamically load and display all images from the `public/images/` directory in a responsive grid layout with lightbox functionality for viewing enlarged images. The implementation will use Next.js Image component for optimization and React hooks for state management.

## Architecture

The feature will be implemented as a React component integrated into the existing gallery section (#gallery) of the main page. The architecture follows these principles:

- **Client-side rendering**: Images will be loaded and displayed on the client side
- **Dynamic image discovery**: Images will be automatically discovered from the public/images directory
- **Responsive design**: Grid layout adapts to different screen sizes using Tailwind CSS
- **Accessibility-first**: Proper ARIA labels, keyboard navigation, and screen reader support
- **Performance optimization**: Next.js Image component with lazy loading and optimization

## Components and Interfaces

### 1. ImageGallery Component
Main component that renders the grid of images and manages the lightbox state.

**Props Interface:**
```typescript
interface ImageGalleryProps {
  images: string[];
  className?: string;
}
```

**State Management:**
```typescript
interface GalleryState {
  selectedImageIndex: number | null;
  isLightboxOpen: boolean;
  images: string[];
}
```

### 2. Lightbox Component
Modal component for displaying enlarged images with navigation controls.

**Props Interface:**
```typescript
interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}
```

### 3. ImageCard Component
Individual image thumbnail component with hover effects and click handling.

**Props Interface:**
```typescript
interface ImageCardProps {
  src: string;
  alt: string;
  index: number;
  onClick: (index: number) => void;
}
```

## Data Models

### Image Data Structure
```typescript
interface ImageData {
  src: string;          // Path to the image file
  alt: string;          // Alt text for accessibility
  filename: string;     // Original filename
  index: number;        // Position in the gallery
}
```

### Gallery Configuration
```typescript
interface GalleryConfig {
  imagesPerRow: {
    mobile: number;     // 1
    tablet: number;     // 2
    desktop: number;    // 3
  };
  imageAspectRatio: string; // "aspect-square"
  lazyLoading: boolean;     // true
  showImageCount: boolean;  // true
}
```

## Error Handling

### Image Loading Errors
- **Fallback mechanism**: Display placeholder image if original fails to load
- **Error logging**: Log failed image loads for debugging
- **Graceful degradation**: Continue showing other images if some fail

### Empty Gallery State
- **No images available**: Display informative message with contact information
- **Loading state**: Show skeleton placeholders while images are being discovered

### Lightbox Error Handling
- **Navigation bounds**: Prevent navigation beyond first/last image
- **Keyboard trap**: Ensure focus remains within lightbox when open
- **Escape handling**: Close lightbox on Escape key or outside click

## Testing Strategy

### Unit Tests
1. **ImageGallery Component**
   - Renders correct number of images
   - Handles empty image array
   - Opens lightbox on image click
   - Applies correct CSS classes

2. **Lightbox Component**
   - Opens and closes correctly
   - Navigation works properly
   - Keyboard controls function
   - Focus management works

3. **ImageCard Component**
   - Renders image with correct src and alt
   - Handles click events
   - Shows hover effects

### Integration Tests
1. **Gallery Integration**
   - Images load from public/images directory
   - Responsive grid layout works across breakpoints
   - Lightbox integrates properly with gallery

2. **Accessibility Tests**
   - Screen reader compatibility
   - Keyboard navigation
   - Focus management
   - ARIA labels and roles

### Performance Tests
1. **Image Loading**
   - Lazy loading functionality
   - Image optimization through Next.js
   - Loading performance with multiple images

2. **Responsive Behavior**
   - Layout adaptation across screen sizes
   - Touch interactions on mobile devices

## Implementation Details

### File Structure
```
src/
├── components/
│   ├── ImageGallery.tsx
│   ├── Lightbox.tsx
│   └── ImageCard.tsx
├── hooks/
│   └── useImageGallery.ts
└── utils/
    └── imageUtils.ts
```

### Integration Points
- Replace existing gallery section in `app/page.tsx`
- Maintain existing Tailwind CSS styling approach
- Use existing color scheme (pink/purple gradient theme)
- Integrate with existing navigation (#gallery anchor)

### Image Discovery Strategy
Since Next.js runs in the browser, we'll use a build-time approach to discover images:
1. Create a utility function that imports all images from public/images
2. Use dynamic imports or require.context to load image paths
3. Generate image list at build time for optimal performance

### Responsive Grid Configuration
- **Mobile (< 768px)**: 1 column
- **Tablet (768px - 1024px)**: 2 columns  
- **Desktop (> 1024px)**: 3 columns
- **Large screens (> 1280px)**: 4 columns

### Lightbox Features
- **Navigation**: Previous/Next buttons and keyboard arrows
- **Close options**: X button, Escape key, click outside
- **Image counter**: "Image X of Y" display
- **Smooth transitions**: Fade in/out animations
- **Focus management**: Trap focus within lightbox when open

### Accessibility Features
- **Alt text**: Descriptive alt text for all images
- **ARIA labels**: Proper labeling for interactive elements
- **Keyboard navigation**: Full keyboard support
- **Screen reader support**: Announcements for state changes
- **Focus indicators**: Clear focus outlines for keyboard users
- **Color contrast**: Ensure sufficient contrast for all text elements