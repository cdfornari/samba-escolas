export interface Event {
  id: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  tipo: 'n_samba' | 'general';
  nombre: string;
  costo_unit: number;
  descripcion?: string;
  asist_total?: number;
}
