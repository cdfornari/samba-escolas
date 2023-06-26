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
import { REMOVE_TITULO, TITULOS } from '../../graphql';
import { PaginationType } from '../../types';
import { Pagination } from '../ui/Pagination';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useNotifications } from '../../hooks/useNotifications';
import { Titulo } from '../../interfaces';

export const tituloTableReducer = (columnKey: any, row: Titulo) => {
  switch (columnKey) {
    case 'monto':
      return row.monto ? `${row.monto} R$` : '-';
    case 'grupo':
      return row.grupo ?? '-';
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
    key: 'grupo',
    label: 'Grupo',
  },
  {
    key: 'monto',
    label: 'Monto obtenido',
  },
  {
    key: 'actions',
    label: '',
  },
];

interface Props {
  escola: number;
}

export const TitlesTable: FC<Props> = ({ escola }) => {
  const { push } = useRouter();
  const { firePromise } = useNotifications();
  const [removeTitulo] = useMutation(REMOVE_TITULO);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();
  const { data, loading, error, refetch } = useQuery<{
    titulos: PaginationType<Titulo>;
    titulosCount: number;
  }>(TITULOS, {
    variables: {
      page,
      perPage: 10,
      idEscuela: Number(escola),
      paginate: true,
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
          <Table.Body items={data.titulos.items}>
            {(row) => (
              <Table.Row key={row.year}>
                {(columnKey) =>
                  columnKey !== 'actions' ? (
                    <Table.Cell css={{ cursor: 'default' }}>
                      {tituloTableReducer(columnKey, row)}
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
                        content="Borrar Título"
                        onClick={async () => {
                          try {
                            await firePromise(
                              removeTitulo({
                                variables: {
                                  year: row.year,
                                  idEscuela: Number(escola),
                                },
                              }),
                              'Título eliminado'
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
          perPage={page === 1 ? data?.titulos.items.length : 15}
          setPage={setPage}
          totalPages={data?.titulos.numberOfPages ?? 0}
          totalItems={data?.titulosCount ?? 0}
        />
      </div>
    </div>
  );
};
