import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { TableService } from '../table.service';

@Component({
  selector: 'app-table-item-information',
  templateUrl: './table-item-information.component.html',
  styleUrls: ['./table-item-information.component.css']
})
export class TableItemInformationComponent implements OnInit {
  @Input() field: any;
  @Input() item: object;
  dataFormated: string[] = null;
  show: boolean = null;
  constructor(private httpTableService: TableService) {
  }

  ngOnInit() {
    this.formatText();
  }

  formatText() {
    const dataFormated: string[] = [];
    this.field.forEach(element => {
      const dataSplit = element.split('/b/');
      const data = this.httpTableService.formatText(this.item, dataSplit[1]);
      dataFormated.push(dataSplit[0] + ' ' + data);
    });
    this.dataFormated = dataFormated;
    this.show = true;
  }
}
