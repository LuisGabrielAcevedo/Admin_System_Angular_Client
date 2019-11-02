import { Component, OnInit, Input } from '@angular/core';
import { ChecklistDocument } from '@app/shared/checklist/models/state/checklist-state';
import { ChecklistItemCategory } from '@app/shared/checklist/models/checklist-item-category.enum';
import { Store } from '@ngrx/store';
import { hasDocuments } from '../../../shared/checklist/store/checklist.selectors';
import { ChecklistItemStatus } from '../../../shared/checklist/models/checklist-item-status.enum';

@Component({
  selector: 'app-documents-detail',
  templateUrl: './documents-detail.component.html',
  styleUrls: ['./documents-detail.component.scss']
})
export class DocumentsDetailComponent implements OnInit {
  @Input() proposalId: number;
  hasDocuments: boolean;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store
      .select(hasDocuments)
      .subscribe(documents => (this.hasDocuments = documents));
  }

  filterViewOnlyAnalyzed() {
    return (d: ChecklistDocument) => d.status === ChecklistItemStatus.ANALYZED;
  }
}
