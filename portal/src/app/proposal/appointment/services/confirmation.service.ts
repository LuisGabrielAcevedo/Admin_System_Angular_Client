import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GetAppointmentResDTO } from './../models/api/get.appointment';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  constructor(private http: HttpClient) {}

  public getAppointment(proposalNumber: string): Observable<NgbDateStruct> {
    return this.http
      .get<GetAppointmentResDTO>(
        `${environment.modules.proposal}proposal/${proposalNumber}/appointment`
      )
      .pipe(
        map(res => {
          const d: string = res.appointmentDate;
          const result: NgbDateStruct = {
            year: +d.split('-')[0],
            month: +d.split('-')[1],
            day: +d.split('-')[2].slice(0, 2)
          };
          return result;
        })
      );
  }

  public confirmAppointment(proposalNumber: string): Observable<void> {
    return this.http.patch<void>(
      `${environment.modules.proposal}proposal/${proposalNumber}/appointment/status`,
      {}
    );
  }
}
