import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-gallery',
  templateUrl: './table-gallery.component.html',
  styleUrls: ['./table-gallery.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableGalleryComponent implements OnInit {
  @Input() field: string | string[];
  @Input() item: object;
  @Input() event: (...arg: any[]) => void;
  @Input() observable: (...arg: any[]) => Observable<any>
  public list = null;
  constructor() { }
  ngOnInit() {
    this.loadFollows();
  }

  loadFollows() {
    const observable = this.observable(this.item);
    observable.subscribe(resp => {
      this.list = resp.data;
    })
  }
}
