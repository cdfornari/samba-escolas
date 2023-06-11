'use client';
import { useQuery } from '@apollo/client';
import { Table } from '../ui/Table';
import { ESCOLAS } from '../../graphql';
import Loader from '../ui/Loader';

export const EscolasTable = () => {
  const { data, loading, error } = useQuery(ESCOLAS);
  if (loading) return <Loader />;
  if (error) return <p>Error</p>;
  return (
    <Table
      columns={['id', 'Nombre', 'Fecha de fundación']}
      rows={[
        ...data.escolas.items.map((escola: any) => [
          escola.id,
          escola.nombre,
          new Date(escola.fecha_fundacion).toLocaleDateString(),
        ]),
      ]}
    />
  );
};
