'use client';
import { useMutation } from '@apollo/client';
import { PlaceForm } from '../../../components/places/PlaceForm';
import { CREATE_PLACE } from '../../../graphql';
import { useNotifications } from '../../../hooks/useNotifications';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { push } = useRouter();
  const { firePromise } = useNotifications();
  const [createLugar] = useMutation(CREATE_PLACE);
  return (
    <PlaceForm
      action={async (data) => {
        try {
          await firePromise(
            createLugar({
              variables: {
                createLugaresInput: data,
              },
            }),
            'Lugar creado correctamente'
          );
          push('/places');
        } catch (error) {}
      }}
      buttonText='Crear'
    />
  );
}
