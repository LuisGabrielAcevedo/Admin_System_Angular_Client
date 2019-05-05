import { Component, OnInit, Input } from '@angular/core';
import { TableModal,TableButtonAction } from '../table.interfaces';
import { TableService } from 'src/app/components/sharedComponents/table/table.service';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.css']
})
export class TableModalComponent implements OnInit {
  buttonSelected: string;
  @Input() modalData: TableModal;
  @Input() item: object;
  @Input() position: number;
  constructor(
    public tableService: TableService
  ) { }

  ngOnInit() {
  }

  buttonActions(button: TableButtonAction) {
    this.buttonSelected = button.label;
    this.tableService.buttonActions(button, this.position, this.item);
  }

  modalSuccesActions() {
    if (this.modalData.successButtonEvent) {
      this.tableService.outputItem(this.modalData.successButtonEvent, this.item);
    }
  }

  visibleButton(button: TableButtonAction) {
    return button.visible ? button.visible(this.item) : true;
  }

  color(button: TableButtonAction) {
    return this.buttonSelected === button.label ? {'color': '#3f51b5'}:{'color' : '#a7a7a7'};
  }
}
