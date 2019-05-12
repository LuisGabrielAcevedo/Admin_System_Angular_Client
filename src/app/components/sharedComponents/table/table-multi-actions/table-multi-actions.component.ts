import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { TableButtonAction } from '../table.interfaces';
import { TableService } from '../table.service';

@Component({
  selector: 'app-table-multi-actions',
  templateUrl: './table-multi-actions.component.html',
  styleUrls: ['./table-multi-actions.component.css']
})
export class TableMultiActionsComponent implements OnInit {
  @Input() colors: string[];
  @Input() items: object[];
  @Input() multiActions: TableButtonAction[];
  @Output() unSelectItems: EventEmitter<any> = new EventEmitter();
  constructor(
    public tableService: TableService
  ) { }

  ngOnInit() {
  }

  unSelect() {
    this.unSelectItems.emit();
  }

  buttonActions(button: TableButtonAction) {
    this.tableService.buttonActions(button, null, this.items);
  }

  visibleButton(button: TableButtonAction) {
    return button.visible ? button.visible(this.items) : true;
  }

}
