import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
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
    planners$: Observable<Planner[]>;
    subPlanners$: Observable<Planner[]>;
    mainPlanners$: Observable<Planner[]>;

    list() {
        this.planners$ = this.http.get<any[]>(this.apiUrl);
    }

    listMainPlanners() {
        this.mainPlanners$ = this.planners$.pipe(
            map(planner => planner.filter(
                plannerMain => plannerMain.belongsTo === null
            ))
        );
    }

    listSubPlanners() {
        this.subPlanners$ = this.planners$.pipe(
            map(planner => planner.filter(
                plannerSub => plannerSub.belongsTo !== null
            ))
        );
    }

    getAll() {
        return this.http.get<Planner[]>(this.apiUrl);
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

    }

    openSnackBar(msg: string, action: string) {
        this.snackbar.open(msg, action, {
          duration: 5000,
        });
    }
}
