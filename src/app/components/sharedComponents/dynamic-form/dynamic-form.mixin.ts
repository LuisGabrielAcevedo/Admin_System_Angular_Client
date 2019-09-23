import { Input } from "@angular/core";
import {
  FormModel,
  FormField,
  FormMainGroup,
  MaterialFormData,
  FormFieldTypes,
  FormatFieldsResponse
} from "./dynamic-form.interfaces";
import get from "lodash/get";
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
  protected currentModel: FormModel = {};
  protected editedFieldsModel: FormModel = {};
  protected errors: ValidationErrors = {};
  protected groupIndexes: object = {};
  protected mainGroupsFormatted: FormMainGroup[] = [];
  protected activeGroup: number = 0;
  @Input() protected fieldsConfig!: FormField[];
  @Input() protected model: FormModel;
  @Input() protected formType: string = "tabs";
  @Input() protected columns: number;
  @Input() protected materialData: MaterialFormData;
  @Input() protected formatId: string = "_id";

  constructor(
    public fb: FormBuilder,
    public dynamicFormService: DynamicFormService
  ) {
    this.form = this.fb.group({});
  }

  protected formatFields(): FormMainGroup[] {
    let mainGroupsFormatted: FormMainGroup[] = [];
    this.groupIndexes = {};
    this.form = this.fb.group({});
    this.form.addControl(this.formatId, this.fb.control(null));

    const formatFieldsResponse: FormatFieldsResponse = this.dynamicFormService.formatFields(
      this.fieldsConfig,
      this.columns,
      this.form,
      {
        changeForm: true
      }
    );

    mainGroupsFormatted = formatFieldsResponse.mainGroupsFormatted;
    this.form = formatFieldsResponse.form;
    this.groupIndexes = formatFieldsResponse.groupIndexes;

    return mainGroupsFormatted;
  }

  protected updateForm(model: FormModel) {
    const currentModel: FormModel = cloneDeep(model);
    if (currentModel[this.formatId])
      this.form.controls[this.formatId].patchValue(currentModel[this.formatId]);
    this.fieldsConfig.forEach(field => {
      const value: any = get(
        currentModel,
        field.key,
        field.defaultValue || null
      );
      this.form.controls[field.key].patchValue(value);
    });
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
    const fields: FormFieldTypes[] = [
      FormFieldTypes.asyncAutocomplete,
      FormFieldTypes.autocomplete
    ];
    this.fieldsConfig.forEach(field => {
      if (field.component) {
        const value =
          fields.includes(field.component) &&
          field.options &&
          field.options.associationValue &&
          this.form.value[field.key]
            ? this.form.value[field.key][field.options.associationValue]
            : this.form.value[field.key];
        set(this.currentModel, field.key, value);
      }
    });
  }
  protected searchInvalidMainGroup() {
    this.dynamicFormService.setActiveGroup.emit(
      this.groupIndexes[Object.keys(this.errors)[0]]
    );
  }
}
