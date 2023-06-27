'use client';
import { useMutation, useQuery } from '@apollo/client';
import { Loading } from '@nextui-org/react';
import { useNotifications } from '../../../../hooks/useNotifications';
import { NATURAL, UPDATE_NATURAL } from '../../../../graphql';
import { Natural } from '../../../../interfaces';
import { NaturalForm } from '../../../../components/naturales/NaturalesForm';

export default function Page({ params }) {
  const { firePromise } = useNotifications();
  const [updateNatural] = useMutation(UPDATE_NATURAL);
  const { data, loading, error } = useQuery<{
    natural: Natural;
  }>(NATURAL, {
    variables: {
      naturalId: Number(params.id),
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
    <NaturalForm
      action={async (data) =>
        firePromise(
          updateNatural({
            variables: {
              updateNaturalesInput: {
                ...data,
                id: Number(params.id),
              },
            },
          }),
          'Patrocinador actualizado'
        )
      }
      initialValues={data?.natural}
      buttonText="Actualizar"
    />
  );
}
