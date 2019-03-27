import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogConfig, MatBottomSheet, MatBottomSheetConfig} from '@angular/material';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import 'moment/locale/pt-br';

import { ModalFormComponent } from './../../shared/modal/modal-form.component';
import { PlannerService } from './../../shared/planner.service';
import { BottomSheetComponent } from './../../shared/bottom-sheet/bottom-sheet.component';
import { InvolvedsService } from './../../shared/involveds.service';
import { TypesService } from './../../shared/types.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit, OnDestroy {

  constructor(private modal: MatDialog,
              private plannerService: PlannerService,
              private router: Router,
              private bottomSheet: MatBottomSheet,
              private typesService: TypesService,
              private involvedsService: InvolvedsService) {
                this.typesService.list();
                this.involvedsService.list();
                this.plannerService.list();
               }
  subs: Subscription;
  deleteSubs: Subscription;
  ngOnInit() {

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    if (this.deleteSubs) {
      this.deleteSubs.unsubscribe();
    }
  }

  edit(planner) {
    console.log(planner);
    this.openBottomSheet(planner);
  }

  view(planner) {
    this.router.navigate(['planner', planner.id]);
    this.openModalInfo();
  }

  create() {
    this.router.navigate(['new']);
    this.openBottomSheet();
  }

  delete(planner) {
    this.deleteSubs = this.plannerService.deletePlanner(planner.id).subscribe(
      res => {
        this.plannerService.openSnackBar('Plano deletado com sucesso.', 'Ok!');
        this.plannerService.list();
      },
      error => console.error(error)
    );
  }

  openBottomSheet(data?: any) {
    const matConfig = new MatBottomSheetConfig();
    let bottomSheetRef: any;
    matConfig.autoFocus = true;

    if ((data !== undefined ) && ( data !== null)) {
      matConfig.data = {
        id: data.id,
        name: data.name,
        type: data.type,
        charge: data.charge,
        start: data.start,
        end: data.end,
        belongsTo: data.belongsTo,
        details: {
          description: data.details.description,
          involveds: data.details.involveds,
          price: data.details.price
        }
      };
      bottomSheetRef = this.bottomSheet.open(BottomSheetComponent, matConfig);
    } else if (data == null) {
      bottomSheetRef = this.bottomSheet.open(BottomSheetComponent, matConfig);
    }

    this.subs = bottomSheetRef.afterDismissed().subscribe((res: any) => {
      console.log(res);
    });
  }


}
