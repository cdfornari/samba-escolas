'use client';
import { useMutation, useQuery } from '@apollo/client';
import { Loading } from '@nextui-org/react';
import { useNotifications } from '../../../../../hooks/useNotifications';
import { EVENT, UPDATE_EVENT } from '../../../../../graphql';
import { EventForm } from '../../../../../components/events/EventForm';
import { Event } from '../../../../../interfaces';

export default function Page({ params }) {
  const { firePromise } = useNotifications();
  const [updateEvento] = useMutation(UPDATE_EVENT);
  const { data, loading, error } = useQuery<{
    evento: Event;
  }>(EVENT, {
    variables: {
      eventoId: Number(params.event),
    },
    fetchPolicy: 'network-only',
  });
  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
    );
  if (error) return <p>{error.message}</p>;
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
      initialValues={data?.evento}
      buttonText="Actualizar"
    />
  );
}
