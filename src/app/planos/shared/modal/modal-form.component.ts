import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {
  form: FormGroup;
  constructor(private fBuilder: FormBuilder,
              private dialogRef: MatDialogRef<ModalFormComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
                this.createForm();
               }

  ngOnInit() {
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

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
