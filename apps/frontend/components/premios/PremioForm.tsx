'use client';
import { FC, useEffect, useState } from 'react';
import { Button, Input, Loading } from '@nextui-org/react';
import { useMutation, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Place, Premio } from '../../interfaces';
import { Select } from '../ui/Select';
import { LUGARES, REMOVE_PREMIO } from '../../graphql';
import { PaginationType, PlaceType, PremioType } from '../../types';
import { useNotifications } from '../../hooks/useNotifications';
import { useRouter } from 'next/navigation';

interface DTO {
  id?: number;
  nombre: string;
  tipo: string;
  descripcion: string;
  id_lugar: number;
}

interface Props {
  action: (data: DTO) => Promise<any>;
  initialValues?: Premio;
  buttonText: string;
}

export const PremioForm: FC<Props> = ({
  action,
  initialValues,
  buttonText,
}) => {
  const { firePromise } = useNotifications();
  const { push } = useRouter();
  const [remove] = useMutation(REMOVE_PREMIO);
  const handleDelete = async () => {
    try {
      await firePromise(
        remove({
          variables: {
            removePremioId: Number(initialValues.id),
          },
        }),
        'Premio eliminado'
      );
    } catch (error) {}
    push('/premios');
  };
  const [typeP, setTypeP] = useState<string>(initialValues?.tipo ?? null);
  const [place, setPlace] = useState<string>(
    initialValues?.id_lugar?.toString() ?? null
  );
  const {
    setError,
    clearErrors,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DTO>({
    defaultValues: {
      nombre: initialValues?.nombre ?? '',
    },
  });
  const { data, loading, error } = useQuery<{ lugares: PaginationType<Place> }>(
    LUGARES,
    {
      variables: {
        paginate: false,
      },
    }
  );
  useEffect(() => {
    if (typeP?.length > 0) {
      clearErrors('tipo');
    }
  }, [typeP]);
  useEffect(() => {
    if (place?.length > 0) {
      clearErrors('id_lugar');
    }
  }, [place]);
  const onSubmit = async (data: DTO) => {
    if (!typeP) {
      setError('tipo', {
        type: 'manual',
        message: 'El tipo es requerido',
      });
      return;
    }
    if (!place) {
      setError('id_lugar', {
        type: 'manual',
        message: 'El lugar es requerido',
      });
      return;
    }
    await action({
      nombre: data.nombre,
      descripcion: data.descripcion,
      tipo: typeP as PremioType,
      id_lugar: Number(place),
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full py-10 px-[25%] flex flex-col gap-64 justify-center"
    >
      <div className="flex flex-col gap-10">
        <div className="flex flex-col">
          <Input
            bordered
            labelPlaceholder="Nombre"
            clearable
            initialValue={initialValues?.nombre ?? ''}
            color={errors.nombre ? 'error' : 'primary'}
            {...register('nombre', { required: true })}
          />
          {errors.nombre?.type === 'required' && (
            <span className="text-error">El nombre es requerido</span>
          )}
        </div>
        <div className="flex flex-col">
          <Input
            bordered
            labelPlaceholder="Descripcion"
            clearable
            initialValue={initialValues?.descripcion ?? ''}
            color={errors.descripcion ? 'error' : 'primary'}
            {...register('descripcion', { required: true })}
          />
          {errors.nombre?.type === 'required' && (
            <span className="text-error">La descripcion es requerida</span>
          )}
        </div>
        <div className="w-full flex justify-center gap-6">
          <div className="w-full flex flex-col">
            <Select
              options={[
                { label: 'Integrante', value: 'integrante' },
                { label: 'Escuela', value: 'escola' },
              ]}
              label="Tipo"
              selected={typeP}
              setSelected={setTypeP}
              error={!!errors.tipo}
            />
            {errors.tipo && (
              <span className="text-error">
                {(errors.tipo.message as string) ?? ''}
              </span>
            )}
          </div>
          {loading ? (
            <Loading />
          ) : error ? (
            <span>Error</span>
          ) : (
            <div className="w-full flex flex-col">
              <Select
                options={data.lugares.items.map((lugar) => ({
                  label: lugar.nombre,
                  value: lugar.id.toString(),
                }))}
                label="Lugar"
                selected={place}
                setSelected={setPlace}
                error={!!errors.id_lugar}
              />
              {errors.id_lugar && (
                <span className="text-error">
                  {(errors.id_lugar.message as string) ?? ''}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Button type="submit" css={{ zIndex: 0 }}>
          {buttonText}
        </Button>
        {initialValues && (
          <Button color="error" flat css={{ zIndex: 0 }} onClick={handleDelete}>
            Eliminar
          </Button>
        )}
      </div>
    </form>
  );
};
