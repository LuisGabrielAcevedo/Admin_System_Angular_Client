import { Input } from '@angular/core';
import { FormModel, FormField, FormTabs, FormLateralGroup } from './dynamic-form.interfaces';
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
    public tabsFormatted: FormTabs[] = [];
    @Input() protected fieldsConfig!: FormField[];
    @Input() protected model: FormModel;
    @Input() protected formType = 'tabs';
    @Input() protected appearance: string;
    @Input() protected columns: number;

    constructor(public fb: FormBuilder, public dynamicFormService: DynamicFormService) { }

    protected formatFields(): FormTabs[] {
        let tabsFormatted: FormTabs[] = [];
        this.form = this.fb.group({});
        this.fieldsConfig.forEach((field) => {
            this.form.addControl(field.key, this.fb.control(field.defaultValue));
            if (field.options && field.options.validationRules) {
                this.dynamicFormService.addValidationsAction(this.form.controls[field.key], field.options.validationRules, this.form);
            }
            const tab: string | undefined = field.tab as string;
            const order: number = tab ? +tab!.split('/')[1] : 0;
            const name: string = tab ? tab!.split('/')[0] : 'Default tab';
            const group: string | null = field.options ? field.options.group! : null;
            const item = tabsFormatted.find((tabFormatted) => tabFormatted.name === name);
            if (item) {
                if (group) {
                    group === FormLateralGroup.left ? item.leftFieldGroup!.push(field)
                        : item.rightFieldGroup!.push(field);
                } else {
                    (item.fields as FormField[]).push(field);
                }
            } else {
                const tabNewItem: FormTabs = {
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
                tabsFormatted.push(tabNewItem);
            }
        });
        tabsFormatted = sortBy(tabsFormatted, ['order']);
        tabsFormatted = this.buildColumns(tabsFormatted);
        return tabsFormatted;
    }

    protected buildColumns(tabs: FormTabs[]): FormTabs[] {
        let tabsFormatted: FormTabs[] = [];
        tabsFormatted = tabs.map((tab, i) => {
            if (tab.fields.length === 1) {
                if (!(tab.fields as FormField[])[0].options) {
                    (tab.fields as FormField[])[0].options = {};
                }
                (tab.fields as FormField[])[0].options!.flex = 100;
                tab.fields = [tab.fields as FormField[]];
            } else {
                tab.fields = this.columns
                    ? this.buildRowsByColumns(tab.fields as FormField[])
                    : this.buildRows(tab.fields as FormField[]);
            }
            return tab;
        });
        return tabsFormatted;
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
