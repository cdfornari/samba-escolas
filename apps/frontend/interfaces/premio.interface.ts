import { Place } from "./place.interface";

export interface Premio {
    id: number;
    nombre: string;
    tipo: string;
    descripcion: string;
    lugar:Place;
  }
  