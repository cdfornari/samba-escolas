'use client';
import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Loading, Table, Tooltip } from '@nextui-org/react';
import { DONACIONES, REMOVE_DONACION } from '../../graphql';
import { PaginationType } from '../../types';
import { Pagination } from '../ui/Pagination';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useNotifications } from '../../hooks/useNotifications';
import { Patrocinio } from '../../interfaces';

export const donacionTableReducer = (
  columnKey: any,
  row: { fecha: Date; monto: number; id: number }
) => {
  switch (columnKey) {
    case 'fecha':
      return new Date(row.fecha).toLocaleDateString();
    case 'monto':
      return `${row.monto} R$`;
    default:
      return row[columnKey];
  }
};

const columns = [
  {
    key: 'fecha',
    label: 'Fecha',
  },
  {
    key: 'monto',
    label: 'Monto',
  },
  {
    key: 'actions',
    label: '',
  },
];

interface Props {
  escola: number;
  patrocinio: number;
}

export const DonacionesTable: FC<Props> = ({ escola, patrocinio }) => {
  const { push } = useRouter();
  const { firePromise } = useNotifications();
  const [removeDonacion] = useMutation(REMOVE_DONACION);
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useQuery<{
    donaciones: PaginationType<{ fecha: Date; monto: number; id: number }>;
    donacionesCount: number;
  }>(DONACIONES, {
    variables: {
      page,
      perPage: 10,
      idEscuela: Number(escola),
      idPatroc: Number(patrocinio),
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
          onClick={() =>
            push(`/escola/${escola}/sponsorships/${patrocinio}/create`)
          }
        >
          Nueva donacion
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
          <Table.Body items={data.donaciones.items}>
            {(row) => (
              <Table.Row key={row.id}>
                {(columnKey) =>
                  columnKey !== 'actions' ? (
                    <Table.Cell css={{ cursor: 'default' }}>
                      {donacionTableReducer(columnKey, row)}
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
                        content="Borrar donación"
                        onClick={async () => {
                          try {
                            await firePromise(
                              removeDonacion({
                                variables: {
                                  removeDonacionId: Number(row.id),
                                  idEscuela: Number(escola),
                                  idPatroc: Number(patrocinio),
                                },
                              }),
                              'Donacion eliminada'
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
          perPage={page === 1 ? data?.donaciones.items.length : 15}
          setPage={setPage}
          totalPages={data?.donaciones.numberOfPages ?? 0}
          totalItems={data?.donacionesCount ?? 0}
        />
      </div>
    </div>
  );
};
