import { PlaceType } from '../types';

export interface Place {
  id: number;
  nombre: string;
  tipo: PlaceType;
  padre?: Place;
}
