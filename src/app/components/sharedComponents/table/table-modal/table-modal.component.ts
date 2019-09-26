import { Component, OnInit, Input } from '@angular/core';
import { DynamicTableModal, DynamicTableButtonAction } from '../table.interfaces';
import { TableService } from 'src/app/components/sharedComponents/table/table.service';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.css']
})
export class DynamicTableModalComponent implements OnInit {
  public buttonSelected: string;
  public loading: boolean;
  @Input() modalData: DynamicTableModal;
  @Input() item: object;
  @Input() position: number;
  constructor(
    public tableService: TableService
  ) { }

  ngOnInit() {
  }

  buttonActions(button: DynamicTableButtonAction) {
    this.buttonSelected = button.label;
    this.tableService.buttonActions(button, this.position, this.item);
  }

  modalSuccesActions() {
    if (this.modalData.successButtonEvent) {
      this.loading = true;
      this.modalData.successButtonEvent(this.item).subscribe(() => {
        this.loading = false;
        this.tableService.closeModal.emit();
        this.tableService.reload.emit();
      });
    }
  }

  visibleButton(button: DynamicTableButtonAction) {
    return button.visible ? button.visible(this.item) : true;
  }

  disabledButton(button: DynamicTableButtonAction) {
    return button.disabled ? button.disabled(this.item) : false;
  }

  color(button: DynamicTableButtonAction) {
    return this.buttonSelected === button.label ? { 'color': '#3f51b5' } : { 'color': 'rgba(127,127,127,0.5)' };
  }
}
