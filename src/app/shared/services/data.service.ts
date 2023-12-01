import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataService } from '@bs-shared/interfaces';

export type Options = {
  headers?: HttpHeaders,
  params?: any
}

@Injectable({
  providedIn: 'root',
})
export class DataService implements IDataService {
  private http = inject(HttpClient);

  public get<T>(url: string, options?: Options): Observable<T> {
    return this.http.get<T>(url, options);
  }

  public post<T>(url: string, payload: any, options?: Options): Observable<T> {
    return this.http.post<T>(url, payload, options);
  }

  public patch(url: string, payload: any, options?: Options): Observable<any> {
    return this.http.patch<any>(url, payload, options);
  }
}
