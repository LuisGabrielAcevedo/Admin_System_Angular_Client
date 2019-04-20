import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-multi-actions',
  templateUrl: './table-multi-actions.component.html',
  styleUrls: ['./table-multi-actions.component.css']
})
export class TableMultiActionsComponent implements OnInit {
  @Input() colors: string[];
  @Input() items: object[];
  @ViewChild('multiActions') multiActionContent: ElementRef;
  @Output() unSelectItems: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  unSelect() {
    this.unSelectItems.emit();
  }

}
