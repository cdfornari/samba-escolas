'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Loading, Table, Tooltip } from '@nextui-org/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useNotifications } from '../../../../hooks/useNotifications';
import { GANADORES, REMOVE_GANADOR } from '../../../../graphql';
import { PaginationType } from '../../../../types';
import { Pagination } from '../../../../components/ui/Pagination';

export const patrocinioTableReducer = (
  columnKey: any,
  row: { year: number; premio: { nombre: string } }
) => {
  switch (columnKey) {
    case 'premio':
      return row.premio.nombre;
    default:
      return row[columnKey];
  }
};

const columns = [
  {
    key: 'year',
    label: 'Año',
  },
  {
    key: 'premio',
    label: 'Premio',
  },
  {
    key: 'actions',
    label: '',
  },
];

export default function Page({ params }) {
  const { push } = useRouter();
  const { firePromise } = useNotifications();
  const [removeGanador] = useMutation(REMOVE_GANADOR);
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useQuery<{
    ganadores: PaginationType<{
      year: number;
      premio: { nombre: string; id: number };
    }>;
    ganadoresCount: number;
  }>(GANADORES, {
    variables: {
      page,
      perPage: 10,
      idEscuela: Number(params.id),
    },
    fetchPolicy: 'network-only',
  });
  if (loading)
    return (
      <div className="w-full flex justify-center pt-10">
        <Loading size="lg" />
      </div>
    );
  if (error) return <p>{error.message}</p>;
  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-end py-6 px-10">
        <Button
          auto
          onClick={() => push(`/escola/${params.id}/premios/create`)}
        >
          Nuevo premio
        </Button>
      </div>
      <div className="flex flex-col justify-between">
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
          <Table.Body items={data.ganadores.items}>
            {(row) => (
              <Table.Row key={row.premio.id.toString() + row.year.toString()}>
                {(columnKey) =>
                  columnKey !== 'actions' ? (
                    <Table.Cell css={{ cursor: 'default' }}>
                      {patrocinioTableReducer(columnKey, row)}
                    </Table.Cell>
                  ) : (
                    <Table.Cell
                      css={{
                        cursor: 'pointer',
                        d: 'flex',
                        justifyContent: 'center',
                        gap: 10,
                      }}
                    >
                      <Tooltip
                        content="Borrar premio"
                        onClick={async () => {
                          try {
                            await firePromise(
                              removeGanador({
                                variables: {
                                  idPremio: Number(row.premio.id),
                                  year: Number(row.year),
                                },
                              }),
                              'Premio eliminado'
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
          perPage={page === 1 ? data?.ganadores.items.length : 15}
          setPage={setPage}
          totalPages={data?.ganadores.numberOfPages ?? 0}
          totalItems={data?.ganadoresCount ?? 0}
        />
      </div>
    </div>
  );
}
