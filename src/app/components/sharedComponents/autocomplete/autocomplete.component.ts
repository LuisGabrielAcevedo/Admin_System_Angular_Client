import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { IAutocompleteData } from '../../../inferfaces/autocomplete';

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit, OnChanges {
    search: FormControl;
    autocompleteStatus: Boolean = false;
    @Input() autocompleteData: IAutocompleteData;
    @Input() optionsAutocomplete: any[] = [];
    @Input() optionsLoading: Boolean;
    @Input() defaultMessage: string;
    @Input() fieldToShow: string;
    @Output() searchValues: any = new EventEmitter();
    @Output() patchValue: any = new EventEmitter();
    options: any[] = [];
    optionSelected: any = {
        _id: null
    };
    loading: Boolean = false;
    constructor() {
        this.fieldToShow = this.fieldToShow ? this.fieldToShow : 'name';
        this.optionSelected[this.fieldToShow] = null;
        if (!this.defaultMessage) {
            this.defaultMessage = 'No hay datos encontrados';
        }
    }

    ngOnInit() {
        if (this.autocompleteData.defaultOption) {
            this.optionSelected = this.autocompleteData.defaultOption;
        }
        this.autocompleteData.defaultOption ?
            this.autocompleteData.disabled ?
            this.search = new FormControl({
                value: this.autocompleteData.defaultOption[this.fieldToShow],
                disabled: this.autocompleteData.disabled })
            : this.search = new FormControl(this.autocompleteData.defaultOption[this.fieldToShow])
            : this.search = new FormControl('', this.autocompleteData.validations);
        this.search.valueChanges
            .pipe(debounceTime(500))
            .subscribe(newValue => {
                if (this.optionSelected[this.fieldToShow] !== newValue) {
                    this.searchValues.emit(newValue);
                }
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.options = this.optionsAutocomplete;
        this.loading = this.optionsLoading;
    }

    autocompleteToggle(status: boolean) {
        this.autocompleteStatus = status;
    }

    pathOption(option: any) {
        this.optionSelected[this.fieldToShow] = option[this.fieldToShow];
        this.optionSelected._id = option._id;
        this.search.patchValue(option[this.fieldToShow]);
        this.patchValue.emit(option);
        this.autocompleteToggle(false);
    }
}
