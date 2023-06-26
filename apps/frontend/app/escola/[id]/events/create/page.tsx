'use client';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { CREATE_EVENT } from '../../../../../graphql';
import { useNotifications } from '../../../../../hooks/useNotifications';
import { EventForm } from '../../../../../components/events/EventForm';

export default function Page({ params }) {
  const { push } = useRouter();
  const { firePromise } = useNotifications();
  const [createEvent] = useMutation(CREATE_EVENT);
  return (
    <EventForm
      action={async (data) => {
        try {
          await firePromise(
            createEvent({
              variables: {
                createEventoInput: {
                  ...data,
                  id_escuela: Number(params.id),
                },
              },
            }),
            'Evento creado correctamente'
          );
          push(`/escola/${params.id}/events`);
        } catch (error) {}
      }}
      buttonText="Crear"
    />
  );
}
