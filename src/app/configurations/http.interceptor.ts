
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from "@angular/common/http";
import { Observable, of } from 'rxjs';

@Injectable()
export class AdminSystemInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const updatedRequest = request.clone({
      headers: request.headers.set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblVzZXIiOnsic2VjcmV0IjoiYWRtaW5TeXN0ZW1TZXJ2ZXI1OTYiLCJwcm9maWxlSW1hZ2UiOnsiZmlsZU5hbWUiOiI1YzlmYzRmMWVmYzU0MDdiMmVjMzVkZjQ3NjU0X0lNQUdFX0FETUlOLmpwZWciLCJ1cmwiOiJodHRwOi8vbG9jYWxob3N0OjM1MDAvYXBpL3YxL2FkbWlucy9pbWFnZS81YzlmYzRmMWVmYzU0MDdiMmVjMzVkZjQvNWM5ZmM0ZjFlZmM1NDA3YjJlYzM1ZGY0NzY1NF9JTUFHRV9BRE1JTi5qcGVnIiwiZGlyZWN0b3J5IjoiL1VzZXJzL2x1aXNnYWJyaWVsYWNldmVkb3JhbWlyZXovV29ya3NwYWNlL2FkbWluIHNlcnZlciBhbmd1bGFyL0FkbWluLVN5c3RlbS1TZXJ2ZXIvdXBsb2Fkcy9hZG1pbi81YzlmYzRmMWVmYzU0MDdiMmVjMzVkZjQifSwiZmlyc3ROYW1lIjoiTHVpcyBHYWJyaWVsIiwibGFzdE5hbWUiOiJBY2V2ZWRvIFJhbcOtcmV6IiwiY3JlYXRlZEF0IjoiU2F0LCBNYXIgMzAsIDIwMTkgNDozNSBQTSIsInVwZGF0ZWRBdCI6IlNhdCwgTWFyIDMwLCAyMDE5IDQ6MzYgUE0iLCJkZWxldGVkQXQiOm51bGwsIl9pZCI6IjVjOWZjNGYxZWZjNTQwN2IyZWMzNWRmNCIsImVtYWlsIjoibHVpc2dhYnJpZWxfYWNlQGhvdG1haWwuY29tIiwidXNlck5hbWUiOiJNdXNpY2FnYSJ9LCJpYXQiOjE1NTU3Njk3NTUsImV4cCI6MTU1OTM2OTc1NX0.ubKqV1ho14df_0iUTB0opcob_Jwoob9C5HMK1xlWigE")
    });
    
    return next.handle(updatedRequest).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            // console.log("api call success :", event);
          }
        },
        error => {
          if (event instanceof HttpResponse) {
            // console.log("api call error :", event);
          }
        }
      )
    );
  }
}