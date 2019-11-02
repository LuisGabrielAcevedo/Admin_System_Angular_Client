import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChecklistState } from '../models/state/checklist-state';
import { ChecklistItemStatus } from '../models/checklist-item-status.enum';
import { ChecklistItemCategory } from '../models/checklist-item-category.enum';

export const checklistStateSelector = createFeatureSelector<ChecklistState>(
  'checklist'
);

export const selectedPageIdSelector = createSelector(
  checklistStateSelector,
  state => state.modal.selectedPageId
);
export const allPagesSelector = createSelector(
  checklistStateSelector,
  state => state.pages
);
export const selectedPageSelector = createSelector(
  allPagesSelector,
  selectedPageIdSelector,
  (pages, id) => pages[id]
);
export const pendingVehicleDocuments = createSelector(
  checklistStateSelector,
  state => {
    return (
      Object.values(state.documents)
        .filter(document => document.isRequired)
        .filter(document => document.category === ChecklistItemCategory.VEHICLE)
        .filter(doc => doc.status === ChecklistItemStatus.INITIAL).length > 0
    );
  }
);

export const hasDocuments = createSelector(
  checklistStateSelector,
  state => {
    return (
      Object.values(state.documents).filter(
        document => document.status === ChecklistItemStatus.ANALYZED
      ).length > 0
    );
  }
);
