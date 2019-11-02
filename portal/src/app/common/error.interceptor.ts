import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ModalService } from 'src/app/common/modal/modal.service';
import {
  EXPIRED_TOKEN_MESSAGE,
  NO_INSURANCE_DETAILS_MESSAGE,
  NO_APPOINTMENT_MESSAGE
} from './../constants/error.constants';
const ALLOWED_ERRORS = [
  EXPIRED_TOKEN_MESSAGE,
  NO_INSURANCE_DETAILS_MESSAGE,
  NO_APPOINTMENT_MESSAGE
];

Object.freeze(ALLOWED_ERRORS);
@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private modalService: ModalService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg: string = null;
        if (error.error) {
          if (typeof error.error === 'string') {
            errorMsg = error.error;
          } else if (
            error.error.error &&
            typeof error.error.error === 'string'
          ) {
            errorMsg = error.error.error;
          }
        }

        if (
          errorMsg &&
          (ALLOWED_ERRORS.some(e => errorMsg.includes(e)) ||
            error.status === 504)
        ) {
          console.log(errorMsg);
        } else {
          this.modalService.error(
            'Ups! Algo sucedió, vuelva a intentar más tarde.'
          );
        }
        return throwError(error);
      })
    );
  }
}
