import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import {
  MaterialFormData,
  FormField,
  FormatFieldsResponse,
  FormMainGroup
} from "src/app/components/sharedComponents/dynamic-form/dynamic-form.interfaces";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { DynamicFormService } from "src/app/components/sharedComponents/dynamic-form/dynamic-form.service";

@Component({
  selector: "app-product-characteristics",
  templateUrl: "./product-characteristics.component.html",
  styleUrls: ["./product-characteristics.component.css"]
})
export class ProductCharacteristicsComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[] = [];
  @Input() public field: FormField;
  @Input() public form: FormGroup;
  @Input() public materialData: MaterialFormData;
  public characteristicsForm: FormGroup;
  public rowsFormatted: FormMainGroup[] = [];
  constructor(
    public fb: FormBuilder,
    public dynamicFormService: DynamicFormService
  ) {}

  ngOnInit() {
    this.form.addControl("characteristics", this.fb.control(null));
    this.subscriptions.push(
      this.form.controls["company"].valueChanges
        .pipe(filter(value => value && typeof value === "object"))
        .subscribe(value => {
          this.initForm(value.application.code);
        })
    );
  }

  public async initForm(application: string) {
    const form: FormGroup = this.fb.group({});
    const value: string = application.toLowerCase();
    const fieldsConfigModule = await import(
      `./product-characteristics-fields-config/${value}`
    );
    const fieldsConfig: FormField[] = fieldsConfigModule.default;

    (fieldsConfig as FormField[]).forEach(field => {
      form.addControl(field.key, this.fb.control(field.defaultValue));
    });

    this.form.controls["characteristics"].patchValue(form);
    console.log(this.form);

    const formatFieldsResponse: FormatFieldsResponse = this.dynamicFormService.formatFields(
      fieldsConfig
    );
    this.rowsFormatted = formatFieldsResponse.mainGroupsFormatted;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
