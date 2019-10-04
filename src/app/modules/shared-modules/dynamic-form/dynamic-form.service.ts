import { Injectable, EventEmitter } from "@angular/core";
import { ValidatorFn, FormGroup, FormBuilder } from "@angular/forms";
import {
  IDynamicFormFormattedValidations,
  IDynamicFormField,
  IDynamicFormMainGroup,
  IDynamicFormLateralGroup,
  IDynamicFormFormatFieldsResponse,
  IDynamicFormModel
} from "./dynamic-form.interfaces";
import { DynamicFormValidator } from "./validate/dynamin-form-validator";
import chunk from "lodash/chunk";
import groupBy from "lodash/groupBy";
import cloneDeep from "lodash/cloneDeep";
import get from "lodash/get";

@Injectable()
export class DynamicFormService {
  public resetControl: EventEmitter<any> = new EventEmitter();
  public setActiveGroup: EventEmitter<number> = new EventEmitter();

  constructor(public fb: FormBuilder) {}

  public formatValidations(
    validations: DynamicFormValidator[],
    form: FormGroup
  ): IDynamicFormFormattedValidations {
    let errorMessages: object = {};
    let IDynamicFormFormattedValidations: ValidatorFn[] = [];
    validations.forEach(validation => {
      IDynamicFormFormattedValidations.push(validation.validate(form));
      errorMessages[validation.name.toLowerCase()] = validation.message;
    });
    return {
      validations: IDynamicFormFormattedValidations,
      errorMessages
    };
  }

  public formatFields(
    fieldsConfig: IDynamicFormField[],
    form: FormGroup,
    columns?: number
  ): IDynamicFormFormatFieldsResponse {
    let mainGroupsFormatted: IDynamicFormMainGroup[] = [];
    let order: number = 0;
    let groupIndexes: object = {};
    fieldsConfig.forEach(field => {
      if (form && field.key) {
        if (field.validators) {
          const IDynamicFormFormattedValidations: IDynamicFormFormattedValidations = this.formatValidations(
            field.validators,
            form
          );
          form.addControl(
            field.key,
            this.fb.control(
              field.defaultValue,
              IDynamicFormFormattedValidations.validations
            )
          );
          form.controls[field.key]["errorMessages"] =
            IDynamicFormFormattedValidations.errorMessages;
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
          group === IDynamicFormLateralGroup.left
            ? item.leftFieldGroup!.push(field)
            : item.rightFieldGroup!.push(field);
        } else {
          (item.fields as IDynamicFormField[]).push(field);
        }
        groupIndexes[field.key] = item.order;
      } else {
        const tabNewItem: IDynamicFormMainGroup = {
          order,
          name,
          fields: [],
          leftFieldGroup: [],
          rightFieldGroup: []
        };
        if (group) {
          group === IDynamicFormLateralGroup.left
            ? tabNewItem.leftFieldGroup!.push(field)
            : tabNewItem.rightFieldGroup!.push(field);
        } else {
          (tabNewItem.fields as IDynamicFormField[]).push(field);
        }
        groupIndexes[field.key] = order;
        order++;
        mainGroupsFormatted.push(tabNewItem);
      }
    });
    mainGroupsFormatted = this.buildColumns(mainGroupsFormatted, columns);
    return {
      mainGroupsFormatted,
      groupIndexes
    };
  }

  private buildColumns(
    mainGroups: IDynamicFormMainGroup[],
    columns?: number
  ): IDynamicFormMainGroup[] {
    let mainGroupsFormatted: IDynamicFormMainGroup[] = [];
    mainGroupsFormatted = mainGroups.map(group => {
      if (group.fields.length === 1) {
        if (!(group.fields as IDynamicFormField[])[0].flexConfig) {
          (group.fields as IDynamicFormField[])[0].flexConfig = {};
        }
        (group.fields as IDynamicFormField[])[0].flexConfig!.flex = 100;
        group.fields = [group.fields as IDynamicFormField[]];
      } else {
        group.fields = columns
          ? this.buildRowsByColumns(
              group.fields as IDynamicFormField[],
              columns
            )
          : this.buildRows(group.fields as IDynamicFormField[]);
      }
      return group;
    });
    return mainGroupsFormatted;
  }

  private buildRows(fields: IDynamicFormField[]): IDynamicFormField[][] {
    const rows: IDynamicFormField[][] = [];
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
      (field: IDynamicFormField) => field.flexConfig!.row
    );
    Object.keys(fieldsGroups).forEach(group => {
      rows.push(fieldsGroups[group]);
    });
    return rows;
  }

  private buildRowsByColumns(
    fields: IDynamicFormField[],
    columns: number
  ): IDynamicFormField[][] {
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

  public updateForm(
    fieldsConfig: IDynamicFormField[],
    model: IDynamicFormModel,
    form: FormGroup
  ) {
    const currentModel: IDynamicFormModel = cloneDeep(model);
    fieldsConfig.forEach(field => {
      if (field.key) {
        const value: any = get(
          currentModel,
          field.key,
          field.defaultValue || null
        );
        form.controls[field.key].patchValue(value);
      }
    });
  }
}
