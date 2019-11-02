import { FormGroup, FormControl } from '@angular/forms';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { ChecklistDocument } from '@app/shared/checklist/models/state/checklist-state';
import { ChecklistItemCategory } from '@app/shared/checklist/models/checklist-item-category.enum';
import { PHASES_NORMALIZED } from '@app/constants/phases.constants';
import { ChecklistItemStatus } from '@app/shared/checklist/models/checklist-item-status.enum';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {
  @Input() proposalId: number;
  @Input() isLaRiojaProvinceOwner: boolean = false;
  @Input() isLaRiojaProvinceCoOwner: boolean = false;
  @Input() formChecklist: FormGroup = new FormGroup({
    laRiojaOwner: new FormControl(),
    laRiojaCoOwner: new FormControl()
  });

  @Output() ownerPendingDocuments = new EventEmitter();
  @Output() coOwnerPendingDocuments = new EventEmitter();
  @Output() vehiclePendingDocuments = new EventEmitter();

  public ownerCount: number = 0;
  public coOwnerCount: number = 0;
  public vehicleCount: number = 0;
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.cdr.detectChanges();
  }
  setOwnerCount(count: number) {
    this.ownerCount = count;
  }

  setCoOwnerCount(count: number) {
    this.coOwnerCount = count;
  }

  setVehicleCount(count: number) {
    this.vehicleCount = count;
  }
  setPendingDocumentsOwner(pendingDocuments: number) {
    this.ownerPendingDocuments.emit(pendingDocuments);
  }
  setPendingDocumentsCoOwner(pendingDocuments: number) {
    this.coOwnerPendingDocuments.emit(pendingDocuments);
  }
  setPendingDocumentsVehicle(pendingDocuments: number) {
    this.vehiclePendingDocuments.emit(pendingDocuments);
  }

  isFromCategory(category: string, item: ChecklistDocument): boolean {
    return item.category === ChecklistItemCategory[category];
  }

  isInEditableStatus(item: ChecklistDocument): boolean {
    return (
      item.status === ChecklistItemStatus.INITIAL ||
      item.status === ChecklistItemStatus.INDEXED
    );
  }

  isInReadOnlyStatus(item: ChecklistDocument): boolean {
    return item.status === ChecklistItemStatus.ANALYZED;
  }

  hasCurrentPhase(item: ChecklistDocument): boolean {
    return item.steps.some(
      step => Number(step) === PHASES_NORMALIZED['F'].ID_FASE
    );
  }

  getEditable(category: string) {
    return (d: ChecklistDocument) =>
      this.isFromCategory(category, d) &&
      this.isInEditableStatus(d) &&
      this.hasCurrentPhase(d);
  }
  getReadOnly(category: string) {
    return (d: ChecklistDocument) =>
      this.isFromCategory(category, d) &&
      this.isInReadOnlyStatus(d) &&
      this.hasCurrentPhase(d);
  }
}
