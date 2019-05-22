import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PlannerComponent } from './planos/plano/planner-list/planner.component';
import { PlannerDashboardComponent } from './planos/plano/planner-dashboard/planner-dashboard.component';

const Routes = [
  { path: '', redirectTo: 'planner', pathMatch: 'full'},
  { path: 'planner', component: PlannerComponent},
  { path: 'dashboard', component: PlannerDashboardComponent}
];


@NgModule ({
  imports: [RouterModule.forRoot(Routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
