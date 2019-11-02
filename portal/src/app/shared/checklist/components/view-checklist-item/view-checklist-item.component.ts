import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AllowedFormat } from '../../models/allowed-format.enum';

const FILETYPES = Object.values(AllowedFormat);
let UID = 0;

@Component({
  selector: 'app-view-checklist-item',
  templateUrl: './view-checklist-item.component.html',
  styleUrls: ['./view-checklist-item.component.scss']
})
export class ViewChecklistItemComponent {
  @Input() id: string;
  @Input() title: string;
  @Input() status: boolean;
  @Input() isLoaded: boolean;

  @Output() onViewDocument: EventEmitter<any> = new EventEmitter();

  public fileTypes = FILETYPES.join();
  public uid: string = '';

  constructor() {
    this.uid = `checklist-item-${UID++}`;
  }

  public viewDocument() {
    const document = {
      id: this.id,
      title: this.title
    };
    this.onViewDocument.emit(document);
  }
}
