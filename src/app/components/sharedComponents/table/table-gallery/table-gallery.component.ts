import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { TableGalleryConfig } from '../table.interfaces';
import { TableService } from '../table.service';

@Component({
  selector: 'app-table-gallery',
  templateUrl: './table-gallery.component.html',
  styleUrls: ['./table-gallery.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableGalleryComponent implements OnInit {
  @Input() field: string | string[];
  @Input() item: object;
  @Input() observable: (...arg: any[]) => Observable<any>;
  @Input() galleryConfig: TableGalleryConfig;
  public galleryLoading: boolean = null;
  public galleryList: object[] = null;
  constructor(
    private tableService: TableService
  ) { }

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.galleryLoading = true;
    const observable = this.observable(this.item);
    observable.subscribe(resp => {
      this.galleryList = this.tableService.formatText(resp, this.galleryConfig.galleryListData);
      this.galleryLoading = false;
    });
  }

  formatImage(item: object, field: string) {
    return this.tableService.formatText(item, field);
  }

  formatText(item: object, field: string) {
    let text = this.tableService.formatText(item, field);
    text = text ? text : 'Sin información';
    return text.length > 18 ? `${text.substr(0, 18)}...` : text;
  }
}
