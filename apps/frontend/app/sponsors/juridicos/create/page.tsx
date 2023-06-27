'use client';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { useNotifications } from '../../../../hooks/useNotifications';
import { CREATE_JURIDICO } from '../../../../graphql';
import { JuridicosForm } from '../../../../components/juridicos/JuridicosForm';

export default function Page() {
  const { push } = useRouter();
  const { firePromise } = useNotifications();
  const [createJuridico] = useMutation(CREATE_JURIDICO);
  return (
    <JuridicosForm
      action={async (data) => {
        try {
          await firePromise(
            createJuridico({
              variables: {
                createJuridicoInput: data,
              },
            }),
            'Patrocinador creado correctamente'
          );
          push('/sponsors/juridicos');
        } catch (error) {}
      }}
      buttonText="Crear"
    />
  );
}
