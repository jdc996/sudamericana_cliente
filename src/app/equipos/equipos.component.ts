import { Component, OnInit } from '@angular/core';
import { CiudadService } from '../services/ciudad.service';
import { Ciudad } from '../shared/ciudad';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisService } from '../services/pais.service';
import { Pais } from '../shared/pais';
import { EquipoService } from '../services/equipos.service';
import { Equipo } from '../shared/equipos';



@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss']
})
export class EquiposComponent implements OnInit {

  equipos: Equipo[];
  equipoForm: FormGroup;
  equipo: Equipo;
  actualizando: boolean=false;

  constructor(
    private paisService: EquipoService,
    private fb: FormBuilder
  ) { 
    this.createForm();
  }

  ngOnInit() {this.loadData();
  }

  createForm() {
    this.equipoForm = this.fb.group({
      Nombre:'',
      CiudadId:0,
    });

    this.equipoForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
  }
  onSubmit(){
    this.equipo=this.equipoForm.value;
    this.paisService.post('equipos/registrarEquipo',JSON.stringify(this.equipo))
    .subscribe((pais)=> {
        alert('equipo insertado con exito:'+JSON.stringify(pais));
        this.loadData();
    });
    console.log(this.equipo);
    this.equipoForm.reset();
  }

  onDelete(pais){
    this.paisService.delete('equipo',pais).subscribe(data=>{
      alert('borrado'+data);
      this.loadData();});
  }

  onSelect(pais){
    this.actualizando=true;
    this.equipoForm.setValue({
      Nombre: pais.Nombre
    });
    this.equipo=pais;
    this.equipo.Id=pais.Id;
  }

  onUpdate(){
    let tempId=this.equipo.Id;
    this.equipo=this.equipoForm.value;
    this.equipo.Id=tempId;
    console.log(JSON.stringify(this.equipo));
    this.paisService.put('equipo',JSON.stringify(this.equipo))
      .subscribe((pais)=> {
        alert('equipo actualizado con exito:'+JSON.stringify(pais));
        this.loadData();
    }); 
    this.equipoForm.reset();
    this.actualizando=false;
  }

  onValueChanged(data?: any) {
    if (!this.equipoForm) { return; }
    const form = this.equipoForm;
  }

  loadData(){
    this.paisService.get('equipo/')
    .subscribe((paises) => this.equipos=<Equipo[]>paises);
  }

}
