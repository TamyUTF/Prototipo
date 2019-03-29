import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PlannerComponent } from './planos/plano/planner-list/planner.component';
import { PlannerDashboardComponent } from './planos/plano/planner-dashboard/planner-dashboard.component';
import { BottomSheetComponent } from './planos/shared/bottom-sheet/bottom-sheet.component';


const appRoutes: Routes = [
    { path: '', component: PlannerComponent},
    { path: 'dashboard', component: PlannerDashboardComponent},
    { path: 'new', component: BottomSheetComponent}
];

@NgModule ({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
