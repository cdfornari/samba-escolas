'use client';
import { useMutation, useQuery } from '@apollo/client';
import { Loading } from '@nextui-org/react';
import { useNotifications } from '../../../../../hooks/useNotifications';
import { EVENT, UPDATE_EVENT } from '../../../../../graphql';
import { Event } from '../../../../../interfaces';
import { EventForm } from '../../../../../components/events/EventForm';

export default function Page({ params }) {
  const { firePromise } = useNotifications();
  const [updateEvento] = useMutation(UPDATE_EVENT);
  const { data, loading, error } = useQuery<{
    escola: Event;
  }>(EVENT, {
    variables: {
      eventoId: Number(params.id),
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
    <EventForm
      action={async (data) =>
        firePromise(
          updateEvento({
            variables: {
              updateEventoInput: {
                ...data,
                id: Number(params.id),
              },
            },
          }),
          'Evento actualizado'
        )
      }
      initialValues={data?.escola}
      buttonText="Actualizar"
    />
  );
}
