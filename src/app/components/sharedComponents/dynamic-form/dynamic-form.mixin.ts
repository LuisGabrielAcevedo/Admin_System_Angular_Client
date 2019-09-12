import { Input } from '@angular/core';
import { FormModel, FormField, FormMainGroup, FormLateralGroup, FormattedValidations } from './dynamic-form.interfaces';
import chunk from 'lodash/chunk';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DynamicFormService } from './dynamic-form.service';
export class FormComponent {
    public id = '1';
    protected active: number = null;
    protected currentModel: FormModel = {};
    protected editedFieldsModel: FormModel = {};
    public form: FormGroup;
    public mainGroupsFormatted: FormMainGroup[] = [];
    @Input() protected fieldsConfig!: FormField[];
    @Input() protected model: FormModel;
    @Input() protected formType = 'tabs';
    @Input() protected appearance: string;
    @Input() protected columns: number;

    constructor(public fb: FormBuilder, public dynamicFormService: DynamicFormService) { }

    protected formatFields(): FormMainGroup[] {
        let mainGroupsFormatted: FormMainGroup[] = [];
        this.form = this.fb.group({});
        this.fieldsConfig.forEach((field) => {
            if (field.options && field.options.validators) {
                const formattedValidations: FormattedValidations = this.dynamicFormService.formatValidations(field.options.validators, this.form);
                this.form.addControl(field.key, this.fb.control(field.defaultValue, formattedValidations.validations));
                this.form.controls[field.key]['errorMessages'] = formattedValidations.errorMessages;
            } else {
                this.form.addControl(field.key, this.fb.control(field.defaultValue));
            }
            const tab: string | undefined = field.mainGroup as string;
            const order: number = tab ? +tab!.split('/')[1] : 0;
            const name: string = tab ? tab!.split('/')[0] : 'Default tab';
            const group: string | null = field.options ? field.options.group! : null;
            const item = mainGroupsFormatted.find((tabFormatted) => tabFormatted.name === name);
            if (item) {
                if (group) {
                    group === FormLateralGroup.left ? item.leftFieldGroup!.push(field)
                        : item.rightFieldGroup!.push(field);
                } else {
                    (item.fields as FormField[]).push(field);
                }
            } else {
                const tabNewItem: FormMainGroup = {
                    order: isNaN(order) ? 0 : order,
                    name,
                    fields: [],
                    leftFieldGroup: [],
                    rightFieldGroup: [],
                };
                if (group) {
                    group === FormLateralGroup.left ? tabNewItem.leftFieldGroup!.push(field)
                        : tabNewItem.rightFieldGroup!.push(field);
                } else {
                    (tabNewItem.fields as FormField[]).push(field);
                }
                mainGroupsFormatted.push(tabNewItem);
            }
        });
        mainGroupsFormatted = sortBy(mainGroupsFormatted, ['order']);
        mainGroupsFormatted = this.buildColumns(mainGroupsFormatted);
        return mainGroupsFormatted;
    }

    protected buildColumns(mainGroups: FormMainGroup[]): FormMainGroup[] {
        let mainGroupsFormatted: FormMainGroup[] = [];
        mainGroupsFormatted = mainGroups.map((group) => {
            if (group.fields.length === 1) {
                if (!(group.fields as FormField[])[0].options) {
                    (group.fields as FormField[])[0].options = {};
                }
                (group.fields as FormField[])[0].options!.flex = 100;
                group.fields = [group.fields as FormField[]];
            } else {
                group.fields = this.columns
                    ? this.buildRowsByColumns(group.fields as FormField[])
                    : this.buildRows(group.fields as FormField[]);
            }
            return group;
        });
        return mainGroupsFormatted;
    }

    protected buildRows(fields: FormField[]): FormField[][] {
        const rows: FormField[][] = [];
        fields = fields.map((field, i) => {
            return field.options ? field.options.row ? field : {
                ...field, options: {
                    ...field.options, row: i,
                },
            } : { ...field, options: { row: i } };
        });
        const fieldsGroups = groupBy(
            fields,
            (field: FormField) => field.options!.row,
        );
        Object.keys(fieldsGroups).forEach((group) => {
            rows.push(fieldsGroups[group]);
        });
        return rows;
    }

    protected buildRowsByColumns(fields: FormField[]): FormField[][] {
        const flex: number = Math.floor(100 / this.columns!);
        fields.map((fieldItem) => {
            if (!fieldItem.options) {
                fieldItem.options = {};
            }
            fieldItem.options!.flex = flex;
            return fieldItem;
        });
        return chunk(fields, this.columns!);
    }

    protected updateForm(model: FormModel) {
        const currentModel: FormModel = cloneDeep(model);
        this.fieldsConfig.forEach(field => {
            const value: any = get(currentModel, field.key, field.defaultValue || null);
            this.form.controls[field.key].patchValue(value);
        });
    }

    public validateForm(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.controls[field];
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateForm(control);
            }
        });
    }
}
