import { NgControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[disableControl]'
})
export class DisableControlDirective {

    @Input() set disableControl(condition: boolean) {
        const action = condition ? 'disable' : 'enable';
        setTimeout(() => this.ngControl.control[action](), 100);
    }

    constructor(private ngControl: NgControl) {
    }
}
