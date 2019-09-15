import { Input } from '@angular/core';
import { FormField, Option, FormModel, MaterialFormData } from '../dynamic-form.interfaces';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export class BaseFieldComponent {
    @Input() public field: FormField;
    @Input() public form: FormGroup;
    @Input() public materialData: MaterialFormData;
    protected subscriptions: Subscription[] = [];
    public options: Option[] = [];
    public loading = false;
    public compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;
    public visibleValue = true;
    public disableValue = false;
    public key = () => this.field.key;
    public appearance = () => this.materialData.appearance || 'legacy';
    public floatLabel = () => this.materialData.floatLabel || '';
    public label = () => this.field.options && this.field.options.label 
        ? this.field.options.label 
        : this.field.name;
    public placeholder = () => this.field.options && this.field.options.placeholder
        ? this.field.options.placeholder
        : '';

    public compareByValue(f1: any, f2: any) {
        return f1 && f2 && f1 === f2;
    }

    public compareByValueObject(f1: any, f2: any) {
        return f1 && f2 && f1['_id'] === f2['_id'];
    }

    public addSubscriptions() {
        if (this.field.options && (this.field.options.visibleCondition || this.field.options.disableCondition)) {
            this.subscriptions.push(
                this.form.valueChanges
                    .pipe(debounceTime(200))
                    .subscribe(value => {
                        if (this.field.options.disableCondition) { this.disable(value); }
                        if (this.field.options.visibleCondition) { this.visible(value); }
                    })
            );
        }
    }

    public loadFieldOptions(value?: any): Observable<any> {
        return this.field.options && this.field.options.fieldOptions
            ? this.field.options.fieldOptions(value)
            : of([])
    }

    public loadFieldOptionsPromise(value?: any): Promise<any> {
        return this.loadFieldOptions(value).toPromise();
    }

    public visible(currentModel: FormModel): void {
        this.visibleValue = this.field.options.visibleCondition(currentModel);
    }

    public disable(currentModel: FormModel): void {
        this.disableValue = !this.field.options.disableCondition(currentModel);
    }

    public validateControl(): boolean {
        const control: AbstractControl = this.form.controls[this.field.key];
        return !control.valid && control.touched;
    }

    public errorMessage(): string {
        const control: AbstractControl = this.form.controls[this.field.key];
        if (!control.errors) return '';
        const rule: string = Object.keys(control.errors)[0];
        return control['errorMessages'][rule];
    }

    public required() {
        const control: AbstractControl = this.form.controls[this.field.key];
        return control['errorMessages'] && control['errorMessages']['required'];;
    }
}
