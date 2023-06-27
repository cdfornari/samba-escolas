'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Loading } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_GANADOR, PREMIOS } from '../../../../../graphql';
import { PaginationType } from '../../../../../types';
import { useNotifications } from '../../../../../hooks/useNotifications';
import { Select } from '../../../../../components/ui/Select';

interface DTO {
  premio: string;
  year: number;
}

export default function Page({ params }) {
  const { push } = useRouter();
  const { firePromise } = useNotifications();
  const [createGanador] = useMutation(CREATE_GANADOR);
  const { data, loading, error } = useQuery<{
    premios: PaginationType<{ nombre: string; id: number }>;
  }>(PREMIOS, {
    variables: {
      paginate: false,
    },
  });
  const [premio, setpremio] = useState<string>();
  const {
    setError,
    clearErrors,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DTO>({
    defaultValues: {},
  });
  const monto = watch('year');
  useEffect(() => {
    if (!monto || Number(monto)) clearErrors('year');
    else
      setError('year', {
        type: 'manual',
        message: 'Año inválido',
      });
  }, [monto]);
  useEffect(() => {
    if (premio?.length > 0) {
      clearErrors('premio');
    }
  }, [premio]);
  const onSubmit = async (data: DTO) => {
    if (!data.year) {
      setError('year', {
        type: 'manual',
        message: 'Año requerido',
      });
      return;
    }
    if (!premio) {
      setError('premio', {
        type: 'manual',
        message: 'El premio es requerido',
      });
      return;
    }
    await firePromise(
      createGanador({
        variables: {
          createGanadoresInput: {
            id_escuela: Number(params.id),
            id_premio: Number(premio),
            year: Number(data.year),
          },
        },
      }),
      'Premio Creado'
    );
    push(`/escola/${params.id}/premios`);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full pt-20 pb-52 flex flex-col gap-20 justify-start p-[25%]"
    >
      <div className="flex flex-col gap-12">
        <Input
          bordered
          labelPlaceholder="Año"
          clearable
          size="lg"
          color={errors.year ? 'error' : 'primary'}
          {...register('year')}
          helperText={errors.year?.message}
          helperColor="error"
        />
        {loading ? (
          <Loading />
        ) : error ? (
          <span>Error</span>
        ) : (
          <div className="w-full flex flex-col">
            <Select
              options={data.premios.items.map((p) => ({
                label: p.nombre,
                value: p.id.toString(),
              }))}
              label="Premio"
              selected={premio}
              setSelected={setpremio}
              error={!!errors.premio}
            />
            {errors.premio && (
              <span className="text-error">
                {(errors.premio.message as string) ?? ''}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          css={{ zIndex: 0 }}
          size="lg"
          disabled={Object.keys(errors).length > 0}
        >
          Crear
        </Button>
      </div>
    </form>
  );
}
