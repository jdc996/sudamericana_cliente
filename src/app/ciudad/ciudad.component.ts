import { Component, OnInit } from '@angular/core';
import { CiudadService } from '../services/ciudad.service';
import { Ciudad } from '../shared/ciudad';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisService } from '../services/pais.service';
import { map } from 'rxjs/operators';
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


  constructor(
    private ciudadService: CiudadService,
    private paisService: PaisService,
    private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
    this.ciudadService.get('ciudad/')
    .subscribe((ciudades) => this.ciudades=<Ciudad[]>ciudades);
    this.paisService.get('pais/')
    .subscribe((data)=>this.paises=<Pais[]>data )
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
    .subscribe((pais)=>this.ciudad.PaisId=<Pais>pais);
    this.ciudadService.post('ciudad/',this.ciudad)
    .subscribe((ciudad)=> alert('ciudad insertada con exito:'+ciudad));
    alert(this.ciudad );
  }

  onDelete(ciudad){
    this.ciudadService.delete('pais',ciudad).subscribe(data=>alert('borrado'+data));
  }

  onValueChanged(data?: any) {
    if (!this.ciudadForm) { return; }
    const form = this.ciudadForm;
  }

  

}
