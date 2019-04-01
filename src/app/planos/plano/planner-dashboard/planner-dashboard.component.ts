import { Component, OnInit } from '@angular/core';

import { PlannerService } from './../../shared/planner.service';
import { Planner } from '../../shared/planner.model';
@Component({
  selector: 'app-planner-dashboard',
  templateUrl: './planner-dashboard.component.html',
  styleUrls: ['./planner-dashboard.component.css']
})
export class PlannerDashboardComponent implements OnInit {

  constructor(private plannersService: PlannerService) {
    this.plannersService.getAll();
  }

  totalPlanners: any;
  totalOnProcess = 0;
  totalFinished = 0;
  totalCanceled = 0;
  totalSuspended = 0;
  totalNoData = 0;
  planners: Planner;

  ngOnInit() {
    this.totalOnProcess = 0;
    this.totalFinished = 0;
    this.totalCanceled = 0;
    this.totalSuspended = 0;
    this.totalNoData = 0;
    this.countTotal();
  }

  countTotal() {
    this.totalPlanners = this.plannersService.planners.length;
    this.plannersService.planners.map(planner => planner)
      .filter(planner => {
        if (planner.status === 'Concluído') {
          console.log(this.totalFinished);
          this.totalFinished++;
          console.log(this.totalFinished);
        } else if (planner.status === 'Cancelado') {
          this.totalCanceled++;
        } else if (planner.status === 'Aberto') {
          this.totalOnProcess++;
        } else if (planner.status === 'Aguardando início') {
          this.totalNoData++;
        } else if (planner.status === 'Suspendido') {
          this.totalSuspended++;
        } else {
          this.totalNoData++;
        }
      });
    }

}
