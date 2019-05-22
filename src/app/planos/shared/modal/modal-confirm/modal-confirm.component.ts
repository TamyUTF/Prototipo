import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent implements OnInit, OnDestroy {

  constructor(private router: Router,
              private dialogref: MatDialogRef<ModalConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  cancel() {
    this.router.navigate(['']);
    this.dialogref.close('false');
  }

  confirm() {
    this.router.navigate(['']);
    this.dialogref.close('true');
  }


  ngOnDestroy() {
    this.router.navigate(['']);
  }
}
