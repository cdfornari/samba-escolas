'use client';
import { useMutation } from '@apollo/client';
import { CREATE_ESCOLA } from '../../../graphql';
import { useNotifications } from '../../../hooks/useNotifications';
import { EscolaForm } from '../../../components/escolas/EscolasForm';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { push } = useRouter();
  const { firePromise } = useNotifications();
  const [createEscola] = useMutation(CREATE_ESCOLA);
  return (
    <EscolaForm
      action={async (data) => {
        try {
          await firePromise(
            createEscola({
              variables: {
                createEscolaInput: data,
              },
            }),
            'Escola creada correctamente'
          );
          push('/');
        } catch (error) {}
      }}
      buttonText='Crear'
    />
  );
}
