import { ModalFormComponent } from './modal/modal-form.component';
import { RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';

import { PlannerComponent } from './../plano/planner/planner.component';
import { PlannerInfoComponent } from '../plano/plano-info/planner-info.component';
const appRoutes = [
    { path: '', component: PlannerComponent, children: [
    { path: 'planner/:id/edit', component: ModalFormComponent},
    { path: 'planner/:id', component: PlannerInfoComponent}
    ]}
];

@NgModule ({
    imports: [ RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
  })

export class PlannerRoutingModule {}
