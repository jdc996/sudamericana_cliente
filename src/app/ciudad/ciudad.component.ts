import { Component, OnInit } from '@angular/core';
import { CiudadService } from '../services/ciudad.service';
import { Ciudad } from '../shared/ciudad';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisService } from '../services/pais.service';
import { Pais } from '../shared/pais';



@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.scss']
})
export class CiudadComponent implements OnInit {

  ciudades: Ciudad[];
  paises: Pais[];
  ciudadForm: FormGroup;
  ciudad: Ciudad;
  actualizando: boolean=false;


  constructor(
    private ciudadService: CiudadService,
    private paisService: PaisService,
    private fb: FormBuilder
    ) { 
    this.createForm();
  }

  ngOnInit() {
    this.loadData();
  }
  createForm() {
    this.ciudadForm = this.fb.group({
      Nombre: '',
      Capital: false,
      PaisId: null
    });

    this.ciudadForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
  }
  onSubmit(){
    this.ciudad=this.ciudadForm.value;
    this.paisService.get('pais/?query=Id%3A'+this.ciudadForm.value.PaisId)
    .subscribe((pais)=>{this.ciudad.PaisId=<Pais>pais[0];
      this.ciudadService.post('ciudad',JSON.stringify(this.ciudad))
      .subscribe((ciudad)=> {
        alert('ciudad insertada con exito:'+JSON.stringify(ciudad));
        this.loadData();
    }); 
      
    });
    this.ciudadForm.reset();
    console.log(this.ciudad);
  }

  onDelete(ciudad){
    this.ciudadService.delete('ciudad',ciudad).subscribe(data=>{
      alert('borrado'+data);
      this.loadData();});
  }

  onSelect(ciudad){
    this.actualizando=true;
    this.ciudadForm.setValue({
      Nombre: ciudad.Nombre,
      Capital: ciudad.Capital,
      PaisId: ciudad.PaisId.Id
    });
    this.ciudad=ciudad;
    this.ciudad.Id=ciudad.Id;
  }

  onUpdate(){
    let tempId=this.ciudad.Id;
    this.ciudad=this.ciudadForm.value;
    this.ciudad.Id=tempId;
    this.paisService.get('pais/?query=Id%3A'+this.ciudadForm.value.PaisId)
    .subscribe((pais)=>{this.ciudad.PaisId=<Pais>pais[0];
      console.log(JSON.stringify(this.ciudad));
      this.ciudadService.put('ciudad',JSON.stringify(this.ciudad))
      .subscribe((ciudad)=> {
        alert('ciudad actualizada con exito:'+JSON.stringify(ciudad));
        this.loadData();
    }); 
      
    });
    this.ciudadForm.reset();
    this.actualizando=false;
  }

  onValueChanged(data?: any) {
    if (!this.ciudadForm) { return; }
    const form = this.ciudadForm;
  }

  loadData(){
    this.ciudadService.get('ciudad/')
    .subscribe((ciudades) => this.ciudades=<Ciudad[]>ciudades);
    this.paisService.get('pais/')
    .subscribe((data)=>this.paises=<Pais[]>data );
  }

  

}
