import { Injectable, inject } from "@angular/core";
import { IBook } from "@bs-shared/models";
import { DataService } from "@bs-shared/services";
import { BehaviorSubject, mergeMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MarketplaceService {
    private url = 'http://localhost:3000/api';

    private dataService = inject(DataService);

    // TODO: IMPLEMENT SEARCH
    private searchCriteria = new BehaviorSubject<any>('Austin');
    public searchCriteria$ = this.searchCriteria.asObservable();

    public books$ = this.searchCriteria.pipe(
        mergeMap((search) => {
            let options: any = {};

            if (search) {
                options.params = {
                    search: search
                };
            }

            return this.dataService.get<IBook[]>(`${this.url}/books`, options);
        })
    );
}