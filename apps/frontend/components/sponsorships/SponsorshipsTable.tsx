'use client';
import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Loading, Table, Tooltip } from '@nextui-org/react';
import {
  PATROCINIOS,
  REMOVE_PATROCINIO,
  UPDATE_PATROCINIO,
} from '../../graphql';
import { PaginationType } from '../../types';
import { Pagination } from '../ui/Pagination';
import { XMarkIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useNotifications } from '../../hooks/useNotifications';
import { Patrocinio } from '../../interfaces';

export const patrocinioTableReducer = (columnKey: any, row: Patrocinio) => {
  switch (columnKey) {
    case 'fecha_inicio':
      return new Date(row.fecha_inicio).toLocaleDateString();
    case 'fecha_fin':
      return row.fecha_fin
        ? new Date(row.fecha_fin).toLocaleDateString()
        : 'Activo';
    case 'patrocinador':
      return row.patroc_juridico
        ? row.patroc_juridico.nombre
        : `
        ${row.patroc_natural.nombre1} ${row.patroc_natural.nombre2 || ''} ${
            row.patroc_natural.apellido1
          } ${row.patroc_natural.apellido2}`;
    case 'total_donaciones':
      return `${row.total_donaciones} R$`;
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
    key: 'patrocinador',
    label: 'Patrocinador',
  },
  {
    key: 'total_donaciones',
    label: 'Total recibido',
  },
  {
    key: 'actions',
    label: '',
  },
];

interface Props {
  escola: number;
}

export const PatrociniosTable: FC<Props> = ({ escola }) => {
  const { push } = useRouter();
  const { firePromise } = useNotifications();
  const [removePatrocinio] = useMutation(REMOVE_PATROCINIO);
  const [updatePatrocinio] = useMutation(UPDATE_PATROCINIO);
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useQuery<{
    patrocinios: PaginationType<Patrocinio>;
    patrociniosCount: number;
  }>(PATROCINIOS, {
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
          onClick={() => push(`/escola/${escola}/sponsorships/create`)}
        >
          Nuevo histórico
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
          <Table.Body items={data.patrocinios.items}>
            {(row) => (
              <Table.Row key={row.id}>
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
                        content="Ver donaciones"
                        onClick={async () =>
                          push(`/escola/${escola}/sponsorships/${row.id}`)
                        }
                      >
                        <EyeIcon className="h-5 w-5" />
                      </Tooltip>
                      <Tooltip
                        content="Cerrar histórico"
                        style={{ display: row.fecha_fin ? 'none' : '' }}
                        onClick={async () => {
                          await firePromise(
                            updatePatrocinio({
                              variables: {
                                updatePatricinioInput: {
                                  id: Number(row.id),
                                  fecha_fin: new Date().toString(),
                                },
                              },
                            }),
                            'Historico cerrado'
                          );
                          refetch();
                        }}
                      >
                        <XMarkIcon className="h-5 w-5 text-red-500" />
                      </Tooltip>
                      <Tooltip
                        content="Borrar histórico"
                        onClick={async () => {
                          try {
                            await firePromise(
                              removePatrocinio({
                                variables: {
                                  removePatrocinioId: Number(row.id),
                                  idEscuela: Number(escola),
                                },
                              }),
                              'Historico eliminado'
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
          perPage={page === 1 ? data?.patrocinios.items.length : 15}
          setPage={setPage}
          totalPages={data?.patrocinios.numberOfPages ?? 0}
          totalItems={data?.patrociniosCount ?? 0}
        />
      </div>
    </div>
  );
};
