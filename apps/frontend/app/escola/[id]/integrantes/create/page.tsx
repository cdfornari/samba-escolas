'use client';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { CREATE_INTEGRANTE_HISTORY } from '../../../../../graphql';
import { useNotifications } from '../../../../../hooks/useNotifications';
import { IntegranteHistoryForm } from '../../../../../components/integrantes/IntegranteHistoryForm';

export default function Page({ params }) {
  const { push } = useRouter();
  const { firePromise } = useNotifications();
  const [createIntegranteHistory] = useMutation(CREATE_INTEGRANTE_HISTORY);
  return (
    <IntegranteHistoryForm
      action={async (data) => {
        try {
          await firePromise(
            createIntegranteHistory({
              variables: {
                createHistoricoIntegranteInput: {
                  ...data,
                  id_escuela: Number(params.id),
                },
              },
            }),
            'Histórico creado correctamente'
          );
          push(`/escola/${params.id}/integrantes`);
        } catch (error) {}
      }}
      buttonText="Crear"
    />
  );
}
