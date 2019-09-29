import { Input } from "@angular/core";
import {
  FormModel,
  FormField,
  FormMainGroup,
  MaterialFormData,
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
  @Input() protected materialData: MaterialFormData = {};
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
      this.form,
      this.columns
    );

    mainGroupsFormatted = formatFieldsResponse.mainGroupsFormatted;
    this.groupIndexes = formatFieldsResponse.groupIndexes;

    return mainGroupsFormatted;
  }

  protected updateForm(model: FormModel) {
    const currentModel: FormModel = cloneDeep(model);
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
      set(
        this.currentModel,
        field,
        this.form.value[field]
          ? !Array.isArray(this.form.value[field]) && typeof this.form.value[field] === "object"
            ? this.form.value[field][this.formatId]
            : this.form.value[field]
          : null
      );
    });
  }
  protected searchInvalidMainGroup() {
    this.dynamicFormService.setActiveGroup.emit(
      this.groupIndexes[Object.keys(this.errors)[0]]
    );
  }
}
