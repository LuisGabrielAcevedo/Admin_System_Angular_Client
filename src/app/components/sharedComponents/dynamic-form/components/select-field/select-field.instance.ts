import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ComponentFactoryResolver,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { FormFieldDirective } from './select-field.directive';
import { FormFieldTypes, MaterialFormData, FormField } from '../../dynamic-form.interfaces';
import { FormFieldComponent } from './select-field.component';
import { AsyncAutocompleteComponent } from '../../fields/async-autocomplete/async-autocomplete.component';
import { TextFieldComponent } from '../../fields/text-field/text-field.component';
import { AutocompleteComponent } from '../../fields/autocomplete/autocomplete.component';
import { CheckboxComponent } from '../../fields/checkbox/checkbox.component';
import { DatepickerComponent } from '../../fields/datepicker/datepicker.component';
import { EnumSelectComponent } from '../../fields/enum-select/enum-select.component';
import { ImageComponent } from '../../fields/image/image.component';
import { NumericFieldComponent } from '../../fields/numeric-field/numeric-field.component';
import { PasswordFieldComponent } from '../../fields/password-field/password-field.component';
import { RadioGroupComponent } from '../../fields/radio-group/radio-group.component';
import { SelectComponent } from '../../fields/select/select.component';
import { SwitchComponent } from '../../fields/switch/switch.component';
import { TextareaComponent } from '../../fields/textarea/textarea.component';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-select-field',
    template: `<ng-template app-select-field-directive></ng-template>`
})
export class SelectFieldComponent implements OnInit, OnChanges {
    @ViewChild(FormFieldDirective) formfieldDirective: FormFieldDirective;
    @Input() field: FormField;
    @Input() materialData: MaterialFormData;
    @Input() form: FormGroup;
    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        const field: FormField = changes.field ? changes.field.currentValue : undefined;
        if (field) {
            this.field = field;
            this.loadComponent();
        }
    }

    loadComponent() {
        let formField;
        if (this.field.component) {
            const component: any = this.components()[this.field.component];
            formField = new FormFieldComponent(
                component, 
                this.field, 
                this.materialData, 
                this.form
            );
        }

        if (this.field.dynamicComponent) {
            formField = new FormFieldComponent(
                this.field.dynamicComponent, 
                this.field, 
                this.materialData, 
                this.form
            );
        }
        const componentInstance = this.generateInstance<any>(formField);
        if (formField.field) componentInstance.field = formField.field;
        if (formField.form) componentInstance.form = formField.form;
        componentInstance.materialData = formField.materialData;
    }

    components() {
        return {
            [FormFieldTypes.asyncAutocomplete]: AsyncAutocompleteComponent,
            [FormFieldTypes.autocomplete]: AutocompleteComponent,
            [FormFieldTypes.checkbox]: CheckboxComponent,
            [FormFieldTypes.datepicker]: DatepickerComponent,
            [FormFieldTypes.enum]: EnumSelectComponent,
            [FormFieldTypes.image]: ImageComponent,
            [FormFieldTypes.numericField]: NumericFieldComponent,
            [FormFieldTypes.passwordField]: PasswordFieldComponent,
            [FormFieldTypes.radioGroup]: RadioGroupComponent,
            [FormFieldTypes.select]: SelectComponent,
            [FormFieldTypes.switch]: SwitchComponent,
            [FormFieldTypes.textField]: TextFieldComponent,
            [FormFieldTypes.textarea]: TextareaComponent
        };
    }

    private generateInstance<T>(FieldInstanceComponent: FormFieldComponent) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FieldInstanceComponent.component);
        const viewContainerRef = this.formfieldDirective.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        const componentInstance = <T>componentRef.instance;
        return componentInstance;
    }
}
