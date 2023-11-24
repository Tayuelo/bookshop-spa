import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataService } from '../interfaces/data-interface';

type Options = {
  headers: HttpHeaders,
  params: any
}

@Injectable({
  providedIn: 'root',
})
export class DataService implements IDataService {
  private http = inject(HttpClient);

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  public post<T>(url: string, payload: any, options?: Options): Observable<T> {
    return this.http.post<T>(url, payload, options);
  }

  public patch(url: string, payload: any, options?: Options): Observable<any> {
    return this.http.patch<any>(url, payload, options);
  }
}
