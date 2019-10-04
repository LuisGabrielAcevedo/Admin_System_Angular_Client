import { Input } from "@angular/core";
import {
  IDynamicFormModel,
  IDynamicFormField,
  IDynamicFormMainGroup,
  IDynamicFormMaterialData,
  IDynamicFormFormatFieldsResponse
} from "./dynamic-form.interfaces";
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  ValidationErrors
} from "@angular/forms";
import { DynamicFormService } from "./dynamic-form.service";
export class FormComponent {
  public form: FormGroup;
  protected active: number = null;
  protected currentModel: IDynamicFormModel = {};
  protected editedFieldsModel: IDynamicFormModel = {};
  protected errors: ValidationErrors = {};
  protected groupIndexes: object = {};
  protected mainGroupsFormatted: IDynamicFormMainGroup[] = [];
  protected activeGroup: number = 0;
  @Input() protected fieldsConfig!: IDynamicFormField[];
  @Input() protected model: IDynamicFormModel;
  @Input() protected formType: string = "tabs";
  @Input() protected columns: number;
  @Input() protected materialData: IDynamicFormMaterialData = {};
  @Input() protected formatId: string = "_id";

  constructor(
    public fb: FormBuilder,
    public dynamicFormService: DynamicFormService
  ) {
    this.form = this.fb.group({});
  }

  protected formatFields(): IDynamicFormMainGroup[] {
    let mainGroupsFormatted: IDynamicFormMainGroup[] = [];
    this.groupIndexes = {};
    this.form = this.fb.group({});
    this.form.addControl(this.formatId, this.fb.control(null));

    const IDynamicFormFormatFieldsResponse: IDynamicFormFormatFieldsResponse = this.dynamicFormService.formatFields(
      this.fieldsConfig,
      this.form,
      this.columns
    );

    mainGroupsFormatted = IDynamicFormFormatFieldsResponse.mainGroupsFormatted;
    this.groupIndexes = IDynamicFormFormatFieldsResponse.groupIndexes;

    return mainGroupsFormatted;
  }

  protected updateForm(model: IDynamicFormModel) {
    const currentModel: IDynamicFormModel = cloneDeep(model);
    if (currentModel[this.formatId])
      this.form.controls[this.formatId].patchValue(currentModel[this.formatId]);
    this.dynamicFormService.updateForm(
      this.fieldsConfig,
      currentModel,
      this.form
    );
  }

  protected validateForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.controls[field];
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        if (control.errors) this.errors[field] = control.errors;
      } else if (control instanceof FormGroup) {
        this.validateForm(control);
      }
    });
  }

  protected updateModel(): void {
    Object.keys(this.form.value).forEach(field => {
      let value;
      if (this.form.value[field]) {
        if (
          this.form.value[field] instanceof File ||
          this.form.value[field] instanceof Blob
        ) {
          value = this.form.value[field];
        } else if (
          !Array.isArray(this.form.value[field]) &&
          typeof this.form.value[field] === "object"
        ) {
          value = this.form.value[field][this.formatId];
        } else {
          value = this.form.value[field];
        }
      } else {
        value = null;
      }
      set(this.currentModel, field, value);
    });
  }

  protected searchInvalidMainGroup() {
    this.dynamicFormService.setActiveGroup.emit(
      this.groupIndexes[Object.keys(this.errors)[0]]
    );
  }
}
