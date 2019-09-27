import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  @Input() defaultImage: string;
  @Output() fileSelectedEvent: EventEmitter<File> = new EventEmitter();
  fileSelected: any = null;
  fileToUpload: File;
  constructor() { }

  ngOnInit() {
    if (!this.defaultImage) {
      this.defaultImage = '../../../../assets/images/default.jpg';
    }
  }

  fileChangeEvent(imagen) {
    if (!imagen) {
      this.fileSelected = null;
      return;
    }
    this.fileToUpload = <File>imagen.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onloadend = () => {
      this.fileSelected = reader.result;
    };
    this.fileSelectedEvent.emit(this.fileToUpload);
  }
}
