import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PlannerComponent } from './../plano/planner/planner.component';
const appRoutes: Routes = [
    { path: '', component: PlannerComponent}
];

@NgModule ({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })

export class AppRoutingModule {}
