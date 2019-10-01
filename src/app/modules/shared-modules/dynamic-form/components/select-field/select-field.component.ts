import { Type } from '@angular/core';
import { FormField, MaterialFormData, FormModel } from '../../dynamic-form.interfaces';
import { FormGroup } from '@angular/forms';

export class FormFieldComponent {
    constructor(
        public component: Type<any>,
        public field: FormField,
        public materialData: MaterialFormData,
        public form: FormGroup,
        public model: FormModel
    ) { }
}