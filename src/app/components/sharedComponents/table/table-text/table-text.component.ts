import { Component, OnInit, Input } from '@angular/core';
import { TableService } from '../table.service';

@Component({
  selector: 'app-table-text',
  templateUrl: './table-text.component.html',
  styleUrls: ['./table-text.component.css']
})
export class TableTextComponent implements OnInit {
  @Input() field: string | string[];
  @Input() item: object;
  text;
  constructor(private httpTableService: TableService) {
    this.text = null;
  }

  ngOnInit() {
    this.formatText();
  }

  formatText() {
    let text = this.httpTableService.formatText(this.item, (this.field as string));
    text = text ? text : 'Sin información';
    this.text = text.length > 22 ? `${text.substr(0, 22)}...` : text;
  }
}
