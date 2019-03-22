import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';

import { Planner } from '../../shared/planner.model';
import { ModalFormComponent } from './../../shared/modal/modal-form.component';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {


  constructor(private modal: MatDialog) { }

  ngOnInit() {
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.direction = 'ltr';
    dialogConfig.width = '700px';
    dialogConfig.height = '500px';
    /*dialogConfig.data = {
      id: planner.id,
      name: planner.name,
      types: planner.types,
      charge: planner.charge,
      start: planner.start,
      end: planner.end
      attachment: planner.attachment,
      details: {
        description: planner.description,
        involveds: planner.involveds,
        price: planner.price
      }
    } */
    this.modal.open(ModalFormComponent, dialogConfig);
  }

}
