'use client';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Loading, Table } from '@nextui-org/react';
import { LUGARES } from '../../graphql';
import { PaginationType } from '../../types';
import { Place } from '../../interfaces';
import { Pagination } from '../ui/Pagination';
import { useRouter } from 'next/navigation';

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
    key: 'padre',
    label: 'Pertenece a',
  },
];

export const PremiosTable = () => {
  const { push } = useRouter();
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery<{
    lugares: PaginationType<Place>;
    lugaresCount: number;
  }>(LUGARES, {
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
        <Button auto onClick={() => push('/places/create')}>
          Crear Lugar
        </Button>
      </div>
      <div className="flex h-full flex-col justify-between">
        <Table
          bordered
          selectionMode="single"
          onSelectionChange={(selection) => {
            if (selection !== 'all' && selection.size > 0) {
              push(`/places/${selection.values().next().value}`);
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
            items={data.lugares.items.map((lugar) => ({
              ...lugar,
              padre: lugar.padre?.nombre ?? 'Brasil',
            }))}
          >
            {(row) => (
              <Table.Row key={row.id}>
                {(columnKey) => (
                  <Table.Cell css={{ cursor: 'pointer' }}>
                    {row[columnKey]}
                  </Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <Pagination
          page={page}
          perPage={page === 1 ? data?.lugares.items.length : 15}
          setPage={setPage}
          totalPages={data?.lugares.numberOfPages ?? 0}
          totalItems={data?.lugaresCount ?? 0}
        />
      </div>
    </div>
  );
};
