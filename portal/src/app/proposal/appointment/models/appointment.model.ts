import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface SelectedDateModel {
  terceiroId: number;
  appointmentDate: NgbDateStruct;
  appointmentUser: string;
}

export interface TemplateDateModel {
  day: string;
  month: string;
  year: string;
}
