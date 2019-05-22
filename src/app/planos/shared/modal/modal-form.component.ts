import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TypesService } from '../types.service';
import { InvolvedsService } from './../involveds.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit, OnDestroy {
  constructor(private fBuilder: FormBuilder,
              private router: Router,
              private dialogRef: MatDialogRef<ModalFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private typesService: TypesService,
              private involvedsService: InvolvedsService) {
    this.createForm();
  }
  form: FormGroup;
  subs: Subscription;
  type: boolean;

  ngOnInit() {
    if (this.data.type === 'type') {
      this.type = true;
    } else if (this.data.type === 'involved') {
      this.type = false;
    }
  }

  ngOnDestroy() {
    this.router.navigate(['']);
    if (this.subs !== undefined) {
      this.subs.unsubscribe();
    }
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.data.type === 'type') {
        this.subs = this.typesService.createType(this.form.value).subscribe(res => {
          this.confirm();
        },
        error => console.error(error));
      } else if (this.data.type === 'involved') {
        this.subs = this.involvedsService.createInvolved(this.form.value).subscribe(res => {
          this.confirm();
        },
        error => console.error(error));
      }
    }
  }

  createForm() {
    if (this.data.type === 'type') {
      this.form = this.fBuilder.group({
        id: [null],
        type: [null, [Validators.required]]
      });
    } else {
      this.form = this.fBuilder.group({
        id: [null],
        involved: [null, [ Validators.required]]
      });
    }
  }

  cancel() {
    this.router.navigate(['']);
    this.dialogRef.close();
  }

  confirm() {
    this.router.navigate(['']);
    this.dialogRef.close(this.data.type);
  }
}
