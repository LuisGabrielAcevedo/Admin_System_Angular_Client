import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '@app/common/login/models/state/user-data';
import { userSelector } from '@app/common/login/store/login.selectors';
import { NO_APPOINTMENT_MESSAGE } from '@app/constants/error.constants';
import {
  proposalIdSelector,
  proposalSelector
} from '@app/proposal/state/proposal.selectors';
import {
  NgbDate,
  NgbDatepickerConfig,
  NgbDatepickerI18n,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ProposalDTO } from '../../api/proposal';
import { SelectedDateModel } from '../models/appointment.model';
import { AppointmentDataService } from '../services/appointment.service';
import { DatePickerService } from '../services/datepicker.service';
import { ConfirmationService } from './../services/confirmation.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [{ provide: NgbDatepickerI18n, useClass: DatePickerService }]
})
export class DateComponent implements OnInit, OnDestroy {
  public selectedDate: NgbDateStruct;
  public disabledDates: NgbDateStruct[] = [];
  public proposal: ProposalDTO;
  public proposalNumber: string;
  public minDate: NgbDateStruct;
  public maxDate: NgbDateStruct;

  public formSubmitted: boolean = false;
  public enableCalendar: boolean = true;
  private user: UserData;
  protected ngUnsubscribe: Subject<any> = new Subject();

  public dateList: Date[] = [];

  constructor(
    private config: NgbDatepickerConfig,
    private store: Store<any>,
    private appointmentService: AppointmentDataService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.config.firstDayOfWeek = 7;
  }

  ngOnInit() {
    this.store
      .select(proposalSelector)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        proposal => {
          this.proposal = proposal.proposal;
          this.proposalNumber = this.proposal.proposalNumber.toString();

          this.appointmentService
            .getDates()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
              dates => {
                this.minDate = dates[0];
                this.maxDate = dates[dates.length - 1];
                this.dateList = dates.map(date =>
                  this.ngbDateStructToDate(date)
                );
                this.disabledDays();

                this.confirmationService
                  .getAppointment(this.proposalNumber)
                  .pipe(takeUntil(this.ngUnsubscribe))
                  .subscribe(
                    selDate => {
                      this.selectedDate = selDate ? selDate : this.minDate;
                    },
                    (err: HttpErrorResponse) => {
                      const errorMsg =
                        typeof err.error === 'string' ? err.error : null;
                      if (
                        errorMsg &&
                        errorMsg.includes(NO_APPOINTMENT_MESSAGE)
                      ) {
                        this.selectedDate = this.minDate;
                      } else {
                        this.enableCalendar = false;
                      }
                    }
                  );
              },
              err => (this.enableCalendar = false)
            );
        },
        err => (this.enableCalendar = false)
      );

    this.store
      .select(userSelector)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(user => (this.user = user));
  }

  /**
   * Disable dates that are not listed within that range
   */
  private disabledDays() {
    const minimumDate: Date = this.ngbDateStructToDate(this.minDate);
    const maximumDate: Date = this.ngbDateStructToDate(this.maxDate);
    for (const i = minimumDate; i < maximumDate; i.setDate(i.getDate() + 1)) {
      let isDisabled: boolean = true;
      isDisabled = !this.dateList.some(
        date => date.toString() === i.toString()
      );
      if (isDisabled) {
        this.disabledDates.push({
          year: i.getFullYear(),
          month: i.getMonth() + 1,
          day: i.getDate()
        });
      }
    }
  }

  isDisabled = (date: NgbDateStruct): boolean => {
    return this.disabledDates.some(d => NgbDate.from(d).equals(date));
  };

  ngbDateStructToDate(date: NgbDateStruct) {
    return new Date(date.year, date.month - 1, date.day);
  }

  saveAppointment() {
    this.formSubmitted = true;
    const payload: SelectedDateModel = {
      terceiroId: 0,
      appointmentDate: this.selectedDate,
      appointmentUser: this.user.username
    };
    this.appointmentService
      .postAppointment(this.proposal.proposalNumber.toString(), payload)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        res =>
          this.router.navigate([
            `panel/detail/${this.proposal.proposalNumber}`
          ]),
        err => {
          this.formSubmitted = false;
        }
      );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
