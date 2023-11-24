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

  public accessToken = signal<string | null>(null);
  public refreshToken = signal<string | null>(null);

  public loading = signal(false);
  public authError = signal<string | null>(null);

  public shouldRegister = signal(false);

  constructor() {
    effect(() => {
      window.localStorage.setItem(
        'accessToken',
        `${this.accessToken() ? `Bearer ${this.accessToken()}` : ''}`
      );
      window.localStorage.setItem(
        'refreshToken',
        `${this.refreshToken() ? `Bearer ${this.refreshToken()}` : ''}`
      );
    });
  }

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
        this.accessToken.set(res.accessToken);
        this.refreshToken.set(res.refreshToken);
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
    this.accessToken.set(null);
    this.refreshToken.set(null);
    this.router.navigateByUrl('/authentication');
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    this.loading.set(false);
    let errorMessage = `An error occurred: ${err.error}`;
    this.authError.set(errorMessage);
    return throwError(() => errorMessage);
  }
}
