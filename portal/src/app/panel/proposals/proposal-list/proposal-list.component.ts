import { Component, Input, OnDestroy, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SortBy } from '@shared/model';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  takeUntil
} from 'rxjs/operators';
import { SessionStorageService } from '../../../shared/services/session-storage.service';
import { FormFieldErrorMap } from '../../../shared/ui-components/form-field/form-field-error.model';
import { momentToOurDate } from '../../state/functions';
import { ChangeFilterByAction } from '../../state/proposal-filter/proposal.filter.actions';
import { ProposalFilterState } from '../../state/proposal-filter/proposal.filter.model';
import { proposalFilterSelector } from '../../state/proposal-filter/proposal.filter.selectors';
import { LoadProposalListAction } from '../../state/proposal-list/proposal.list.actions';
import { proposalListSelector } from '../../state/proposal-list/proposal.list.selectors';
import { proposalSellingSelector } from '../../state/proposal-selling/proposal.selling.selectors';
import { selectAllProposalStatus } from '../../state/proposal-status/proposal.status.selectors';
import { ProposalSummary } from './../../state/proposal-list/proposal.list.model';

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.scss']
})
export class ProposalListComponent implements OnInit, OnDestroy, OnChanges {
  public invalidNumericInputCharsRegex = /[^0-9]+/g;
  @Input() allProposals: any[];

  /** for Table */
  public tableColumns = [
    {
      id: 'date',
      label: 'Fecha'
    },
    {
      id: 'dni',
      label: 'DNI'
    },
    {
      id: 'fullName',
      label: 'Nombre y Apellido'
    },
    {
      id: 'vechicle',
      label: 'Vehículo'
    },
    {
      id: 'value',
      label: 'Valor'
    },
    {
      id: 'status',
      label: 'Status'
    }
  ];
  tableProposals = [];
  today = { year: 2019, month: 5, day: 7 };
  twoMonthsAgo = { year: 2019, month: 5, day: 7 };
  maxDate = { year: 2019, month: 5, day: 7 };
  minDate = { year: 2019, month: 5, day: 7 };

  public filterForm: FormGroup;

  sortBy: SortBy = {
    prop: '',
    dir: 'asc'
  };
  filterBy = {};
  pageStart = 0;

  totalElements = 0;
  pageNumber = 0;

  pageSize = 20;

  status = [];
  selling = this.sessionStorageService.getSellingPointCode();

  invalidDni = false;
  dniMessage = 'Verificar DNI ingresado';
  public duplicateDniErrorMessages: FormFieldErrorMap = {
    minlength: {
      msg: 'Verificar DNI ingresado',
      priority: 1
    }
  };
  protected ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<any>,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit() {
    this.store.select(proposalSellingSelector).subscribe(selling => {
      this.selling = selling.sellingPointCode;
      this.filterBy = { ...this.filterBy, sellingPointCode: this.selling };
    });
    this.getFormState();
    this.thisGetStatus();
    this.setUpDates();
    this.startDateChange();
    this.endDateChange();
  }

  ngOnChanges() {
    if (!this.allProposals) return;
    this.watchFormChanges();
  }

  private setUpDates() {
    this.maxDate = momentToOurDate(moment());
    this.today = momentToOurDate(moment());
    this.minDate = momentToOurDate(moment().subtract(3, 'month'));
    this.twoMonthsAgo = momentToOurDate(moment().subtract(3, 'month'));
  }

