'use client';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Loading, SortDescriptor, Table } from '@nextui-org/react';
import { LUGARES } from '../../graphql';
import { PaginationType } from '../../types';
import { Place } from '../../interfaces';
import { Pagination } from '../ui/Pagination';

const columns = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'nombre',
    label: 'Nombre',
  },
  {
    key: 'tipo',
    label: 'Tipo',
  },
  {
    key: 'padre',
    label: 'Pertenece a',
  },
];

export const PlacesTable = () => {
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();
  const { data, loading, error } = useQuery<{
    lugares: PaginationType<Place>;
    lugaresCount: number;
  }>(LUGARES, {
    variables: {
      page,
      perPage: 5,
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
    <>
      <Table
        bordered
        selectionMode="single"
        onSelectionChange={(row) => console.log(row)}
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
        <Table.Body
          items={data.lugares.items.map((lugar) => ({
            ...lugar,
            padre: lugar.padre?.nombre ?? 'Brasil',
          }))}
        >
          {(row) => (
            <Table.Row key={row.id}>
              {(columnKey) => (
                <Table.Cell css={{ cursor: 'pointer' }}>
                  {row[columnKey]}
                </Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <Pagination
        page={page}
        perPage={page === 1 ? data?.lugares.items.length : 5}
        setPage={setPage}
        totalPages={data?.lugares.numberOfPages ?? 0}
        totalItems={data?.lugaresCount ?? 0}
      />
    </>
  );
};
