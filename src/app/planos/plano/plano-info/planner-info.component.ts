import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';

import { PlannerService } from '../../shared/planner.service';
import { Planner } from '../../shared/planner.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-planner-info',
  templateUrl: './planner-info.component.html',
  styleUrls: ['./planner-info.component.css']
})
export class PlannerInfoComponent implements OnInit, OnDestroy {

  constructor(private plannersService: PlannerService,
              private dialogRef: MatDialogRef<PlannerInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }
  planner: Planner;
  subPlanners = 0;
  subs: Subscription;

  ngOnInit() {
    this.getPlanner();
  }

  subPlannerCount() {
    this.plannersService.planners
    .filter(planners => {
      if (planners.belongsTo === this.planner.name) {
        this.subPlanners++;
        console.log("aaa");
        console.log(this.subPlanners);
      }
    });
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  close() {
    this.dialogRef.close();
  }

  getPlanner() {
    this.plannersService.getPlanner(this.data.id).subscribe(planner => {
      this.planner = planner;
      console.log(planner);
    }, error => console.error);

    this.subPlannerCount();
  }

}
