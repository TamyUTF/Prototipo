import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class InvolvedsService implements OnDestroy {
    constructor(private http: HttpClient) {}
    readonly apiUrl = `${environment.API}involveds`;

    involveds$: Observable<any[]>;

    list() {
        this.involveds$ = this.http.get<any[]>(this.apiUrl);
    }

    getAll() {
        return this.http.get<any[]>(this.apiUrl);
    }

    createInvolved(involved: any) {
        return this.http.post<any>(this.apiUrl, involved);
    }

    ngOnDestroy() {}
}
