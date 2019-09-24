import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import {
  MaterialFormData,
  FormField,
  FormatFieldsResponse,
  FormMainGroup,
  FormModel
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
  @Input() model: FormModel;
  public characteristicsForm: FormGroup;
  public rowsFormatted: FormMainGroup[] = [];
  public fieldsConfig: FormField[] = [];
  constructor(
    public fb: FormBuilder,
    public dynamicFormService: DynamicFormService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.form.controls["company"].valueChanges
        .pipe(filter(value => value && typeof value === "object"))
        .subscribe(value => {
          if (this.fieldsConfig.length) {
            this.removeControls();
          }
          this.initForm(value.application.code);
        })
    );
  }

  public removeControls(): void {
    this.fieldsConfig.forEach(field => {
      this.form.removeControl(field.key);
    });
  }

  public async initForm(application: string) {
    const value: string = application.toLowerCase();
    const fieldsConfigModule = await import(
      `./product-characteristics-fields-config/${value}`
    );
    this.fieldsConfig = fieldsConfigModule.default;

    const formatFieldsResponse: FormatFieldsResponse = this.dynamicFormService.formatFields(
      this.fieldsConfig,
      this.form
    );
    this.rowsFormatted = formatFieldsResponse.mainGroupsFormatted;
    this.dynamicFormService.updateForm(this.fieldsConfig, this.model, this.form);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
