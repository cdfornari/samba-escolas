'use client';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { CREATE_ROL } from '../../../graphql';
import { useNotifications } from '../../../hooks/useNotifications';
import { RoleForm } from '../../../components/roles/RoleForm';

export default function Page() {
  const { push } = useRouter();
  const { firePromise } = useNotifications();
  const [createRole] = useMutation(CREATE_ROL);
  return (
    <RoleForm
      action={async (data) => {
        try {
          await firePromise(
            createRole({
              variables: {
                createRoleInput: data,
              },
            }),
            'Rol creado correctamente'
          );
          push('/roles');
        } catch (error) {}
      }}
      buttonText="Crear"
    />
  );
}
