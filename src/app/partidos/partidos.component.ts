import { Component, OnInit } from '@angular/core';
import { Partidos } from '../shared/partidos';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PartidosService } from '../services/partidos.service';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.scss']
})
export class PartidosComponent implements OnInit {
  partidos: Partidos[];
  partidoForm: FormGroup;
  partido: Partidos;
  actualizando: boolean=false;

  constructor(
    private paisService: PartidosService,
    private fb: FormBuilder
  ) { 
    this.createForm();
  }

  ngOnInit() {this.loadData();
  }

  createForm() {
    this.partidoForm = this.fb.group({
      
      Fecha: '',
      EquipoLocalId: 0,
      EquipoVisitanteId:0,
      GolesLocal:0,
      GolesVisitante:0
    });

    this.partidoForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
  }
  onSubmit(){
    this.partido=this.partidoForm.value;
    this.paisService.post('partidos/registrarPartido',JSON.stringify(this.partido))
    .subscribe((pais)=> {
        alert('partido insertado con exito:'+JSON.stringify(pais));
        this.loadData();
    });
    console.log(this.partido);
    this.partidoForm.reset();
  }

  onDelete(pais){
    this.paisService.delete('partidos',pais).subscribe(data=>{
      alert('borrado'+data);
      this.loadData();});
  }

  onSelect(pais){
    this.actualizando=true;
    this.partidoForm.setValue({
      Nombre: pais.Nombre
    });
    this.partido=pais;
    this.partido.Id=pais.Id;
  }

  onUpdate(){
    let tempId=this.partido.Id;
    this.partido=this.partidoForm.value;
    this.partido.Id=tempId;
    console.log(JSON.stringify(this.partido));
    this.paisService.put('partido',JSON.stringify(this.partido))
      .subscribe((pais)=> {
        alert('partido actualizado con exito:'+JSON.stringify(pais));
        this.loadData();
    }); 
    this.partidoForm.reset();
    this.actualizando=false;
  }

  onValueChanged(data?: any) {
    if (!this.partidoForm) { return; }
    const form = this.partidoForm;
  }

  loadData(){
    this.paisService.get('partidos/')
    .subscribe((paises) => this.partidos=<Partidos[]>paises);
  }


}
