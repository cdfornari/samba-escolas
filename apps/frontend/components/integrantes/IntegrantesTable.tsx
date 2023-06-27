'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Loading, Table, Tooltip } from '@nextui-org/react';
import { INTEGRANTES, REMOVE_INTEGRANTE } from '../../graphql';
import { PaginationType } from '../../types';
import { Pagination } from '../ui/Pagination';
import { Integrante } from '../../interfaces/integrante.interface';
import { useNotifications } from '../../hooks/useNotifications';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export const integranteTableReducer = (columnKey: any, row: Integrante) => {
  switch (columnKey) {
    case 'nombre':
      return `${row.nombre1} ${row.nombre2 || ''} ${row.apellido1} ${
        row.apellido2
      } ${row.apodo ? `(${row.apodo})` : ''}`;
    case 'genero':
      return row.genero === 'M' ? 'Masculino' : 'Femenino';
    case 'rg':
      return `${row.rg ? row.rg : '-'}`;
    case 'fecha_nacimiento':
      return new Date(row.fecha_nacimiento).toLocaleDateString();
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

export const IntegrantesTable = () => {
  const { firePromise } = useNotifications();
  const { push } = useRouter();
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useQuery<{
    integrantes: PaginationType<Integrante>;
    integrantesCount: number;
  }>(INTEGRANTES, {
    variables: {
      page,
      perPage: 15,
    },
    fetchPolicy: 'network-only',
  });
  const [removeIntegrante] = useMutation(REMOVE_INTEGRANTE);
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
          Crear Integrante
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
          <Table.Body items={data.integrantes.items}>
            {(row) => (
              <Table.Row key={row.id}>
                {(columnKey) =>
                  columnKey !== 'actions' ? (
                    <Table.Cell css={{ cursor: 'pointer' }}>
                      {integranteTableReducer(columnKey, row)}
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
                        onClick={async () => push(`/integrantes/${row.id}`)}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Tooltip>
                      <Tooltip
                        content="Borrar integrante"
                        onClick={async () => {
                          try {
                            await firePromise(
                              removeIntegrante({
                                variables: {
                                  removeIntegranteId: Number(row.id),
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
          perPage={page === 1 ? data?.integrantes.items.length : 15}
          setPage={setPage}
          totalPages={data?.integrantes.numberOfPages ?? 0}
          totalItems={data?.integrantesCount ?? 0}
        />
      </div>
    </div>
  );
};
