import { ImageOrientation } from './image-orientation.enum';

/**
 * Parameterized options to capture a given document image (mobile camera)
 */
export interface CaptureOptions {
  height: number;
  width: number;
  quality: number;
  orientation: ImageOrientation;
}
