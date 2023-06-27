'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Loading, Table, Tooltip } from '@nextui-org/react';
import { ESCOLAS, REMOVE_ESCOLA } from '../../graphql';
import { PaginationType } from '../../types';
import { Escola } from '../../interfaces';
import { Pagination } from '../ui/Pagination';
import { useNotifications } from '../../hooks/useNotifications';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

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
  {
    key: 'actions',
    label: '',
  },
];

export const EscolasTable = () => {
  const { firePromise } = useNotifications();
  const { push } = useRouter();
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useQuery<{
    escolas: PaginationType<Escola>;
    escolasCount: number;
  }>(ESCOLAS, {
    variables: {
      page,
      perPage: 15,
    },
    fetchPolicy: 'network-only',
  });
  const [removeEscola] = useMutation(REMOVE_ESCOLA);
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
          <Table.Body items={data.escolas.items}>
            {(row) => (
              <Table.Row key={row.id}>
                {(columnKey) =>
                  columnKey !== 'actions' ? (
                    <Table.Cell css={{ cursor: 'default' }}>
                      {escolaTableReducer(columnKey, row)}
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
                        onClick={async () => push(`/escola/${row.id}`)}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Tooltip>
                      <Tooltip
                        content="Borrar escuela"
                        onClick={async () => {
                          try {
                            await firePromise(
                              removeEscola({
                                variables: {
                                  removeEscolaId: Number(row.id),
                                },
                              }),
                              'Escuela eliminada'
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
          perPage={page === 1 ? data?.escolas.items.length : 15}
          setPage={setPage}
          totalPages={data?.escolas.numberOfPages ?? 0}
          totalItems={data?.escolasCount ?? 0}
        />
      </div>
    </div>
  );
};
