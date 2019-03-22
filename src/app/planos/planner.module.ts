import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PlannerComponent } from './plano/planner/planner.component';
import { MaterialModule } from './shared/material';
import { MatNativeDateModule } from '@angular/material';

@NgModule({
    imports : [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MaterialModule,
        MatNativeDateModule
    ],
    declarations: [
        PlannerComponent,
    ],
    exports: [
        PlannerComponent
    ]
})

export class PlannerModule {}
