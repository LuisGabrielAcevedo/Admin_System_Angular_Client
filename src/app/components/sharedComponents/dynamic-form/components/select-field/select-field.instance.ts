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
import { FormData, FormFieldTypes, FormModel } from '../../dynamic-form.interfaces';
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
    @Input() data: FormData;
    @Input() form: FormGroup;
    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        const data: FormData = changes.data ? changes.data.currentValue : undefined;
        if (data) {
            this.data = data;
            this.loadComponent();
        }
    }

    loadComponent() {
        const component: any = this.components()[this.data.field.component];
        const formField = new FormFieldComponent(component, this.data, this.form);
        const componentInstance = this.generateInstance<any>(formField);
        if (formField.formData) {
            componentInstance.field = formField.formData.field;
            componentInstance.appearance = formField.formData.appearance;
            componentInstance.id = formField.formData.id;
        }
        if (formField.form) {
            componentInstance.form = formField.form;
        }
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
