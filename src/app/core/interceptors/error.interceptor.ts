import { catchError } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { DIDService } from '../services/did.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor (
    private didService: DIDService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 503) {
          this.didService.recordOnChain();
        } else {
          this.spinner.hide();

          const errorMessage = err.error.message ? err.error.message : err.message;
          this.toastr.error(errorMessage, 'Warning!');
        }

        return throwError(err);
      }));
  }
}
