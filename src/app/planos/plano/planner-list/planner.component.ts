import { PlannerInfoComponent } from './../plano-info/planner-info.component';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogConfig, MatBottomSheet, MatBottomSheetConfig} from '@angular/material';
import { Subscription } from 'rxjs';
import 'moment/locale/pt-br';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { ModalStatusComponent } from './../../shared/modal/modal-status/modal-status.component';
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
                this.plannerService.getAll();
               }
  subs: Subscription;
  deleteSubs: Subscription;
  filterPlanners: any;
  filterSubplanners: any;
  panelOpen: false;
  aux = 'none';
  aux1 = 'block';
  ngOnInit() {

  }

  view(planner) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.direction = 'ltr';
    dialogConfig.width = '500px';
    dialogConfig.height = '400px';
    dialogConfig.data = {
      id: planner.id
    };

    this.modal.open(PlannerInfoComponent, dialogConfig);
  }

  drop(event: CdkDragDrop<any[]>) {
    console.log(event);
    moveItemInArray(this.plannerService.planners, event.previousIndex, event.currentIndex);
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
    if (this.deleteSubs) {
      this.deleteSubs.unsubscribe();
    }
  }

  filterCanceled(status) {
    this.plannerService.planners = this.plannerService.planners.filter(planners => planners.status === status);
    /*this.plannerService.planners = this.plannerService.planners.filter(planners => {
      if ( planners.status === 'Cancelado') {
        if (planners.belongsTo === 'none' ||  planners.belongsTo == null) { // se ele for pai
          this.filterPlanners = planners;
        } else if (planners.) {
          this.filterSubplanners = planners;
        }
      }
    });
    this.plannerService.planners = [...this.filterPlanners, ...this.filterSubplanners];*/
  }

  filterOnProgress() {
    this.plannerService.planners = this.plannerService.planners.filter(planners => planners.status === 'Aberto');
  }

  filterFinished() {
    this.plannerService.planners = this.plannerService.planners.filter(planners => planners.status === 'Concluído');
  }

  edit(planner) {
    console.log(planner);
    this.openBottomSheet(planner);
  }

  changeStatus(plannerData: any, type: string) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = '350px';
    matDialogConfig.height = '250px';
    matDialogConfig.data = {
      status: type,
      planner: plannerData
    };
    this.modal.open(ModalStatusComponent, matDialogConfig);
  }

  pause(planner) {
    planner.status = 'Suspendido';
    this.plannerService.updatePlanner(planner.id, planner).subscribe(
      res => {

      },
      error => console.error(error)
    );
  }

  cancel(planner) {
    planner.status = 'Cancelado';
    this.plannerService.updatePlanner(planner.id, planner).subscribe(
      res => {

      },
      error => console.error(error)
    );
  }

  create() {
    this.openBottomSheet();
  }

  delete(planner) {
    this.deleteSubs = this.plannerService.deletePlanner(planner.id).subscribe(
      res => {
        this.plannerService.openSnackBar('Plano deletado com sucesso.', 'Ok!');
        this.plannerService.getAll();
      },
      error => console.error(error)
    );
  }

  openBottomSheet(data?: any) {
    const matConfig = new MatBottomSheetConfig();
    let bottomSheetRef: any;

    if ((data !== undefined ) && ( data !== null)) {
      matConfig.data = {
        id: data.id,
        name: data.name,
        type: data.type,
        charge: data.charge,
        start: data.start,
        end: data.end,
        status: data.status,
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
