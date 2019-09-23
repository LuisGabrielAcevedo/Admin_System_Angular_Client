import { NgControl } from "@angular/forms";
import { Directive, Input } from "@angular/core";

@Directive({
  selector: "[disableControl]"
})
export class DisableControlDirective {
  @Input() set disableControl(condition: boolean) {
    setTimeout(() => {
      //   condition
      //     ? this.ngControl.control.disable({
      //         onlySelf: true,
      //         emitEvent: false
      //       })
      //     : this.ngControl.control.enable();
    }, 100);
  }

  constructor(private ngControl: NgControl) {}
}
