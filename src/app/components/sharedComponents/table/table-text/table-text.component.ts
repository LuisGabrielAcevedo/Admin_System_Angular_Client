import { Component, OnInit, Input } from '@angular/core';
import { TableService } from '../table.service';

@Component({
  selector: 'app-table-text',
  templateUrl: './table-text.component.html',
  styleUrls: ['./table-text.component.css']
})
export class TableTextComponent implements OnInit {
  @Input() field: string;
  @Input() item: object;
  text;
  constructor(private httpTableService: TableService) {
    this.text = null;
  }

  ngOnInit() {
    this.formatText();
  }

  async formatText() {
    this.text = await this.httpTableService.formatText(this.item, this.field);
  }
}
