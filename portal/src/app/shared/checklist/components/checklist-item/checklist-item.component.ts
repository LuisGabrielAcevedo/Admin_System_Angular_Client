import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AllowedFormat } from '../../models/allowed-format.enum';

const FILETYPES = Object.values(AllowedFormat);
let UID = 0;
@Component({
  selector: 'app-checklist-item',
  templateUrl: './checklist-item.component.html',
  styleUrls: ['./checklist-item.component.scss']
})
export class ChecklistItemComponent implements OnInit {
  @Input() id: string;
  @Input() title: string;
  @Input() instructions: string;
  @Input() link;
  @Input() isRequired: boolean;
  @Input() isLoading: boolean = false;
  @Input() status: boolean;
  @Input() isLoaded: boolean;

  @Output() onUpload: EventEmitter<any> = new EventEmitter();
  @Output() onViewDocument: EventEmitter<any> = new EventEmitter();

  public fileTypes = FILETYPES.join();
  public uid: string = '';

  constructor() {
    this.uid = `checklist-item-${UID++}`;
  }

  ngOnInit() {}

  public upload(event: Event) {
    this.onUpload.emit(event);
  }

  public viewDocument() {
    const document = {
      id: this.id,
      title: this.title
    };
    this.onViewDocument.emit(document);
  }
}
