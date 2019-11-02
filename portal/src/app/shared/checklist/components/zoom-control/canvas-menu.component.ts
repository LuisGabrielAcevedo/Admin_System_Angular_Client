import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { DocumentManagerModel } from '../document-manager/document-manager.model';

@Component({
  selector: 'app-canvas-menu',
  templateUrl: './canvas-menu.component.html',
  styleUrls: ['./canvas-menu.component.scss']
})
export class CanvasMenuComponent implements OnInit {
  /* Input */
  @Input() currentPageNumber;
  @Input() totalOfPages;
  @Input() zoomRate;
  /* Output */
  @Output() onZoomIn = new EventEmitter();
  @Output() onZoomOut = new EventEmitter();

  constructor() {}

  public zoomIn() {
    this.onZoomIn.emit();
  }
  public zoomOut() {
    this.onZoomOut.emit();
  }

  ngOnInit() {}
}
