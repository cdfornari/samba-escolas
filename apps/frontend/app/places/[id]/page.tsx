'use client';
import { useMutation, useQuery } from '@apollo/client';
import { Loading } from '@nextui-org/react';
import { PlaceForm } from '../../../components/places/PlaceForm';
import { LUGAR, UPDATE_PLACE } from '../../../graphql';
import { Place } from '../../../interfaces';
import { useNotifications } from '../../../hooks/useNotifications';

export default function Page({ params }) {
  const { firePromise } = useNotifications();
  const [updatePlace] = useMutation(UPDATE_PLACE);
  const { data, loading, error } = useQuery<{
    lugar: Place;
  }>(LUGAR, {
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
    <PlaceForm
      action={async (data) =>
        firePromise(
          updatePlace({
            variables: {
              updateLugaresInput: {
                ...data,
                id: Number(params.id),
              }
            },
          }),
          'Lugar actualizado'
        )
      }
      initialValues={data?.lugar}
    />
  );
}
