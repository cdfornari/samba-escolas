'use client';
import { useMutation, useQuery } from '@apollo/client';
import { Loading } from '@nextui-org/react';
import { useNotifications } from '../../../../hooks/useNotifications';
import { JURIDICO, UPDATE_JURIDICO } from '../../../../graphql';
import { Juridico } from '../../../../interfaces';
import { JuridicosForm } from '../../../../components/juridicos/JuridicosForm';

export default function Page({ params }) {
  const { firePromise } = useNotifications();
  const [updateNatural] = useMutation(UPDATE_JURIDICO);
  const { data, loading, error } = useQuery<{
    juridico: Juridico;
  }>(JURIDICO, {
    variables: {
      juridicoId: Number(params.id),
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
    <JuridicosForm
      action={async (data) =>
        firePromise(
          updateNatural({
            variables: {
              updateJuridicoInput: {
                ...data,
                id: Number(params.id),
              },
            },
          }),
          'Patrocinador actualizado'
        )
      }
      initialValues={data?.juridico}
      buttonText="Actualizar"
    />
  );
}
