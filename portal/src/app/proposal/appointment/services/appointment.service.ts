import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SelectedDateModel } from '../models/appointment.model';
import { PostAppointmentDataReqDTO } from './../models/api/post.appointment';

@Injectable({ providedIn: 'root' })
export class AppointmentDataService {
  constructor(private http: HttpClient) {}

  public getDates(): Observable<NgbDateStruct[]> {
    return this.http
      .get<string[]>(`${environment.modules.domain}appointment/available-days`)
      .pipe(
        map(dates =>
          dates.map(d => {
            const result: NgbDateStruct = {
              year: +d.split('-')[0],
              month: +d.split('-')[1],
              day: +d.split('-')[2].slice(0, 2)
            };
            return result;
          })
        )
      );
  }

  public postAppointment(
    proposalNumber: string,
    appointment: SelectedDateModel
  ): Observable<PostAppointmentDataReqDTO> {
    const { terceiroId, appointmentDate, appointmentUser } = appointment;
    const payload: PostAppointmentDataReqDTO = {
      terceiroId,
      appointmentDate: this.ngbDateStruct2String(appointmentDate),
      appointmentUser
    };
    return this.http.post<PostAppointmentDataReqDTO>(
      `${environment.modules.proposal}proposal/${proposalNumber}/confirm`,
      payload
    );
  }

  private ngbDateStruct2String(date: NgbDateStruct): string {
    const dateObj = new Date(date.year, date.month - 1, date.day);
    return dateObj.toISOString();
  }
}
