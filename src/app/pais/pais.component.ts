import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisService } from '../services/pais.service';
import { Pais } from '../shared/pais';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.scss']
})
export class PaisComponent implements OnInit {

  paises: Pais[];
  paisForm: FormGroup;
  pais: Pais;
  actualizando: boolean=false;

  constructor(
    private paisService: PaisService,
    private fb: FormBuilder
  ) { 
    this.createForm();
  }

  ngOnInit() {this.loadData();
  }

  createForm() {
    this.paisForm = this.fb.group({
      Nombre: ''
    });

    this.paisForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
  }
  onSubmit(){
    this.pais=this.paisForm.value;
    this.paisService.post('pais',JSON.stringify(this.pais))
    .subscribe((pais)=> {
        alert('pais insertado con exito:'+JSON.stringify(pais));
        this.loadData();
    });
    console.log(this.pais);
    this.paisForm.reset();
  }

  onDelete(pais){
    this.paisService.delete('pais',pais).subscribe(data=>{
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
    this.paisService.put('pais',JSON.stringify(this.pais))
      .subscribe((pais)=> {
        alert('pais actualizado con exito:'+JSON.stringify(pais));
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
    this.paisService.get('pais/')
    .subscribe((paises) => this.paises=<Pais[]>paises);
  }

}
