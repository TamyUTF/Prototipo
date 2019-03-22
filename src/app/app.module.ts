import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './planos/shared/app.routing.module';
import { MaterialModule } from '../app/planos/shared/material';
import { PlannerModule } from './planos/planner.module';
import { ModalFormComponent } from './planos/shared/modal/modal-form.component';
import { PlannerService } from './planos/shared/planner.service';

@NgModule({
  declarations: [
    AppComponent,
    ModalFormComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PlannerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PlannerService],
  bootstrap: [AppComponent],
  entryComponents: [ModalFormComponent]
})
export class AppModule { }
