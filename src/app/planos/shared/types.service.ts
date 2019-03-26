import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TypesService implements OnDestroy {
    constructor(private http: HttpClient) {}
    readonly apiUrl = `${environment.API}types`;

    types$: Observable<any[]>;

    list() {
        this.types$ = this.http.get<any[]>(this.apiUrl);
    }

    getAll() {
        return this.http.get<any[]>(this.apiUrl);
    }

    createPlanner(id: string, type: any) {
        return this.http.post<any>(this.apiUrl, type);
    }

    ngOnDestroy() {}
}
