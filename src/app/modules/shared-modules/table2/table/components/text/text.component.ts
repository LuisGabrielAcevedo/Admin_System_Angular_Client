import { Component, OnInit, Input } from '@angular/core';
import { ITableItem, ITableHeader } from '../../table.interfaces';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  @Input() item: ITableItem;
  @Input() header: ITableHeader;
  constructor() {}

  ngOnInit() {}
}
