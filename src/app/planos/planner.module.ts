import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PlannerComponent } from './plano/planner/planner.component';
import { MaterialModule } from './shared/material';
import { MatNativeDateModule } from '@angular/material';
import { PlannerInfoComponent } from './plano/plano-info/planner-info.component';
import { PlannerRoutingModule } from './shared/planner.routing.module';

@NgModule({
    imports : [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MaterialModule,
        MatNativeDateModule,
        PlannerRoutingModule
    ],
    declarations: [
        PlannerComponent,
        PlannerInfoComponent
    ],
    exports: [
        PlannerComponent
    ]
})

export class PlannerModule {}
