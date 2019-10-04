import { Component, OnInit, Input } from "@angular/core";
import { BaseFieldComponent } from "../base-field.mixin";

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styleUrls: ["../../dynamic-form.component.css"]
})
export class ImageComponent extends BaseFieldComponent implements OnInit {
  @Input() defaultImage: string;
  fileSelected: string | ArrayBuffer = null;
  fileToUpload: File;

  ngOnInit() {
    if (!this.defaultImage) {
      this.defaultImage = "../../../../assets/images/default-image.jpg";
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
    this.form.controls[this.field.key].patchValue(this.fileToUpload);
  }
}
