import { Component, OnInit, Input } from '@angular/core';
import { DynamicTableSecondTableConfig } from '../table.interfaces';
import { Observable } from 'rxjs';
import { TableService } from '../table.service';

@Component({
  selector: 'app-table-second-table',
  templateUrl: './table-second-table.component.html',
  styleUrls: ['./table-second-table.component.css']
})
export class TableSecondTableComponent implements OnInit {
  @Input() field: string | string[];
  @Input() item: object;
  @Input() observable: (...arg: any[]) => Observable<any>;
  @Input() secondTableConfig: DynamicTableSecondTableConfig;
  public secondTableLoading: boolean = null;
  public secondTableList: object[] = null;
  constructor(
    private tableService: TableService
  ) { }

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.secondTableLoading = true;
    const observable = this.observable(this.item);
    observable.subscribe(resp => {
      this.secondTableList = this.tableService.formatText(resp, this.secondTableConfig.secondTableListData);
      this.secondTableLoading = false;
    });
  }

  formatText(item: object, field: string) {
    let text = this.tableService.formatText(item, field);
    text = text ? text : 'Sin información';
    return text.length > 18 ? `${text.substr(0, 18)}...` : text;
  }
}
