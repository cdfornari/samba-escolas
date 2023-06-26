'use client';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { CREATE_TITULO } from '../../../../../graphql';
import { useNotifications } from '../../../../../hooks/useNotifications';
import { TitleForm } from '../../../../../components/titulos/TitlesForm';

export default function Page({ params }) {
  const { push } = useRouter();
  const { firePromise } = useNotifications();
  const [createTitulo] = useMutation(CREATE_TITULO);
  return (
    <TitleForm
      action={async (data) => {
        try {
          await firePromise(
            createTitulo({
              variables: {
                createTituloHistoryInput: {
                  ...data,
                  id_escuela: Number(params.id),
                },
              },
            }),
            'Título creado correctamente'
          );
          push(`/escola/${params.id}/titulos`);
        } catch (error) {}
      }}
      buttonText="Crear"
    />
  );
}
