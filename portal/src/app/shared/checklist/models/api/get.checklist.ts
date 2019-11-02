import { ChecklistItem } from '../checklist-item';

/**
 * Result DTO of checklist service (/proposal/:id/checklist)
 */
export interface GetChecklistDTO {
  checklist: ChecklistItem[];
}
