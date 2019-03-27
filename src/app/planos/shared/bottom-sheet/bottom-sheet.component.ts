import { InvolvedsService } from './../involveds.service';
import { TypesService } from './../types.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatDialog, MatDialogConfig } from '@angular/material';
import { Subscription, Observable } from 'rxjs';

import { PlannerService } from '../planner.service';
import { Planner } from '../planner.model';
import { ModalFormComponent } from '../modal/modal-form.component';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent implements OnInit, OnDestroy {

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
              private modal: MatDialog,
              private fBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private plannersService: PlannerService,
              private typesService: TypesService,
              private involvedsService: InvolvedsService) {
    this.createForm();
  }

  form: FormGroup;
  selectedIndex = 0;
  minDate = new Date();
  id: string;
  subsModal: Subscription;
  subsForm: Subscription;
  edit = false;
  planner$: Observable<Planner>;

  ngOnInit() {
    console.log('estou no bottom sheet');
    console.log(this.data);
    console.log(this.data.type);
    if (this.data != null) {
      this.form.patchValue(this.data);
      this.edit = true;
    } else {
      this.edit = false;
    }
  }

  ngOnDestroy() {
    if (this.subsModal) {
      this.subsModal.unsubscribe();
    }
  }

  onSubmit() {
    console.log(this.form.value);
    if (this.data !== null) {
      this.subsForm = this.plannersService.updatePlanner(this.data.id, this.form.value)
      .subscribe(res => {
        this.plannersService.openSnackBar('Plano editado com sucesso!', 'Oba!');
        this.plannersService.list();
        this.close();
      },
      error => console.error(error));
    } else {
      this.subsForm = this.plannersService.createPlanner(this.form.value)
      .subscribe(res => {
      this.plannersService.openSnackBar('Plano criado com sucesso!', 'Oba!');
      this.plannersService.list();
      this.close();
    },
    error => console.error(error));
    }

  }

  openModal(str: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = 'ltr';
    dialogConfig.width = '350px';
    dialogConfig.height = '250px';
    dialogConfig.data = {
      type: str
    };
    const dialogRef = this.modal.open(ModalFormComponent, dialogConfig);

    this.subsModal = dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res === 'type') {
        this.typesService.list();
      } else if (res === 'involved') {
        this.involvedsService.list();
      }
    });
  }

  createForm() {
    this.form = this.fBuilder.group({
      id: [null],
      name: [null],
      type: [null],
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

  updateForm() {
    this.form.patchValue(this.data);
  }

  backIndex() {
    this.selectedIndex = 0;
  }

  nextIndex() {
    this.selectedIndex = 1;
  }

  close() {
    this.router.navigate(['']);
    this.bottomSheetRef.dismiss(this.data);
  }

}
