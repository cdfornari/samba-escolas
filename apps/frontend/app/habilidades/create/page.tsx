'use client';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { CREATE_HABILIDAD } from '../../../graphql';
import { useNotifications } from '../../../hooks/useNotifications';
import { HabilidadForm } from '../../../components/habilidades/HabilidadForm';

export default function Page() {
  const { push } = useRouter();
  const { firePromise } = useNotifications();
  const [createRole] = useMutation(CREATE_HABILIDAD);
  return (
    <HabilidadForm
      action={async (data) => {
        try {
          await firePromise(
            createRole({
              variables: {
                createRoleInput: data,
              },
            }),
            'Habilida creada correctamente'
          );
          push('/roles');
        } catch (error) {}
      }}
      buttonText="Crear"
    />
  );
}
