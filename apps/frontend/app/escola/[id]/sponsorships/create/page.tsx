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
                  fecha_inicio: data.fecha_inicio,
                  fecha_fin: data.fecha_fin,
                  id_jur: data.patroc_jur,
                  id_nat: data.patroc_nat,
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
