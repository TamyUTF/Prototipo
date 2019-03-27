import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';

import { Planner } from './planner.model';

@Injectable({
    providedIn: 'root'
})
export class PlannerService implements OnDestroy {
    constructor(private http: HttpClient,
                private snackbar: MatSnackBar) { }
    readonly apiUrl = `${environment.API}planners`;
    subs: Subscription;
    planners$: Observable<any[]>;
    public planners: any[];

    list() {
        this.planners$ = this.http.get<any[]>(this.apiUrl);
    }

    getAll() {
        this.subs = this.http.get<Planner[]>(this.apiUrl)
        .subscribe(planner => {this.planners = planner;
                               console.log(planner);
                            });
    }

    getPlanner(id: string) {
        return this.http.get<Planner>(`${this.apiUrl}/${id}`);
    }

    deletePlanner(id: string) {
        return this.http.delete<Planner>(`${this.apiUrl}/${id}`);
    }

    updatePlanner(id: string, planner: Planner) {
        return this.http.put<Planner>(`${this.apiUrl}/${id}`, planner);
    }

    createPlanner(planner: Planner) {
        return this.http.post<Planner>(this.apiUrl, planner);
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    openSnackBar(msg: string, action: string) {
        this.snackbar.open(msg, action, {
          duration: 5000,
        });
    }
}
