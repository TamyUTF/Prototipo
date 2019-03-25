import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';

import { ModalFormComponent } from './../../shared/modal/modal-form.component';
import { PlannerService } from './../../shared/planner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit, OnDestroy {

  constructor(private modal: MatDialog,
              private plannerService: PlannerService,
              private router: Router) { }
  subs: Subscription;
  ngOnInit() {
    this.plannerService.list();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  edit(planner) {
    this.router.navigate([`planner/${planner.id}/edit`]);
    this.openModal(planner);
  }

  new() {
    this.router.navigate(['new']);
    this.openModal(null);
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
