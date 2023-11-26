import { Injectable, inject } from "@angular/core";
import { IBook } from "@bs-shared/models";
import { DataService } from "@bs-shared/services";

@Injectable({
    providedIn: 'root'
})
export class MarketplaceService {
    private url = 'http://localhost:3000/api';

    private dataService = inject(DataService);

    public books$ = this.dataService.get<IBook[]>(`${this.url}/books`)
}