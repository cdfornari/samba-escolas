'use client';
import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Loading, Table, Tooltip } from '@nextui-org/react';
import { EVENTS, REMOVE_EVENT } from '../../graphql';
import { PaginationType } from '../../types';
import { Pagination } from '../ui/Pagination';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useNotifications } from '../../hooks/useNotifications';
import { Event } from '../../interfaces';

export const eventTableReducer = (columnKey: any, row: Event) => {
  switch (columnKey) {
    case 'fecha_inicio':
      return new Date(row.fecha_inicio).toLocaleDateString();
    case 'fecha_fin':
      return new Date(row.fecha_fin).toLocaleDateString();
    case 'tipo':
      return row.tipo === 'n_samba' ? 'Noche de Samba' : 'General';
    case 'asist_total':
      return row.asist_total ? row.asist_total : 'No registrado';
    default:
      return row[columnKey];
  }
};

const columns = [
  {
    key: 'fecha_inicio',
    label: 'Fecha de inicio',
  },
  {
    key: 'fecha_fin',
    label: 'Fecha de fin',
  },
  {
    key: 'nombre',
    label: 'Nombre',
  },
  {
    key: 'tipo',
    label: 'Tipo de evento',
  },
  {
    key: 'costo_unit',
    label: 'Costo unitario',
  },
  {
    key: 'asist_total',
    label: 'Asistencia total',
  },
  {
    key: 'actions',
    label: '',
  }
];

interface Props {
  escola: number;
}

export const EventsTable: FC<Props> = ({ escola }) => {
  const { push } = useRouter();
  const { firePromise } = useNotifications();
  const [removeEvent] = useMutation(REMOVE_EVENT);
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useQuery<{
    eventos: PaginationType<Event>;
    eventoCount: number;
  }>(EVENTS, {
    variables: {
      page,
      perPage: 10,
      idEscuela: Number(escola),
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
          onClick={() => push(`/escola/${escola}/events/create`)}
        >
          Crear Evento
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
          <Table.Body items={data.eventos.items}>
            {(row) => (
              <Table.Row key={row.id}>
                {(columnKey) =>
                  columnKey !== 'actions' ? (
                    <Table.Cell css={{ cursor: 'default' }}>
                      {eventTableReducer(columnKey, row)}
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
                        content="Editar"
                        onClick={() => {
                          push(`/escola/${escola}/events/${row.id}`);
                        }}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Tooltip>
                      <Tooltip
                        content="Borrar evento"
                        onClick={async () => {
                          try {
                            await firePromise(
                              removeEvent({
                                variables: {
                                  removeEventoId: row.id,
                                },
                              }),
                              'Evento eliminado'
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
          perPage={page === 1 ? data?.eventos.items.length : 15}
          setPage={setPage}
          totalPages={data?.eventos.numberOfPages ?? 0}
          totalItems={data?.eventoCount ?? 0}
        />
      </div>
    </div>
  );
};
