'use client';
import { useMutation, useQuery } from '@apollo/client';
import { Loading } from '@nextui-org/react';
import { HABILIDAD, UPDATE_HABILIDAD} from '../../../graphql';
import { useNotifications } from '../../../hooks/useNotifications';
import { Role } from '../../../interfaces';
import { RoleForm } from '../../../components/roles/RoleForm';

export default function Page({ params }) {
  const { firePromise } = useNotifications();
  const [updateRole] = useMutation(UPDATE_HABILIDAD);
  const { data, loading, error } = useQuery<{
    rol: Role;
  }>(HABILIDAD, {
    variables: {
      id: Number(params.id),
    },
    fetchPolicy: 'network-only',
  });
  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
    );
  if (error) return <p>Error</p>;
  return (
    <RoleForm
      action={async (data) =>
        firePromise(
          updateRole({
            variables: {
              updateRoleInput: {
                ...data,
                id: Number(params.id),
              },
            },
          }),
          'Habilidad actualizada'
        )
      }
      initialValues={data?.rol}
      buttonText="Actualizar"
    />
  );
}
