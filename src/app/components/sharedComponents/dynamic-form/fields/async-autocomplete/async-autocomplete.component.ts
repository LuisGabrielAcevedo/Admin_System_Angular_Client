import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseFieldComponent } from '../base-field.mixin';
import { DynamicFormService } from '../../dynamic-form.service';
import { Observable } from 'rxjs';
import { tap, debounceTime, switchMap, finalize, filter } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-async-autocomplete',
  templateUrl: './async-autocomplete.component.html',
  styleUrls: ['../../dynamic-form.component.css']
})
export class AsyncAutocompleteComponent extends BaseFieldComponent implements OnInit, OnDestroy {
  filteredOptions: Observable<any[]>;
  constructor(public dynamicFormService: DynamicFormService) {
    super();
  }

  ngOnInit() {
    this.addSubscriptions();
    this.filteredOptions = this.form.controls[this.field.key].valueChanges.pipe(
      debounceTime(500),
      filter(value => typeof value === 'string'),
      tap(() => this.loading = true),
      switchMap(value => this.loadFieldOptions(value).pipe(
        finalize(() => this.loading = false)
      ))
    );
  }

  public autocompleteOptionSelected(option: MatAutocompleteSelectedEvent) {
    this.dynamicFormService.resetControl.emit({
      key: this.field.key
    });
  }

  public displayFn(option: object): string {
    return !option ? '' : option[this.field.options.associationText]; 
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
