import { Injectable, inject, signal } from '@angular/core';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { Observable, catchError, of, single, take, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';

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

  public currentUserSig = signal<User | undefined | null>(undefined);

  login(payload: any): void {
    this.loading.set(true);
    this.dataService
      .post<{ user: User }>(`${this.url}/login`, payload)
      .pipe(catchError(this.handleError.bind(this)), take(1))
      .subscribe((response) => {
        this.loading.set(false);
        window.localStorage.setItem(
          'accessToken',
          `${response.user.accessToken}`
        );
        window.localStorage.setItem(
          'refreshToken',
          `${response.user.refreshToken}`
        );
        this.currentUserSig.set(response.user);
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
    this.currentUserSig.set(null);
    this.router.navigateByUrl('/authentication');
  }

  fetchUser() {
    const token = window.localStorage.getItem('accessToken');
    if (!token) return;
    this.dataService
      .get<{ user: User }>(`${this.url}/user`)
      .pipe(take(1))
      .subscribe((response: { user: User }) => {
        this.currentUserSig.set(response.user);
      });
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    this.loading.set(false);
    let errorMessage = `An error occurred: ${err.error}`;
    this.authError.set(errorMessage);
    return throwError(() => errorMessage);
  }
}
