import { Injectable, effect, inject, signal } from '@angular/core';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { Observable, catchError, of, single, take, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000';

  private dataService = inject(DataService);
  private router = inject(Router);

  public loading = signal(false);
  public authError = signal<string | null>(null);

  public shouldRegister = signal(false);

  login(payload: any): void {
    this.loading.set(true);
    this.dataService
      .post<{ accessToken: string; refreshToken: string }>(
        `${this.url}/login`,
        payload
      )
      .pipe(catchError(this.handleError.bind(this)), take(1))
      .subscribe((res) => {
        this.loading.set(false);
        window.localStorage.setItem('accessToken', `${ res.accessToken }`)
        window.localStorage.setItem('refreshToken', `${ res.refreshToken }`)
        this.router.navigateByUrl('/marketplace');
      });
  }

  register(payload: any) {
    this.loading.set(true);
    this.dataService
      .post(`${this.url}/register`, payload)
      .pipe(catchError(this.handleError.bind(this)), take(1))
      .subscribe(() => {
        this.loading.set(false);
        this.shouldRegister.set(false);
      });
  }

  logout() {
    window.localStorage.setItem('accessToken', '');
    window.localStorage.setItem('refreshToken', '');
    this.router.navigateByUrl('/authentication');
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    this.loading.set(false);
    let errorMessage = `An error occurred: ${err.error}`;
    this.authError.set(errorMessage);
    return throwError(() => errorMessage);
  }
}
