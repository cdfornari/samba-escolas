'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { Button, Loading, SortDescriptor, Table } from '@nextui-org/react';
import { ESCOLAS } from '../../graphql';
import { PaginationType } from '../../types';
import { Escola } from '../../interfaces';
import { Pagination } from '../ui/Pagination';

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
];

export const EscolasTable = () => {
  const { push } = useRouter();
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();
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
          <Table.Body
            items={data.escolas.items.map((escola) => ({
              ...escola,
              fecha_fundacion: new Date(
                escola.fecha_fundacion
              ).toLocaleDateString(),
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
          perPage={page === 1 ? data?.escolas.items.length : 15}
          setPage={setPage}
          totalPages={data?.escolas.numberOfPages ?? 0}
          totalItems={data?.escolasCount ?? 0}
        />
      </div>
    </div>
  );
};
