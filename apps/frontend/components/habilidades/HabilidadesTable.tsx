'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { Button, Loading, Table } from '@nextui-org/react';
import { HABILIDADES } from '../../graphql';
import { PaginationType } from '../../types';
import { Pagination } from '../ui/Pagination';
import { Habilidad } from '../../interfaces';

export const habilidadesTableReducer = (columnKey: any, row: Habilidad) => {
  switch (columnKey) {
    case 'nombre':
      return `${row.nombre}`;
    case 'descripcion':
      return `${row.descripcion}`;
    default:
      return row[columnKey];
  }
};

const columns = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'nombre',
    label: 'Nombre',
  },
  {
    key: 'descripcion',
    label: 'Descripcion',
  },
];

export const HabilidadesTable = () => {
  const { push } = useRouter();
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery<{
    habilidades: PaginationType<Habilidad>;
    habilidadCount: number;
  }>(HABILIDADES, {
    variables: {
      page,
      perPage: 15,
    },
    fetchPolicy: 'network-only',
  });
  if (loading)
    return (
      <div className="w-full flex justify-center pt-10">
        <Loading size="lg" />
      </div>
    );
  if (error) return <p>Error</p>;
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex justify-end py-6 px-10">
        <Button auto onClick={() => push('/habilidades/create')}>
          Crear Habilidad
        </Button>
      </div>
      <div className="flex h-full flex-col justify-between">
        <Table
          bordered
          selectionMode="single"
          onSelectionChange={(selection) => {
            if (selection !== 'all' && selection.size > 0) {
              push(`/habilidades/${selection.values().next().value}`);
            }
          }}
        >
          <Table.Header>
            {columns.map((column) => (
              <Table.Column
                key={column.key}
                css={{
                  '& > svg': {
                    right: 10,
                  },
                }}
              >
                {column.label}
              </Table.Column>
            ))}
          </Table.Header>
          <Table.Body items={data.habilidades.items}>
            {(row) => (
              <Table.Row key={row.id}>
                {(columnKey) => (
                  <Table.Cell css={{ cursor: 'pointer' }}>
                    {habilidadesTableReducer(columnKey, row)}
                  </Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <Pagination
          page={page}
          perPage={page === 1 ? data?.habilidades.items.length : 15}
          setPage={setPage}
          totalPages={data?.habilidades.numberOfPages ?? 0}
          totalItems={data?.habilidadCount ?? 0}
        />
      </div>
    </div>
  );
};
