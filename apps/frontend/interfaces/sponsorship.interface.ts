import { Place } from './place.interface';

export interface Natural {
  apellido1: string;
  apellido2: string;
  email: string;
  id: number;
  nombre1: string;
  nombre2?: string;
  rg: string;
}

export interface Juridico {
  cep: string;
  ciudad: Place;
  cnpj: string;
  dir: string;
  email: string;
  id: number;
  nombre: string;
  numero: number;
}

export interface Patrocinio {
  id: number;
  fecha_inicio: string;
  fecha_fin?: string;
  total_donaciones: number;
  patroc_natural?: Natural;
  patroc_juridico?: Juridico;
}
