import { AllowedFormat } from './allowed-format.enum';

/**
 * EMC file content encoded in base64 (without data prefix)
 */
export interface FileContent {
  content: string;
  format: AllowedFormat;
}
