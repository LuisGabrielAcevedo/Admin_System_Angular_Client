import { Component, OnDestroy, OnInit } from '@angular/core';
import { CheckPhaseAction } from '@app/common/phase/state/phase.actions';
import { ConfirmationService } from '@app/proposal/appointment/services/confirmation.service';
import {
  proposalIdSelector,
  proposalSelector
} from '@app/proposal/state/proposal.selectors';
import {
  NgbDatepickerConfig,
  NgbDatepickerI18n,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ProposalDTO } from '../../api/proposal';
import { TemplateDateModel } from '../models/appointment.model';
import { DatePickerService } from '../services/datepicker.service';
import { AppointmentDataService } from '../services/appointment.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  providers: [{ provide: NgbDatepickerI18n, useClass: DatePickerService }]
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  public proposal: ProposalDTO;
  public proposalNumber: string;
  public selectedDate: NgbDateStruct;
  public formSubmitted: boolean = false;

  public viewDate: TemplateDateModel;
  public viewEndDate: TemplateDateModel;

  protected ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    public config: NgbDatepickerConfig,
    private store: Store<any>,
    private confirmationService: ConfirmationService,
    private appointmentService: AppointmentDataService
  ) {
    config.firstDayOfWeek = 7;
  }

  ngOnInit() {
    this.store
      .select(proposalSelector)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(p => (this.proposal = p.proposal));
    this.store
      .select(proposalIdSelector)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        distinctUntilChanged()
      )
      .subscribe(id => {
        if (!id || id === '0') return;
        this.proposalNumber = id;
        this.confirmationService
          .getAppointment(this.proposalNumber)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(date => {
            if (date) {
              this.selectedDate = date;
              this.viewDate = this.setTemplateDate(this.selectedDate, true);
              this.viewEndDate = this.setTemplateDate(this.selectedDate, false);
            }
          });
      });
  }

  /**
   * Method to create JS Date object from NgbDateStruct
   * @param date Date to parse
   * @param now Boolean to determine if we want the date as it is or
   * 10 days after
   */
  private setTemplateDate(
    date: NgbDateStruct,
    now: boolean
  ): TemplateDateModel {
    const tDate = new Date(date.year, date.month - 1, date.day);
    if (!now) tDate.setDate(tDate.getDate() + 10);
    const d = tDate.getDate();
    const m = tDate.getMonth() + 1;
    const y = tDate.getFullYear();
    const res = {
      day: d < 10 ? `0${d}` : `${d}`,
      month: m < 10 ? `0${m}` : `${m}`,
      year: `${y}`
    };
    return res;
  }

  confirmAppointment() {
    this.formSubmitted = true;
    this.confirmationService
      .confirmAppointment(this.proposalNumber)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        res =>
          this.store.dispatch(
            new CheckPhaseAction({ proposalId: this.proposalNumber })
          ),
        err => (this.formSubmitted = false)
      );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
