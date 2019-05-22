import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ModalFormComponent } from './modal/modal-form.component';
import { PlannerComponent } from './../plano/planner-list/planner.component';
import { PlannerInfoComponent } from '../plano/plano-info/planner-info.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { ModalStatusComponent } from './modal/modal-status/modal-status.component';

const appRoutes = [
    { path: 'planner', component: PlannerComponent, children: [
      { path: ':id/edit', component: ModalFormComponent},
      { path: ':id/status', component: ModalStatusComponent},
      { path: ':id', component: PlannerInfoComponent},
      { path: 'new', component: BottomSheetComponent},
      { path: 'filter', component: PlannerComponent}
    ]}
];

@NgModule ({
    imports: [ RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
  })

export class PlannerRoutingModule {}
