import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-table-gallery',
  templateUrl: './table-gallery.component.html',
  styleUrls: ['./table-gallery.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableGalleryComponent implements OnInit {
  @Input() field: string;
  @Input() item: object;
  constructor() { }
  ngOnInit() {
  }

}
