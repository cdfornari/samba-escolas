'use client';
import { useMutation, useQuery } from '@apollo/client';
import { Loading } from '@nextui-org/react';
import { LUGAR, PREMIO, UPDATE_PREMIO } from '../../../graphql';
import { Premio } from '../../../interfaces';
import { useNotifications } from '../../../hooks/useNotifications';
import { PremioForm } from '../../../components/premios/PremioForm';

export default function Page({ params }) {
  const { firePromise } = useNotifications();
  const [updatePlace] = useMutation(UPDATE_PREMIO);
  const { data, loading, error } = useQuery<{
    premio: Premio;
  }>(PREMIO, {
    variables: {
      premioId: Number(params.id),
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
    <PremioForm
      action={async (data) =>
        firePromise(
          updatePlace({
            variables: {
              updatePremioInput: {
                ...data,
                id: Number(params.id),
              }
            },
          }),
          'Premio actualizado'
        )
      }
      initialValues={data?.premio}
      buttonText='Actualizar'
    />
  );
}
