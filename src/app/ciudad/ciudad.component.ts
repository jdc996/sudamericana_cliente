import { Component, OnInit } from '@angular/core';
import { CiudadService } from '../services/ciudad.service';
import { Ciudad } from '../shared/ciudad';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.scss']
})
export class CiudadComponent implements OnInit {

  ciudades: Ciudad[];
  ciudadForm: FormGroup;
  ciudad: Ciudad;


  constructor(private ciudadService: CiudadService,private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
    this.ciudadService.get('/ciudad')
    .subscribe((ciudades) => this.ciudades=<Ciudad[]>ciudades)
  }
  createForm() {
    this.ciudadForm = this.fb.group({
      nombre: '',
      capital: false,
      idpais: null
    });

    this.ciudadForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
  }
  onSubmit(){
    this.ciudad=this.ciudadForm.value;
    alert(this.ciudad );
  }
  onValueChanged(data?: any) {
    if (!this.ciudadForm) { return; }
    const form = this.ciudadForm;
  }

  

}
