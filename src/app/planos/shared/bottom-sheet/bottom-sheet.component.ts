import { InvolvedsService } from './../involveds.service';
import { TypesService } from './../types.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PlannerService } from '../planner.service';
import { Planner } from '../planner.model';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent implements OnInit, OnDestroy {

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
              private fBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private plannerService: PlannerService,
              private typesService: TypesService,
              private involvedsService: InvolvedsService) {
    this.createForm();
    this.typesService.list();
    this.involvedsService.list();
    this.plannerService.list();
  }

  form: FormGroup;
  selectedIndex = 0;
  minDate = new FormControl(new Date());
  id: string;
  subs: Subscription;
  edit = false;
  planner$: Observable<Planner>;
  types: any;

  ngOnInit() {
    this.typesService.getAll().subscribe(types => this.types = types);
    console.log(this.types);
    console.log(this.data);
    if (this.data != null) {
      this.edit = false;
      this.form.patchValue(this.data);
    } else {
      this.edit = true;
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
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
    this.bottomSheetRef.dismiss(this.data);
  }

}
