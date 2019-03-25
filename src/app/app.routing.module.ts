import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PlannerComponent } from './planos/plano/planner/planner.component';
import { ModalFormComponent } from './planos/shared/modal/modal-form.component';


const appRoutes: Routes = [
    { path: '', component: PlannerComponent},
    { path: 'new', component: ModalFormComponent}
];

@NgModule ({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
