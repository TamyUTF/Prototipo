import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {

  planner = {nome: 'Plano 1',
            tipos: ['tipo 1', 'tipo 2'],
            resposavel: 'Responsável 1',
            inicio: Date,
            fim: Date,
            pertence: '',
            detalhe: {
              descricao: '',
              interessados: [ ],
              custos: ''
            }
  };
  constructor() { }

  ngOnInit() {
  }


}
