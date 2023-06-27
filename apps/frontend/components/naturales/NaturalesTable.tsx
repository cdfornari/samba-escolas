'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Loading, Table, Tooltip } from '@nextui-org/react';
import { NATURALES, REMOVE_NATURAL } from '../../graphql';
import { PaginationType } from '../../types';
import { Pagination } from '../ui/Pagination';
import { Natural } from '../../interfaces';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useNotifications } from '../../hooks/useNotifications';

export const naturalesTableReducer = (columnKey: any, row: Natural) => {
  switch (columnKey) {
    case 'nombre':
      return `${row.nombre1} ${row.nombre2 || ''} ${row.apellido1} ${
        row.apellido2
      }`;
    default:
      return row[columnKey];
  }
};

const columns = [
  {
    key: 'nombre',
    label: 'Nombre',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'direccion',
    label: 'Dirección',
  },
  {
    key: 'actions',
    label: '',
  },
];

export const NaturalesTable = () => {
  const { firePromise } = useNotifications();
  const { push } = useRouter();
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useQuery<{
    naturales: PaginationType<Natural>;
    naturalesCount: number;
  }>(NATURALES, {
    variables: {
      page,
      perPage: 10,
      paginate: true,
    },
    fetchPolicy: 'network-only',
  });
  const [removeNatural] = useMutation(REMOVE_NATURAL);
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
          Crear Patrocinador
        </Button>
      </div>
      <div className="flex h-full flex-col">
        <Table bordered>
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
          <Table.Body items={data.naturales.items}>
            {(row) => (
              <Table.Row key={row.id}>
                {(columnKey) =>
                  columnKey !== 'actions' ? (
                    <Table.Cell css={{ cursor: 'pointer' }}>
                      {naturalesTableReducer(columnKey, row)}
                    </Table.Cell>
                  ) : (
                    <Table.Cell
                      css={{
                        cursor: 'default',
                        d: 'flex',
                        justifyContent: 'center',
                        gap: 10,
                      }}
                    >
                      <Tooltip
                        content="Editar"
                        onClick={async () =>
                          push(`/sponsors/juridicos/${row.id}`)
                        }
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Tooltip>
                      <Tooltip
                        content="Borrar histórico"
                        onClick={async () => {
                          try {
                            await firePromise(
                              removeNatural({
                                variables: {
                                  removeNaturalId: Number(row.id),
                                },
                              }),
                              'Patrocinador eliminado'
                            );
                          } catch (error) {}
                          refetch();
                        }}
                      >
                        <TrashIcon className="h-5 w-5 text-red-500" />
                      </Tooltip>
                    </Table.Cell>
                  )
                }
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <Pagination
          page={page}
          perPage={page === 1 ? data?.naturales.items.length : 10}
          setPage={setPage}
          totalPages={data?.naturales.numberOfPages ?? 0}
          totalItems={data?.naturalesCount ?? 0}
        />
      </div>
    </div>
  );
};
