import { Place } from "./place.interface";

export interface Premio {
    id: number;
    nombre: string;
    tipo: 'integrante' | 'escola' ;
    descripcion: string;
    lugar:Place;
  }
  