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
               }
  form: FormGroup;
  subs: Subscription;
  startPlanner: boolean;
  todayDate = new Date();
  status: string;

  createForm() {
    this.form = this.fBuilder.group({
      id: [this.data.planner.id],
      name: [this.data.planner.name],
      type: [this.data.planner.type],
      charge: [this.data.planner.charge],
      start: [this.data.planner.start],
      end: [this.data.planner.end],
      status: [this.data.planner.status],
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

  setStatus() {
    this.data.planner.start = this.form.get('start').value;
    this.data.planner.end = this.form.get('end').value;

    if (this.data.status === 'start') {
      this.data.planner.status = 'Aberto';
    } else {
      this.data.planner.status = 'Concluído';
    }
  }

  onSubmit() {
    this.setStatus();
    console.log(this.form.value);
    console.log(this.data.planner);
    if (this.form.valid) {
      this.subs = this.plannersService.updatePlanner(this.data.planner.id, this.data.planner)
      .subscribe(res => {
        this.plannersService.openSnackBar('Status alterado com sucesso', 'Ok!');
        this.dialogRef.close();
      },
      error => console.error(error));
    }
  }

  ngOnInit() {
    if (this.data.status === 'start') {
      this.startPlanner = true;
    } else if (this.data.status === 'end') {
      this.startPlanner = false;
    }
    this.createForm();
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
