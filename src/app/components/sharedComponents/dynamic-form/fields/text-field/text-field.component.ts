import { Component, OnInit, OnDestroy } from "@angular/core";
import { BaseFieldComponent } from "../base-field.mixin";
import { FormModel } from "../../dynamic-form.interfaces";

@Component({
  selector: "app-text-field",
  templateUrl: "./text-field.component.html",
  styleUrls: ["../../dynamic-form.component.css"]
})
export class TextFieldComponent extends BaseFieldComponent
  implements OnInit, OnDestroy {
  ngOnInit() {
    this.addSubscriptions();
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
