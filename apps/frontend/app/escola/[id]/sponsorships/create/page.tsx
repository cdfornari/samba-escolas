'use client';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { CREATE_PATROCINIO } from '../../../../../graphql';
import { useNotifications } from '../../../../../hooks/useNotifications';
import { SponsorshipForm } from '../../../../../components/sponsoships/SponsorshipForm';

export default function Page({ params }) {
  const { push } = useRouter();
  const { firePromise } = useNotifications();
  const [createPatrocinio] = useMutation(CREATE_PATROCINIO);
  return (
    <SponsorshipForm
      action={async (data) => {
        try {
          await firePromise(
            createPatrocinio({
              variables: {
                createPatrocinioInput: {
                  ...data,
                  id_escuela: Number(params.id),
                },
              },
            }),
            'Histórico creado correctamente'
          );
          push(`/escola/${params.id}/sponsorships`);
        } catch (error) {}
      }}
      buttonText="Crear"
    />
  );
}
