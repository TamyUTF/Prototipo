import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PlannerService } from './../../planner.service';
@Component({
  selector: 'app-modal-status',
  templateUrl: './modal-status.component.html',
  styleUrls: ['./modal-status.component.css']
})
export class ModalStatusComponent implements OnInit, OnDestroy {

  constructor(private fBuilder: FormBuilder,
              private dialogRef: MatDialogRef<ModalStatusComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private plannersService: PlannerService) {
    this.createForm();
               }
  form: FormGroup;
  subs: Subscription;
  startPlanner: boolean;
  todayDate = new Date();

  createForm() {
    this.form = this.fBuilder.group({
      id: [this.data.planner.id],
      name: [this.data.planner.name],
      type: [this.data.planner.type],
      charge: [this.data.planner.charge],
      start: [this.data.planner.start],
      end: [this.data.planner.end],
      belongsTo: [this.data.planner.belongsTo],
        details: this.fBuilder.group( {
        description: [this.data.planner.details.description],
        involveds: [this.data.planner.details.involveds],
        price: [this.data.planner.details.price]
      })
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.valid) {
      this.subs = this.plannersService.updatePlanner(this.data.planner.id, this.form.value)
      .subscribe(res => {
        this.plannersService.openSnackBar('Status alterado com sucesso', 'Ok!');
        this.dialogRef.close();
        this.plannersService.list();
      },
      error => console.error(error));
    }
  }

  ngOnInit() {
    console.log(this.data.planner.name);
    console.log(this.data.planner);
    if (this.data.status === 'start') {
      this.startPlanner = true;
    } else if (this.data.status === 'end') {
      this.startPlanner = false;
    }
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
