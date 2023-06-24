'use client';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { CREATE_INTEGRANTE } from '../../../graphql';
import { useNotifications } from '../../../hooks/useNotifications';
import { IntegranteForm } from '../../../components/integrantes/IntegranteForm';

export default function Page() {
  const { push } = useRouter();
  const { firePromise } = useNotifications();
  const [createIntegrante] = useMutation(CREATE_INTEGRANTE);
  return (
    <IntegranteForm
      action={async (data) => {
        try {
          await firePromise(
            createIntegrante({
              variables: {
                createIntegranteInput: data,
              },
            }),
            'Integrante creado correctamente'
          );
          push('/integrantes');
        } catch (error) {}
      }}
      buttonText='Crear'
    />
  );
}
