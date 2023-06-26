'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { Button, Loading, Table } from '@nextui-org/react';
import { ESCOLAS } from '../../graphql';
import { PaginationType } from '../../types';
import { Escola } from '../../interfaces';
import { Pagination } from '../ui/Pagination';

export const escolaTableReducer = (columnKey: any, row: Escola) => {
  switch (columnKey) {
    case 'nombre':
      return `${row.gres ? 'GRES' : ''} ${row.nombre}`;
    case 'fecha_fundacion':
      return new Date(row.fecha_fundacion).toLocaleDateString();
    case 'direccion':
      return `${row.direccion_sede}, ${row.numero}, ${row.ciudad.nombre}, ${row.cep}`;
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
    key: 'fecha_fundacion',
    label: 'Fecha de fundación',
  },
  {
    key: 'direccion',
    label: 'Dirección',
  },
];

export const EscolasTable = () => {
  const { push } = useRouter();
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery<{
    escolas: PaginationType<Escola>;
    escolasCount: number;
  }>(ESCOLAS, {
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
        <Button auto onClick={() => push('/escola/create')}>
          Crear Escola
        </Button>
      </div>
      <div className="flex h-full flex-col justify-between">
        <Table
          bordered
          selectionMode="single"
          onSelectionChange={(selection) => {
            if (selection !== 'all' && selection.size > 0) {
              push(`/escola/${selection.values().next().value}`);
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
          <Table.Body items={data.escolas.items}>
            {(row) => (
              <Table.Row key={row.id}>
                {(columnKey) => (
                  <Table.Cell css={{ cursor: 'pointer' }}>
                    {escolaTableReducer(columnKey, row)}
                  </Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <Pagination
          page={page}
          perPage={page === 1 ? data?.escolas.items.length : 15}
          setPage={setPage}
          totalPages={data?.escolas.numberOfPages ?? 0}
          totalItems={data?.escolasCount ?? 0}
        />
      </div>
    </div>
  );
};
