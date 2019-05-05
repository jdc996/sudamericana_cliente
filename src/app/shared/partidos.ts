import { Time } from '@angular/common';

export class Partidos {
    Id: number;
    Fecha: Time;
    EquipoLocalId: number;
    EquipoVisitanteId:number;
    GolesLocal:number;
    GolesVisitante:number;
}