import { Injectable, inject } from "@angular/core";
import { DataService } from "../../../services/data.service";
import { IBook } from "../../../models/books.model";

@Injectable({
    providedIn: 'root'
})
export class MarketplaceService {
    private url = 'http://localhost:3000/api';

    private dataService = inject(DataService);

    public books$ = this.dataService.get<IBook[]>(`${this.url}/books`)
}