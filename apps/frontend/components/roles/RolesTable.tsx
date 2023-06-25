'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { Button, Loading, SortDescriptor, Table } from '@nextui-org/react';
import { ROLES } from '../../graphql';
import { PaginationType } from '../../types';
import { Pagination } from '../ui/Pagination';
import { Roles } from '../../interfaces/roles.interface';

export const rolesTableReducer = (columnKey: any, row: Roles) => {
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

export const RolesTable = () => {
  const { push } = useRouter();
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();
  const { data, loading, error } = useQuery<{
    roles: PaginationType<Roles>;
    rolesCount: number;
  }>(ROLES, {
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
        <Button auto onClick={() => push('/roles/create')}>
          Crear Roles
        </Button>
      </div>
      <div className="flex h-full flex-col justify-between">
        <Table
          bordered
          selectionMode="single"
          onSelectionChange={(selection) => {
            if (selection !== 'all' && selection.size > 0) {
              push(`/roles/${selection.values().next().value}`);
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
          <Table.Body items={data.roles.items}>
            {(row) => (
              <Table.Row key={row.id}>
                {(columnKey) => (
                  <Table.Cell css={{ cursor: 'pointer' }}>
                    {rolesTableReducer(columnKey, row)}
                  </Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <Pagination
          page={page}
          perPage={page === 1 ? data?.roles.items.length : 15}
          setPage={setPage}
          totalPages={data?.roles.numberOfPages ?? 0}
          totalItems={data?.rolesCount ?? 0}
        />
      </div>
    </div>
  );
};
