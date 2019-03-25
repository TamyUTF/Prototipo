import { PlannerService } from './../planner.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Planner } from '../planner.model';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit, OnDestroy {
  constructor(private fBuilder: FormBuilder,
              private dialogRef: MatDialogRef<ModalFormComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private route: ActivatedRoute,
              private router: Router,
              private plannerService: PlannerService) {
    this.createForm();
    this.planner$ = data.description;
    console.log(this.planner$);
               }
  form: FormGroup;
  selectedIndex = 0;
  minDate = new FormControl(new Date());
  id: string;
  subs: Subscription;
  edit = false;
  planner$: Observable<Planner>;

  ngOnInit() {
    console.log('estou no form');
    this.subs = this.route.params.subscribe(
      (params: any) => {
        console.log(params.id);
        if (params.id !== undefined) {
          console.log('aaaa');
          this.id = params.id;
          this.edit = true;
          this.planner$ = this.plannerService.getPlanner(this.id);
          console.log(this.id);
          this.subs = this.planner$.subscribe(contact => {
            this.updateForm(contact);
            console.log(contact);
        });

        } else {
          console.log('bbbb');
          this.edit = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  changeData(d) {
    this.minDate = d;
  }

  backIndex() {
    this.selectedIndex = 0;
  }

  nextIndex() {
    this.selectedIndex = 1;
  }

  createForm() {
    this.form = this.fBuilder.group({
      id: [null],
      name: [null],
      types: [null],
      charge: [null],
      start: [null],
      end: [null],
      belongsTo: [null],
        details: this.fBuilder.group( {
        description: [null],
        involveds: [null],
        price: [null]
      })
    });
  }

  updateForm(planner) {
    this.form.patchValue(planner);
  }

  submit() {
    if (this.form.valid) {

    }
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
