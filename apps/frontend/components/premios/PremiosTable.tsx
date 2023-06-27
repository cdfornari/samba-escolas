'use client';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Loading, Table } from '@nextui-org/react';
import { LUGARES, PREMIO, PREMIOS } from '../../graphql';
import { PaginationType } from '../../types';
import { Place, Premio } from '../../interfaces';
import { Pagination } from '../ui/Pagination';
import { useRouter } from 'next/navigation';

export const habilidadesTableReducer = (columnKey: any, row:Premio) => {
  switch (columnKey) {
    case 'nombre':
      return `${row.nombre}`;
    case 'descripcion':
      return `${row.descripcion}`;
      case 'tipo':
        return `${row.tipo === 'escola' ? 'Escuela' : 'Integrante'}`;
        case 'lugar':
        return `${row.id_lugar === 3?'Rio de Janerio' : row.id_lugar === 7?'São Paulo':row.id_lugar === 8?'Betim':row.id_lugar === 9?'Contagem':''}`;
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
    key: 'tipo',
    label: 'Tipo',
  },
  {
    key: 'descripcion',
    label: 'Descripcion',
  },
  {
    key: 'lugar',
    label: 'Lugar',
  },
  
];

export const PremiosTable = () => {
  const { push } = useRouter();
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery<{
    premios: PaginationType<Premio>;
    premiosCount: number;
  }>(PREMIOS, {
    variables: {
      page,
      perPage: 15,
      paginate: true,
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
        <Button auto onClick={() => push('/premios/create')}>
          Crear Premio
        </Button>
      </div>
      <div className="flex h-full flex-col justify-between">
        <Table
          bordered
          selectionMode="single"
          onSelectionChange={(selection) => {
            if (selection !== 'all' && selection.size > 0) {
              push(`/premios/${selection.values().next().value}`);
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
          <Table.Body
            items={data.premios.items}
          >
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
          perPage={page === 1 ? data?.premios.items.length : 15}
          setPage={setPage}
          totalPages={data?.premios.numberOfPages ?? 0}
          totalItems={data?.premiosCount ?? 0}
        />
      </div>
    </div>
  );
};
