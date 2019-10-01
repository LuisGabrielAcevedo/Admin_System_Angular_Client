import { Component, OnInit } from "@angular/core";
import { BaseFieldComponent } from "../base-field.mixin";

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styleUrls: ["../../dynamic-form.component.css"]
})
export class ImageComponent extends BaseFieldComponent implements OnInit {
  ngOnInit() {}
}
