import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '@bs-shared/services';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!window.localStorage.getItem('accessToken')) {
      return next.handle(req.clone()).pipe(
        catchError((error: HttpErrorResponse) => {
          const handling = this.handleError(error, req, next);
          if (error.status !== 0) {
            return handling;
          } else {
            return EMPTY;
          }
        })
      );
    }

    const clonedRequest = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${window.localStorage.getItem('accessToken')}`
      ),
    });

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        const handling = this.handleError(error, req, next);
        if (error.status !== 0) {
          return handling;
        } else {
          return EMPTY;
        }
      })
    );
  }

  private handleError = (
    error: any,
    req: HttpRequest<any>,
    next: HttpHandler
  ) => {
    switch (error.status) {
      case 400:
        error.statusText = 'Bad Request - Validation error.';
        return throwError(() => error);
      case 401:
        this.authService.logout();
        return throwError(() => error)
      case 500:
        error.statusText = 'Something unexpected happened. Please try again.';
        return throwError(() => error);
      default:
        return throwError(() => error);
    }
  };
}
