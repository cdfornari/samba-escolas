'use client';
import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Loading,
  SortDescriptor,
  Table,
  Tooltip,
} from '@nextui-org/react';
import {
  HISTORICOS_INTEGRANTES,
  UPDATE_INTEGRANTE_HISTORY,
} from '../../graphql';
import { PaginationType } from '../../types';
import { Pagination } from '../ui/Pagination';
import { IntegranteHistory } from '../../interfaces/integrante.interface';
import { XMarkIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useNotifications } from '../../hooks/useNotifications';

export const integranteTableReducer = (
  columnKey: any,
  row: IntegranteHistory
) => {
  switch (columnKey) {
    case 'fecha_inicio':
      return new Date(row.fecha_inicio).toLocaleDateString();
    case 'fecha_fin':
      return row.fecha_fin
        ? new Date(row.fecha_fin).toLocaleDateString()
        : 'Activo';
    case 'autoridad':
      return row.autoridad ? 'Si' : 'No';
    case 'nombre':
      return `${row.integrante.nombre1} ${row.integrante.nombre2 || ''} ${
        row.integrante.apellido1
      } ${row.integrante.apellido2} ${
        row.integrante.apodo ? `(${row.integrante.apodo})` : ''
      }`;
    case 'fecha_nacimiento':
      return new Date(row.integrante.fecha_nacimiento).toLocaleDateString();
    case 'genero':
      return row.integrante.genero === 'M' ? 'Masculino' : 'Femenino';
    case 'rg':
      return `${row.integrante.rg ? row.integrante.rg : '-'}`;
    case 'nacionalidad':
      return row.integrante.nacionalidad;
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
    key: 'autoridad',
    label: 'Es autoridad',
  },
  {
    key: 'nombre',
    label: 'Nombre',
  },
  {
    key: 'fecha_nacimiento',
    label: 'Fecha de nacimiento',
  },
  {
    key: 'genero',
    label: 'Género',
  },
  {
    key: 'nacionalidad',
    label: 'Nacionalidad',
  },
  {
    key: 'rg',
    label: 'RG',
  },
  {
    key: 'actions',
    label: '',
  },
];

interface Props {
  escola: number;
}

export const IntegranteHistoriesTable: FC<Props> = ({ escola }) => {
  const { push } = useRouter();
  const { firePromise } = useNotifications();
  const [updateIntegranteHistory] = useMutation(UPDATE_INTEGRANTE_HISTORY);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();
  const { data, loading, error, refetch } = useQuery<{
    integranteHistories: PaginationType<IntegranteHistory>;
    integranteHistoriesCount: number;
  }>(HISTORICOS_INTEGRANTES, {
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
  if (error) return <p>Error</p>;
  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-end py-6 px-10">
        <Button
          auto
          onClick={() => push(`/escola/${escola}/integrantes/create`)}
        >
          Nuevo histórico
        </Button>
      </div>
      <div className="flex flex-col justify-between">
        <Table
          bordered
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
          <Table.Body items={data.integranteHistories.items}>
            {(row) => (
              <Table.Row key={row.integrante.id.toString() + row.fecha_inicio}>
                {(columnKey) =>
                  columnKey !== 'actions' ? (
                    <Table.Cell css={{ cursor: 'default' }}>
                      {integranteTableReducer(columnKey, row)}
                    </Table.Cell>
                  ) : row.fecha_fin ? (
                    <Table.Cell
                      css={{
                        cursor: 'pointer',
                        d: 'flex',
                        justifyContent: 'center',
                        gap: 10,
                      }}
                    >
                      <Tooltip
                        content="Editar autoridad"
                        onClick={async () => {
                          await firePromise(
                            updateIntegranteHistory({
                              variables: {
                                updateIntegranteHistoryInput: {
                                  fecha_inicio: row.fecha_inicio,
                                  id_escuela: escola,
                                  id_integrante: row.integrante.id,
                                  autoridad: !row.autoridad,
                                },
                              },
                            }),
                            'Historico actualizado'
                          );
                        }}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Tooltip>
                      <Tooltip
                        content="Cerrar histórico"
                        onClick={async () => {
                          await firePromise(
                            updateIntegranteHistory({
                              variables: {
                                updateIntegranteHistoryInput: {
                                  fecha_inicio: row.fecha_inicio,
                                  id_escuela: escola,
                                  id_integrante: row.integrante.id,
                                  fecha_fin: new Date(),
                                },
                              },
                            }),
                            'Historico actualizado'
                          );
                        }}
                      >
                        <XMarkIcon className="h-5 w-5 text-red-500" />
                      </Tooltip>
                    </Table.Cell>
                  ) : (
                    <Table.Cell>
                      <></>
                    </Table.Cell>
                  )
                }
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <Pagination
          page={page}
          perPage={page === 1 ? data?.integranteHistories.items.length : 15}
          setPage={setPage}
          totalPages={data?.integranteHistories.numberOfPages ?? 0}
          totalItems={data?.integranteHistoriesCount ?? 0}
        />
      </div>
    </div>
  );
};
