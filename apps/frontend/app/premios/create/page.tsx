'use client';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { CREATE_HABILIDAD } from '../../../graphql';
import { useNotifications } from '../../../hooks/useNotifications';
import { HabilidadForm } from '../../../components/habilidades/HabilidadForm';

export default function Page() {
  const { push } = useRouter();
  const { firePromise } = useNotifications();
  const [createHabilidad] = useMutation(CREATE_HABILIDAD);
  return (
    <HabilidadForm
      action={async (data) => {
        try {
          await firePromise(
            createHabilidad({
              variables: {
                createHabilidadInput: data,
              },
            }),
            'Habilidad creada correctamente'
          );
          push('/habilidades');
        } catch (error) {}
      }}
      buttonText="Crear"
    />
  );
}
