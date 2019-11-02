import { Link } from './link';
import { ChecklistItemStatus } from './checklist-item-status.enum';
import { ChecklistItemCategory } from './checklist-item-category.enum';
import { CaptureOptions } from './capture-options';

/**
 * Commom base interface for both internal ChecklistDocument and DTO
 */
export interface ChecklistItem {
  id: string;
  title: string;
  isRequired: boolean;
  instructions: string;
  link: Link;
  lastUpdate: string;
  status: ChecklistItemStatus;
  category: ChecklistItemCategory;
  capture: CaptureOptions;
  steps: string[];
}
