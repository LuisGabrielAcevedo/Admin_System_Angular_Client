import { Injectable, EventEmitter } from "@angular/core";
import { ValidatorFn, FormGroup, FormBuilder } from "@angular/forms";
import {
  FormattedValidations,
  FormField,
  FormMainGroup,
  FormLateralGroup,
  FormatFieldsResponse,
  FormatFieldsOptions
} from "./dynamic-form.interfaces";
import { DynamicFormValidator } from "./validate/dynamin-form-validator";
import chunk from "lodash/chunk";
import groupBy from "lodash/groupBy";
// import cloneDeep from "lodash/cloneDeep";

@Injectable()
export class DynamicFormService {
  public resetControl: EventEmitter<any> = new EventEmitter();
  public setActiveGroup: EventEmitter<number> = new EventEmitter();

  constructor(public fb: FormBuilder) {}

  public formatValidations(
    validations: DynamicFormValidator[],
    form: FormGroup
  ): FormattedValidations {
    let errorMessages: object = {};
    let formattedValidations: ValidatorFn[] = [];
    validations.forEach(validation => {
      formattedValidations.push(validation.validate(form));
      errorMessages[validation.name.toLowerCase()] = validation.message;
    });
    return {
      validations: formattedValidations,
      errorMessages
    };
  }

  public formatFields(
    fieldsConfig: FormField[],
    columns?: number,
    form?: FormGroup,
    options?: FormatFieldsOptions
  ): FormatFieldsResponse {
    let mainGroupsFormatted: FormMainGroup[] = [];
    let order: number = 0;
    let groupIndexes: object = {};
    fieldsConfig.forEach(field => {
      if (form && options && options.changeForm) {
        if (field.validators) {
          const formattedValidations: FormattedValidations = this.formatValidations(
            field.validators,
            form
          );
          form.addControl(
            field.key,
            this.fb.control(
              field.defaultValue,
              formattedValidations.validations
            )
          );
          form.controls[field.key]["errorMessages"] =
            formattedValidations.errorMessages;
        } else {
          form.addControl(field.key, this.fb.control(field.defaultValue));
        }
      }
      const tab: string = field.mainGroup;
      const name: string = tab || "Default tab";
      const group: string | null = field.flexConfig
        ? field.flexConfig.group
        : null;
      const item = mainGroupsFormatted.find(
        tabFormatted => tabFormatted.name === name
      );
      if (item) {
        if (group) {
          group === FormLateralGroup.left
            ? item.leftFieldGroup!.push(field)
            : item.rightFieldGroup!.push(field);
        } else {
          (item.fields as FormField[]).push(field);
        }
        groupIndexes[field.key] = item.order;
      } else {
        const tabNewItem: FormMainGroup = {
          order,
          name,
          fields: [],
          leftFieldGroup: [],
          rightFieldGroup: []
        };
        if (group) {
          group === FormLateralGroup.left
            ? tabNewItem.leftFieldGroup!.push(field)
            : tabNewItem.rightFieldGroup!.push(field);
        } else {
          (tabNewItem.fields as FormField[]).push(field);
        }
        groupIndexes[field.key] = order;
        order++;
        mainGroupsFormatted.push(tabNewItem);
      }
    });
    mainGroupsFormatted = this.buildColumns(mainGroupsFormatted, columns);
    return {
      mainGroupsFormatted,
      form,
      groupIndexes
    };
  }

  private buildColumns(
    mainGroups: FormMainGroup[],
    columns?: number
  ): FormMainGroup[] {
    let mainGroupsFormatted: FormMainGroup[] = [];
    mainGroupsFormatted = mainGroups.map(group => {
      if (group.fields.length === 1) {
        if (!(group.fields as FormField[])[0].flexConfig) {
          (group.fields as FormField[])[0].flexConfig = {};
        }
        (group.fields as FormField[])[0].flexConfig!.flex = 100;
        group.fields = [group.fields as FormField[]];
      } else {
        group.fields = columns
          ? this.buildRowsByColumns(group.fields as FormField[], columns)
          : this.buildRows(group.fields as FormField[]);
      }
      return group;
    });
    return mainGroupsFormatted;
  }

  private buildRows(fields: FormField[]): FormField[][] {
    const rows: FormField[][] = [];
    fields = fields.map((field, i) => {
      return field.flexConfig
        ? field.flexConfig.row
          ? field
          : {
              ...field,
              flexConfig: {
                ...field.flexConfig,
                row: i
              }
            }
        : { ...field, flexConfig: { row: i } };
    });
    const fieldsGroups = groupBy(
      fields,
      (field: FormField) => field.flexConfig!.row
    );
    Object.keys(fieldsGroups).forEach(group => {
      rows.push(fieldsGroups[group]);
    });
    return rows;
  }

  private buildRowsByColumns(
    fields: FormField[],
    columns: number
  ): FormField[][] {
    const flex: number = Math.floor(100 / columns!);
    fields.map(fieldItem => {
      if (!fieldItem.flexConfig) {
        fieldItem.flexConfig = {};
      }
      fieldItem.flexConfig!.flex = flex;
      return fieldItem;
    });
    return chunk(fields, columns!);
  }
}
