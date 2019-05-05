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
  posiciones: Posicion[];
  
  posicion: Posicion;
  actualizando: boolean=false;

  constructor(
    private paisService: PosicionService
   
  ) {}

  ngOnInit() {this.loadData();
  }

  

  loadData(){
    this.paisService.get('posicion/?sortby=Puntaje&order=desc')
    .subscribe((paises) => this.posiciones=<Posicion[]>paises);
  }


}
