'use client';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { useNotifications } from '../../../../hooks/useNotifications';
import { NaturalForm } from '../../../../components/naturales/NaturalesForm';
import { CREATE_NATURAL } from '../../../../graphql';

export default function Page() {
  const { push } = useRouter();
  const { firePromise } = useNotifications();
  const [createNatural] = useMutation(CREATE_NATURAL);
  return (
    <NaturalForm
      action={async (data) => {
        try {
          await firePromise(
            createNatural({
              variables: {
                createNaturalesInput: data,
              },
            }),
            'Patrocinador creado correctamente'
          );
          push('/sponsors/naturales');
        } catch (error) {}
      }}
      buttonText="Crear"
    />
  );
}
