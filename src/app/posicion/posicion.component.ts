import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Posicion } from '../shared/posicion';
import { PosicionService } from '../services/posicion.service';

@Component({
  selector: 'app-posicion',
  templateUrl: './posicion.component.html',
  styleUrls: ['./posicion.component.scss']
})
export class PosicionComponent implements OnInit {
  paises: Posicion[];
  paisForm: FormGroup;
  pais: Posicion;
  actualizando: boolean=false;

  constructor(
    private paisService: PosicionService,
    private fb: FormBuilder
  ) { 
    this.createForm();
  }

  ngOnInit() {this.loadData();
  }

  createForm() {
    this.paisForm = this.fb.group({
      
      Fecha: '',
      EquipoLocalId: 0,
      EquipoVisitanteId:0,
      GolesLocal:0,
      GolesVisitante:0
    });

    this.paisForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
  }
  onValueChanged(data?: any) {
    if (!this.paisForm) { return; }
    const form = this.paisForm;
  }

  loadData(){
    this.paisService.get('posicion/?sortby=Puntaje&order=desc')
    .subscribe((paises) => this.paises=<Posicion[]>paises);
  }


}
