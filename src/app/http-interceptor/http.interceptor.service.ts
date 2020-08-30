import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import { CommonService } from '../services/common.service';
import { AuthService } from '../services/auth.service';
export const InterceptorSkipHeader = 'X-Skip-Interceptor';

let inThrottle;
export const throttle = (cb: Function , interval ?: number) => {
  if (!inThrottle) {
    cb();
    inThrottle = true;
    setTimeout(() => { inThrottle = false; }, interval);
  }
};

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor( private common: CommonService,
    private auth: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const disableLoading = request.headers.get('disableLoading');
    
    if (!disableLoading) {
      this.common.showLoader();
    }
    if (request.headers.has(InterceptorSkipHeader)) {
      const headers = request.headers.delete(InterceptorSkipHeader);
      return next.handle(request.clone({ headers })).pipe(
        finalize(() => {
          if (!disableLoading) {
            this.common.hideLoader();
          }
        }),
        catchError(error => {
          this.handleAuthError(error);
          if (!disableLoading) {
            this.common.hideLoader();
          }
          throw error;
        })
      );
    } else {
      request = request.clone({});
      return next.handle(request).pipe(
        finalize(() => {
          if (!disableLoading) {
            this.common.hideLoader();
          }
        }),
        catchError(error => {
          this.handleAuthError(error);
          return of(error).pipe(
            finalize(() => {
              if (!disableLoading) {
                this.common.hideLoader();
              }
            })
          );
        })
      );
    }
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {

    // handle auth error
    if (err.status === 401) {
      // handling multiple 401 errors.
      throttle(() => {
        this.auth.logout();
        if (err.error && err.error.error) {
          this.common.showToaster('error', err.error.error,  "Unathourized");
        }
      });
      return of(err);
    }
    throw err;
  }
}
