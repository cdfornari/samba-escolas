'use client';
import { useMutation, useQuery } from '@apollo/client';
import { Loading } from '@nextui-org/react';
import { HABILIDAD, UPDATE_HABILIDAD} from '../../../graphql';
import { useNotifications } from '../../../hooks/useNotifications';
import { Habilidad } from '../../../interfaces';
import { HabilidadForm } from '../../../components/habilidades/HabilidadForm';

export default function Page({ params }) {
  const { firePromise } = useNotifications();
  const [updateHabilidad] = useMutation(UPDATE_HABILIDAD);
  const { data, loading, error } = useQuery<{
    habilidad: Habilidad;
  }>(HABILIDAD, {
    variables: {
      habilidadId: Number(params.id),
    },
    fetchPolicy: 'network-only',
  });
  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
    );
  
  if (error) {
    console.log(error)
    return <p>Error</p>;
  }
  return (
    <HabilidadForm
      action={async (data) =>
        firePromise(
          updateHabilidad({
            variables: {
              updateHabilidadInput: {
                ...data,
                habilidadId: Number(params.id),
              },
            },
          }),
          'Habilidad actualizada'
        )
      }
      initialValues={data?.habilidad}
      buttonText="Actualizar"
    />
  );
}
