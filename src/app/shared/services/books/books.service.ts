import { Injectable, inject } from "@angular/core";
import { DataService } from "../data.service";
import { BehaviorSubject, switchMap } from "rxjs";
import { IBook } from "../../models/books.model";

@Injectable({
    providedIn: 'root'
})
export class BooksService {

    private url = 'http://localhost:3000';
    private dataService = inject(DataService);

    public bookSelected = new BehaviorSubject<string>('');
    private bookSelected$ = this.bookSelected.asObservable();

    public book$ = this.bookSelected$.pipe(
        switchMap((bookId: string) => {
            return this.dataService.get<IBook>(`${this.url}/api/books/${bookId}`)
        })
    );
}