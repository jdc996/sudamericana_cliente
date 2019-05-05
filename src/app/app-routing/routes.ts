import { Routes } from '@angular/router';
import { CiudadComponent } from '../ciudad/ciudad.component';
import { PaisComponent } from '../pais/pais.component';
import { PartidosComponent } from '../partidos/partidos.component';
import { PosicionComponent } from '../posicion/posicion.component';


export const routes: Routes = [
    { path: 'ciudad',   component: CiudadComponent },
    { path: 'pais',     component: PaisComponent },
    { path: 'partidos', component: PartidosComponent },
    { path: 'posicion', component: PosicionComponent },
    { path: '', redirectTo: '/ciudad', pathMatch: 'full' }
  ];