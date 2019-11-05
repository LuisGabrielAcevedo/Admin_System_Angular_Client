import { Component, OnInit, Input } from "@angular/core";
import getValueFn from "../utilities/get-value";

@Component({
  selector: "app-table-image",
  templateUrl: "./table-image.component.html",
  styleUrls: ["./table-image.component.css"]
})
export class TableImageComponent implements OnInit {
  @Input() field: string;
  @Input() item: object;
  image;
  image2;
  constructor() {
    this.image = null;
    this.image2 = null;
  }

  ngOnInit() {
    this.formatImage();
  }

  async formatImage() {
    const image = await getValueFn(this.item, this.field);
    this.image2 = image;
  }
}
