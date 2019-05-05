import { Component, OnInit, Input } from '@angular/core';
import { TableButtonAction } from '../table.interfaces';
import { TableService } from '../table.service';

@Component({
  selector: 'app-table-button',
  templateUrl: './table-button.component.html',
  styleUrls: ['./table-button.component.css']
})
export class TableButtonComponent implements OnInit {
  @Input() field: string | string[];
  @Input() item: object;
  @Input() position: number;
  @Input() button: TableButtonAction;
  constructor(
    private tableService: TableService
  ) { }

  ngOnInit() {
  }

  buttonActions() {
    this.tableService.buttonActions(this.button, this.position, this.item);
  }
}
