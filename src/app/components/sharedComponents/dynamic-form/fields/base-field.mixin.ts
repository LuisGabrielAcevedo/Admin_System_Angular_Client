import { Input } from '@angular/core';
import { FormField, Option, FormModel } from '../dynamic-form.interfaces';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export class BaseFieldComponent {
    @Input() public field: FormField;
    @Input() public form: FormGroup;
    @Input() public id: string;
    @Input() public appearance: string;
    protected subscriptions: Subscription[] = [];
    public options: Option[] = [];
    public loading = false;
    public compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;
    public visibleValue = true;
    public disableValue = false;
    public placeholder = () => this.field.options && this.field.options.placeholder
        ? this.field.options.placeholder
        : ''

    public label = () => this.field.name || '';
    public key = () => this.field.key;

    public compareByValue(f1: any, f2: any) {
        return f1 && f2 && f1 === f2;
    }

    public addSubscriptions() {
        if (this.field.options.visibleCondition || this.field.options.disableCondition) {
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

    public async loadSelectOptions(value?: any): Promise<any> {
        if (this.field.options!.selectOptions) {
            this.loading = true;
            this.options = await this.field.options!.selectOptions!(value);
            this.loading = false;
        }
    }

    public loadEmunSelectOptions(): void {
        if (this.field.options!.enumSelectOptions) {
            this.options = this.field.options.enumSelectOptions;
        }
    }

    public loadRadioGroupOptions(): void {
        if (this.field.options!.radioGroupOptions) {
            this.options = this.field.options.radioGroupOptions;
        }
    }

    public visible(currentModel: FormModel): void {
        this.visibleValue = this.field.options.visibleCondition(currentModel);
    }

    public disable(currentModel: FormModel): void {
        this.disableValue = this.field.options.disableCondition(currentModel);
    }

    public async loadAsyncSelectOptions(value: any): Promise<any> {
        if (this.field.options!.selectOptions) {
            this.loading = true;
            const resp = await this.field.options!.selectOptions!(value);
            this.loading = false;
            return resp;
        }
        return  [];
    }

    public validateControl(): boolean {
        const control: AbstractControl = this.form.controls[this.field.key];
        return !control.valid && control.touched;
    }

    public errorMessage(): string {
        const control: AbstractControl = this.form.controls[this.field.key];
        const rule: string = Object.keys(control.errors)[0];
        return control['errorMessages'][rule];
    }
}
