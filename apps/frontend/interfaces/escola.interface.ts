import { Place } from './place.interface';

export interface Escola {
  id: number;
  nombre: string;
  descripcion?: string;
  direccion_sede: string;
  numero: number;
  cep: string;
  fecha_fundacion: Date;
  resumen_historico: string;
  gres: boolean;
  ciudad: Place;
}
