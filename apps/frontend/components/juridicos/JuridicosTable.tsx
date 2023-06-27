'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Loading, Table, Tooltip } from '@nextui-org/react';
import { JURIDICOS, REMOVE_JURIDICO } from '../../graphql';
import { PaginationType } from '../../types';
import { Pagination } from '../ui/Pagination';
import { Juridico } from '../../interfaces';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useNotifications } from '../../hooks/useNotifications';

export const juridicosTableReducer = (columnKey: any, row: Juridico) => {
  switch (columnKey) {
    case 'direccion':
      return `${row.dir}, ${row.numero}, ${row.ciudad.nombre}, ${row.cep}`;
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

export const JuridicosTable = () => {
  const { firePromise } = useNotifications();
  const { push } = useRouter();
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useQuery<{
    juridicos: PaginationType<Juridico>;
    juridicosCount: number;
  }>(JURIDICOS, {
    variables: {
      page,
      perPage: 10,
      paginate: true,
    },
    fetchPolicy: 'network-only',
  });
  const [removeJuridico] = useMutation(REMOVE_JURIDICO);
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
        <Button auto onClick={() => push('/sponsors/juridicos/create')}>
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
          <Table.Body items={data.juridicos.items}>
            {(row) => (
              <Table.Row key={row.id}>
                {(columnKey) =>
                  columnKey !== 'actions' ? (
                    <Table.Cell css={{ cursor: 'pointer' }}>
                      {juridicosTableReducer(columnKey, row)}
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
                              removeJuridico({
                                variables: {
                                  removeJuridicoId: Number(row.id),
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
          perPage={page === 1 ? data?.juridicos.items.length : 10}
          setPage={setPage}
          totalPages={data?.juridicos.numberOfPages ?? 0}
          totalItems={data?.juridicosCount ?? 0}
        />
      </div>
    </div>
  );
};
