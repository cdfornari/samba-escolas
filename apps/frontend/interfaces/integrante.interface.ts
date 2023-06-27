export interface Integrante {
  id: number;
  nombre1: string;
  nombre2?: string;
  apellido1: string;
  apellido2: string;
  fecha_nacimiento: string;
  genero: 'M' | 'F';
  apodo?: string;
  nacionalidad: string;
  rg?: string;
  habilidades: {
    id: number;
    nombre: string;
    descripcion: string;
  }[];
}

export interface IntegranteHistory {
  fecha_inicio: string;
  fecha_fin?: string;
  autoridad: boolean;
  integrante: Integrante;
}
