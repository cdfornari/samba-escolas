'use client';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Table } from '../ui/Table';
import { ESCOLAS } from '../../graphql';
import Loader from '../ui/Loader';
import { PaginationType } from '../../types';
import { Escola } from '../../interfaces';
import { Pagination } from '../ui/Pagination';

export const EscolasTable = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery<{
    escolas: PaginationType<Escola>;
  }>(ESCOLAS, {
    variables: {
      page,
      perPage: 10,
    },
    fetchPolicy: 'network-only',
  });
  if (loading) return <Loader />;
  if (error) return <p>Error</p>;
  return (
    <>
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
      <Pagination
        page={page}
        perPage={10}
        setPage={setPage}
        totalPages={data.escolas.numberOfPages}
      />
    </>
  );
};
