import { Component, OnInit, Input } from '@angular/core';
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
      let text = this.httpTableService.formatText(this.item, dataSplit[1]);
      text = text ? text : 'Sin información';
      dataFormated.push(dataSplit[0] + ' ' + text);
    });
    this.dataFormated = dataFormated;
    this.show = true;
  }
}
