import React from 'react';
import { cn } from '@/lib/utils'; // Adjust the import path as needed

// Define the props for the component
// Extends standard SVG attributes for flexibility (like className, style, id, etc.)
interface LinkedInIconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * The size of the icon (width and height).
   * @default 24
   */
  size?: number | string; // Allow string for flexibility (e.g., "1.5em")
  /**
   * The fill color of the icon.
   * Defaults to 'currentColor', which inherits the text color of the parent element.
   * @default 'currentColor'
   */
  color?: string;
  /**
   * Optional additional CSS classes to apply to the SVG element.
   */
  className?: string;
}

/**
 * Renders the LinkedIn logo as an SVG icon.
 * Allows customization of size, color, and additional CSS classes using `cn`.
 */
export default function LinkedInIcon({
  size = 24, // Default size
  color = 'currentColor', // Default color inherits from text color
  className, // User-provided classes
  ...rest // Pass down any other standard SVG props
}: LinkedInIconProps) {
  return (
    <svg
      width={size}
      height={size} // Maintain aspect ratio using viewBox
      viewBox='0 0 72 72' // IMPORTANT: Use original dimensions for viewBox to scale correctly
      xmlns='http://www.w3.org/2000/svg'
      fillRule='evenodd'
      clipRule='evenodd'
      // Use `cn` to merge potential base classes (if any) with user-provided classes
      className={cn(
        // Add any base classes needed for all instances of this icon here if desired
        // e.g., 'inline-block align-middle flex-shrink-0',
        className // Append user-provided classes (tailwind-merge handles overrides)
      )}
      aria-hidden='true' // Good practice for decorative icons
      focusable='false' // Prevent focusing on decorative icons
      {...rest} // Spread remaining props
    >
      <path
        fill={color}
        d='M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z'
      />
      <path d='M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z' />
    </svg>
  );
}
