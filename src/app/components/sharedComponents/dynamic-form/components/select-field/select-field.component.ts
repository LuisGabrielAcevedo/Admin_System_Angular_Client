import { Type } from '@angular/core';
import { FormData, FormModel } from '../../dynamic-form.interfaces';
import { FormGroup } from '@angular/forms';

export class FormFieldComponent {
    constructor(
        public component: Type<any>,
        public formData: FormData,
        public form: FormGroup
    ) { }
}
