import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogConfig, MatBottomSheet, MatBottomSheetConfig} from '@angular/material';
import { Subscription } from 'rxjs';

import { ModalFormComponent } from './../../shared/modal/modal-form.component';
import { PlannerService } from './../../shared/planner.service';
import { BottomSheetComponent } from './../../shared/bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit, OnDestroy {

  constructor(private modal: MatDialog,
              private plannerService: PlannerService,
              private router: Router,
              private bottomSheet: MatBottomSheet) { }
  subs: Subscription;
  ngOnInit() {
    this.plannerService.list();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  edit(planner) {
    console.log(planner);
    this.openBottomSheet(planner);
  }

  create() {
    this.router.navigate(['new']);
    this.openBottomSheet();
  }

  openBottomSheet(data?) {
    const matConfig = new MatBottomSheetConfig();
    matConfig.autoFocus = true;
    if (data !== undefined) {
      matConfig.data = {
        id: data.id,
        name: data.name,
        type: data.type,
        charge: data.charge,
        start: data.start,
        end: data.end,
        belongsTo: data.belongsTo,
        details: {
          description: data.description,
          involveds: data.involveds,
          price: data.price
        }
      };
    }
    const bottomSheetRef = this.bottomSheet.open(BottomSheetComponent);
    this.subs = bottomSheetRef.afterDismissed().subscribe((res: any) => {
      console.log(res);
    });
  }

  openModal(planner) { // cria um novo plano
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.direction = 'ltr';
    dialogConfig.width = '700px';
    dialogConfig.height = '500px';
    dialogConfig.data = {
      id: planner.id,
      name: planner.name,
      types: planner.types,
      charge: planner.charge,
      start: planner.start,
      end: planner.end,
      belongsTo: planner.attachment,
      details: {
        description: planner.description,
        involveds: planner.involveds,
        price: planner.price
      }
    };
    const dialogRef = this.modal.open(ModalFormComponent, dialogConfig);
    this.subs = dialogRef.afterClosed().subscribe(data => {
      this.router.navigate(['']);
    });
  }

}
