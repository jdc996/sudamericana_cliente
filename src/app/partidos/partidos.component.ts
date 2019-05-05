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
  paises: Partidos[];
  paisForm: FormGroup;
  pais: Partidos;
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
  onSubmit(){
    this.pais=this.paisForm.value;
    this.paisService.post('partidos/registrarPartido',JSON.stringify(this.pais))
    .subscribe((pais)=> {
        alert('partido insertado con exito:'+JSON.stringify(pais));
        this.loadData();
    });
    console.log(this.pais);
    this.paisForm.reset();
  }

  onDelete(pais){
    this.paisService.delete('partidos',pais).subscribe(data=>{
      alert('borrado'+data);
      this.loadData();});
  }

  onSelect(pais){
    this.actualizando=true;
    this.paisForm.setValue({
      Nombre: pais.Nombre
    });
    this.pais=pais;
    this.pais.Id=pais.Id;
  }

  onUpdate(){
    let tempId=this.pais.Id;
    this.pais=this.paisForm.value;
    this.pais.Id=tempId;
    console.log(JSON.stringify(this.pais));
    this.paisService.put('partido',JSON.stringify(this.pais))
      .subscribe((pais)=> {
        alert('partido actualizado con exito:'+JSON.stringify(pais));
        this.loadData();
    }); 
    this.paisForm.reset();
    this.actualizando=false;
  }

  onValueChanged(data?: any) {
    if (!this.paisForm) { return; }
    const form = this.paisForm;
  }

  loadData(){
    this.paisService.get('partidos/')
    .subscribe((paises) => this.paises=<Partidos[]>paises);
  }


}
