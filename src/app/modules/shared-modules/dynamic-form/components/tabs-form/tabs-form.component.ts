import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import {
  IDynamicFormMainGroup,
  IDynamicFormMaterialData,
  IDynamicFormModel
} from "../../dynamic-form.interfaces";
import { FormGroup, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { DynamicFormService } from "../../dynamic-form.service";

@Component({
  selector: "app-tabs-form",
  templateUrl: "./tabs-form.component.html",
  styleUrls: ["./tabs-form.component.css"]
})
export class TabsFormComponent implements OnInit, OnDestroy {
  public selectedTab: FormControl;
  public subscriptions: Subscription[] = [];
  @Input() public mainGroups: IDynamicFormMainGroup[];
  @Input() public form: FormGroup;
  @Input() public materialData: IDynamicFormMaterialData;
  @Input() public model: IDynamicFormModel;
  constructor(public dynamicFormService: DynamicFormService) {}

  ngOnInit() {
    this.selectedTab = new FormControl(0);
    this.subscriptions.push(
      this.dynamicFormService.setActiveGroup.subscribe(value => {
        if (this.selectedTab.value !== value)
          this.selectedTab.patchValue(value);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
