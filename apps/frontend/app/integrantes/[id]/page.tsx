'use client';
import { useMutation, useQuery } from '@apollo/client';
import { Loading } from '@nextui-org/react';
import { INTEGRANTE, UPDATE_INTEGRANTE } from '../../../graphql';
import { Integrante } from '../../../interfaces';
import { useNotifications } from '../../../hooks/useNotifications';
import { IntegranteForm } from '../../../components/integrantes/IntegranteForm';

export default function Page({ params }) {
  const { firePromise } = useNotifications();
  const [updateIntegrante] = useMutation(UPDATE_INTEGRANTE);
  const { data, loading, error } = useQuery<{
    integrante: Integrante;
  }>(INTEGRANTE, {
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
    <IntegranteForm
      action={async (data) =>
        firePromise(
          updateIntegrante({
            variables: {
              updateIntegranteInput: {
                ...data,
                id: Number(params.id),
              }
            },
          }),
          'Integrante actualizado'
        )
      }
      initialValues={data?.integrante}
      buttonText='Actualizar'
    />
  );
}