  private endDateChange() {
    this.filterForm
      .get('endDate')
      .valueChanges.pipe(
        startWith(this.filterForm.get('endDate').value),
        distinctUntilChanged(),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(changes => {
        const newChanges = { ...changes, month: changes.month - 1 };
        const mDate = moment(newChanges);
        const currentFrom = moment(
          this.filterForm.get('startDate').value
        ).subtract(1, 'month');
        const min = mDate.subtract(2, 'months');
        this.minDate = momentToOurDate(min);
        if (currentFrom.isBefore(min, 'day')) {
          this.filterForm.get('startDate').setValue(this.minDate);
        }
      });
  }

  private startDateChange() {
    this.filterForm
      .get('startDate')
      .valueChanges.pipe(
        startWith(this.filterForm.get('startDate').value),
        distinctUntilChanged(),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(changes => {
        const newChanges = { ...changes, month: changes.month - 1 };
        const mDate = moment(newChanges);
        const currentTo = moment(this.filterForm.get('endDate').value).subtract(
          1,
          'month'
        );
        let max = mDate.add(2, 'months');
        if (max.isAfter(moment())) {
          max = moment();
        }

        this.maxDate = momentToOurDate(max);
        if (currentTo.isAfter(max, 'day')) {
          this.filterForm.get('endDate').setValue(this.maxDate);
        }
      });
  }

  private getFormState() {
    this.store
      .select(proposalFilterSelector)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(filterState => {
        if (this.filterForm) {
          this.filterForm.get('startDate').patchValue(filterState.startDate);
          this.filterForm.get('endDate').patchValue(filterState.endDate);
          this.filterForm
            .get('proposalStatus')
            .patchValue(filterState.proposalStatus);
          this.filterForm
            .get('sellingPointCode')
            .patchValue(filterState.sellingPointCode);
        } else {
          this.initForm(filterState);
        }
      });
  }

  private thisGetStatus() {
    this.store
      .select(selectAllProposalStatus)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(statuses => {
        this.status = statuses;
      });
  }

  private initForm(filter: ProposalFilterState) {
    this.filterForm = this.fb.group({
      startDate: [filter.startDate, { updateOn: 'blur' }],
      endDate: [filter.endDate, { updateOn: 'blur' }],
      proposalStatus: [''],
      sellingPointCode: [filter.sellingPointCode],
      dni: [
        filter.document,
        {
          updateOn: 'blur',
          validators: [Validators.maxLength(8), Validators.minLength(7)]
        }
      ]
    });
  }

  private dispatchGetProposalList() {
    this.store.dispatch(
      new LoadProposalListAction({
        filterBy: this.filterBy,
        page: this.pageNumber,
        orderBy: this.sortBy
      })
    );
  }

  private watchFormChanges() {
    this.filterForm.valueChanges
      .pipe(
        startWith(this.filterForm.value),
        distinctUntilChanged((x, y) => JSON.stringify(x) === JSON.stringify(y)),
        filter(_ => this.filterForm.valid),
        switchMap(value => {
          this.store.dispatch(
            new ChangeFilterByAction({
              filterBy: {
                proposalStatus: this.filterForm.get('proposalStatus').value,
                startDate: this.filterForm.get('startDate').value,
                endDate: this.filterForm.get('endDate').value
              }
            })
          );
          this.pageNumber = 0;
          this.mapFormValue(value);
          return this.callNewList();
        }),

        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(proposalList => {
        this.tableProposals = proposalList.map(p => {
          for (const g of this.allProposals) {
            if (p.statusGroup === g.name) p.pillColor = g.color;
          }
          return p;
        });
      });
  }

  private callNewList() {
    this.dispatchGetProposalList();
    return this.store.select(proposalListSelector).pipe(
      map(newResponse => {
        const list = newResponse.proposalMappedList;
        this.totalElements = newResponse.totalElements;
        this.pageNumber = newResponse.pageNumber;
        this.pageSize = newResponse.pageSize;
        return list;
      })
    );
  }

  private mapFormValue(value: any) {
    const startDate =
      value.startDate === '' || value.startDate === null
        ? ''
        : this.mapDate(value.startDate);
    const endDate =
      value.endDate === '' || value.endDate === null
        ? ''
        : this.mapDate(value.endDate);
    const proposalStatus =
      value.proposalStatus === undefined || value.proposalStatus === null
        ? ''
        : value.proposalStatus;

    this.invalidDni = value.dni.length > 0 && value.dni.length <= 7;
    const dni = value.dni.length >= 7 ? value.dni : '';
    this.filterBy = {
      startDate,
      endDate,
      dni,
      proposalStatusGroupId: proposalStatus,
      sellingPointCode: value.sellingPointCode
    };
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onPage(event) {
    this.pageNumber = event.offset;
    this.dispatchGetProposalList();
  }
  onSort(event) {
    this.sortBy = event.sorts[0];
    this.dispatchGetProposalList();
  }
  goToDetail(event) {
    this.router.navigate(['panel/detail/' + event.proposalNumber]);
  }

  mapDate(value) {
    return `${('0' + value.day).slice(-2)}-${('0' + value.month).slice(-2)}-${
      value.year
    }`;
  }
}
