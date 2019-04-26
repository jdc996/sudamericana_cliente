import { Routes } from '@angular/router';
import { CiudadComponent } from '../ciudad/ciudad.component';
import { PaisComponent } from '../pais/pais.component';


export const routes: Routes = [
    { path: 'ciudad',  component: CiudadComponent },
    { path: 'pais',     component: PaisComponent },
    { path: '', redirectTo: '/ciudad', pathMatch: 'full' }
  ];