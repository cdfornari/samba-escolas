'use client';
import { useMutation, useQuery } from '@apollo/client';
import { Loading } from '@nextui-org/react';
import { ESCOLA, UPDATE_ESCOLA } from '../../../graphql';
import { useNotifications } from '../../../hooks/useNotifications';
import { EscolaForm } from '../../../components/escolas/EscolasForm';
import { Escola } from '../../../interfaces';

export default function Page({ params }) {
  const { firePromise } = useNotifications();
  const [updateEscola] = useMutation(UPDATE_ESCOLA);
  const { data, loading, error } = useQuery<{
    escola: Escola;
  }>(ESCOLA, {
    variables: {
      id: Number(params.id),
    },
    fetchPolicy: 'network-only',
  });
  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
    );
  if (error) return <p>Error</p>;
  return (
    <EscolaForm
      action={async (data) =>
        firePromise(
          updateEscola({
            variables: {
              updateEscolaInput: {
                ...data,
                id: Number(params.id),
              },
            },
          }),
          'Escola actualizada'
        )
      }
      initialValues={data?.escola}
    />
  );
}
