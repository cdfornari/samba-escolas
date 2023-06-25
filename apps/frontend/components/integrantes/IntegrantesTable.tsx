'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { Button, Loading, SortDescriptor, Table } from '@nextui-org/react';
import { INTEGRANTES } from '../../graphql';
import { PaginationType } from '../../types';
import { Pagination } from '../ui/Pagination';
import { Integrante } from '../../interfaces/integrante.interface';

export const integranteTableReducer = (columnKey: any, row: Integrante) => {
  switch (columnKey) {
    case 'nombre':
      return `${row.nombre1} ${row.nombre2 || ''} ${row.apellido1} ${
        row.apellido2
      } ${row.apodo ? `(${row.apodo})` : ''}`;
    case 'genero':
      return row.genero === 'M' ? 'Masculino' : 'Femenino';
    case 'rg':
      return `${row.rg ? row.rg : '-'}`;
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
    key: 'fecha_nacimiento',
    label: 'Fecha de nacimiento',
  },
  {
    key: 'genero',
    label: 'Género',
  },
  {
    key: 'nacionalidad',
    label: 'Nacionalidad',
  },
  {
    key: 'rg',
    label: 'RG',
  },
];

export const IntegrantesTable = () => {
  const { push } = useRouter();
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();
  const { data, loading, error } = useQuery<{
    integrantes: PaginationType<Integrante>;
    integrantesCount: number;
  }>(INTEGRANTES, {
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
        <Button auto onClick={() => push('/integrantes/create')}>
          Crear Integrante
        </Button>
      </div>
      <div className="flex h-full flex-col justify-between">
        <Table
          bordered
          selectionMode="single"
          onSelectionChange={(selection) => {
            if (selection !== 'all' && selection.size > 0) {
              push(`/integrantes/${selection.values().next().value}`);
            }
          }}
          onSortChange={(descriptor: SortDescriptor) =>
            setSortDescriptor(descriptor)
          }
          sortDescriptor={sortDescriptor}
        >
          <Table.Header>
            {columns.map((column) => (
              <Table.Column
                key={column.key}
                allowsSorting
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
          <Table.Body items={data.integrantes.items}>
            {(row) => (
              <Table.Row key={row.id}>
                {(columnKey) => (
                  <Table.Cell css={{ cursor: 'pointer' }}>
                    {integranteTableReducer(columnKey, row)}
                  </Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <Pagination
          page={page}
          perPage={page === 1 ? data?.integrantes.items.length : 15}
          setPage={setPage}
          totalPages={data?.integrantes.numberOfPages ?? 0}
          totalItems={data?.integrantesCount ?? 0}
        />
      </div>
    </div>
  );
};
