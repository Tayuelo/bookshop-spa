import { Observable } from "rxjs";

export interface IDataService {

    get<T>(url: string, options: any): Observable<T>;

    post<T>(url: string, payload: any, options?: any): Observable<T>;
}

