'use client';
import { useMutation } from '@apollo/client';
import { CREATE_PREMIO } from '../../../graphql';
import { useNotifications } from '../../../hooks/useNotifications';
import { useRouter } from 'next/navigation';
import { PremioForm } from '../../../components/premios/PremioForm';

export default function Page() {
  const { push } = useRouter();
  const { firePromise } = useNotifications();
  const [createLugar] = useMutation(CREATE_PREMIO);
  return (
    <PremioForm
      action={async (data) => {
        try {
          await firePromise(
            createLugar({
              variables: {
                
                createPremioInput: data,
              },
            }),
            'Premio creado correctamente'
          );
          push('/premios');
        } catch (error) {}
      }}
      buttonText='Crear'
    />
  );
}
