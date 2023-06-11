'use client';
import { useQuery } from '@apollo/client';
import { Table } from '../ui/Table';
import { ESCOLAS } from '../../graphql';

export const EscolasTable = () => {
  const { data, loading, error } = useQuery(ESCOLAS);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error</p>;
  return (
    <Table
      columns={['id', 'Nombre', 'Fecha de fundación']}
      rows={[
        ...data.escolas.map((escola: any) => [
          escola.id,
          escola.nombre,
          escola.fechaFundacion,
        ]),
      ]}
    />
  );
};
