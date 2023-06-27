'use client';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { DonacionesForm } from '../../../../../../components/sponsorships/DonacionesForm';
import { CREATE_DONACION } from '../../../../../../graphql';
import { useNotifications } from '../../../../../../hooks/useNotifications';

export default function Page({ params }) {
  const { push } = useRouter();
  const { firePromise } = useNotifications();
  const [createDonacion] = useMutation(CREATE_DONACION);
  return (
    <DonacionesForm
      action={async (data) => {
        try {
          await firePromise(
            createDonacion({
              variables: {
                createDonacionInput: {
                  ...data,
                  id_escuela: Number(params.id),
                  id_patroc: Number(params.s),
                },
              },
            }),
            'Donación creada correctamente'
          );
          push(`/escola/${params.id}/sponsorships/${params.s}`);
        } catch (error) {}
      }}
      buttonText="Crear"
    />
  );
}
