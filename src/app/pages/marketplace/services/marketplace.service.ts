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

    #searchCriteria = new BehaviorSubject<string>('');

    public books$ = this.#searchCriteria.pipe(
        mergeMap((search) => {
            let options: any = {};

            if (search) {
                options.params = {
                    search
                };
            }

            return this.dataService.get<IBook[]>(`${this.url}/books`, options);
        })
    );

    public setSearchCriteria(value: string) {
        this.#searchCriteria.next(value);
    }
}