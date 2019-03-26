import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MaterialModule } from '../app/planos/shared/material';
import { PlannerModule } from './planos/planner.module';
import { ModalFormComponent } from './planos/shared/modal/modal-form.component';
import { PlannerService } from './planos/shared/planner.service';
import { AppRoutingModule } from './app.routing.module';
import { InvolvedsService } from './planos/shared/involveds.service';
import { TypesService } from './planos/shared/types.service';

@NgModule({
  declarations: [
    AppComponent,
    ModalFormComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    PlannerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [PlannerService, TypesService, InvolvedsService],
  bootstrap: [AppComponent],
  entryComponents: [ModalFormComponent]
})
export class AppModule { }
