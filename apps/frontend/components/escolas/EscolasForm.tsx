'use client';
import { FC, useEffect, useState } from 'react';
import { Button, Input, Loading, Textarea } from '@nextui-org/react';
import { useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Escola, Place } from '../../interfaces';
import { Select } from '../ui/Select';
import { LUGARES } from '../../graphql';
import { PaginationType } from '../../types';

interface DTO {
  id?: number;
  nombre: string;
  descripcion: string;
  direccion_sede: string;
  numero: number;
  cep: string;
  fecha_fundacion: Date;
  resumen_historico: string;
  gres: boolean;
  id_ciudad: number;
}

interface Props {
  action: (data: DTO) => Promise<any>;
  initialValues?: Escola;
}

export const EscolaForm: FC<Props> = ({ action, initialValues }) => {
  const [ciudad, setCiudad] = useState<string>(
    initialValues?.ciudad?.id.toString() ?? null
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
  useEffect(() => {
    if (parent?.length > 0) {
      clearErrors('id_ciudad');
    }
  }, [parent]);
  const { data, loading, error } = useQuery<{ lugares: PaginationType<Place> }>(
    LUGARES,
    {
      variables: {
        tipo: 'ciudad',
      },
    }
  );
  const onSubmit = async (data: DTO) => {
    if (!ciudad) {
      setError('id_ciudad', {
        type: 'manual',
        message: 'La ciudad es requerida',
      });
      return;
    }
    await action({
      ...data,
      id_ciudad: Number(ciudad),
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full pt-20 pb-52 flex flex-col gap-4 justify-between"
    >
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-10 px-10">
          <Input
            bordered
            labelPlaceholder="Nombre"
            clearable
            size="lg"
            initialValue={initialValues?.nombre ?? ''}
            color={errors.nombre ? 'error' : 'primary'}
            {...register('nombre', { required: true })}
            helperText={
              errors.nombre?.type === 'required' && 'El nombre es requerido'
            }
            helperColor="error"
          />
          <Textarea
            bordered
            color="primary"
            labelPlaceholder="Descripción"
            {...register('descripcion')}
            rows={4}
            maxLength={500}
          />
          <Textarea
            bordered
            color={errors.resumen_historico ? 'error' : 'primary'}
            labelPlaceholder="Resumen histórico"
            {...register('resumen_historico', { required: true })}
            helperText={
              errors.resumen_historico?.type === 'required' &&
              'El resumen histórico es requerido'
            }
            helperColor="error"
            rows={4}
            maxLength={600}
          />
        </div>
        <div className="flex flex-col gap-10">
          <Input
            bordered
            labelPlaceholder="Direccion"
            clearable
            initialValue={initialValues?.nombre ?? ''}
            color={errors.nombre ? 'error' : 'primary'}
            {...register('direccion_sede', { required: true })}
            helperText={
              errors.direccion_sede?.type === 'required' &&
              'La dirección es requerida'
            }
            helperColor="error"
          />
          <Input
            bordered
            labelPlaceholder="Número"
            clearable
            initialValue={initialValues?.nombre ?? ''}
            color={errors.nombre ? 'error' : 'primary'}
            {...register('numero', { required: true })}
            helperText={
              errors.numero?.type === 'required' && 'El número es requerido'
            }
            helperColor="error"
          />
          <Input
            bordered
            labelPlaceholder="CEP"
            clearable
            initialValue={initialValues?.nombre ?? ''}
            color={errors.nombre ? 'error' : 'primary'}
            {...register('cep', { required: true })}
            helperText={
              errors.cep?.type === 'required' && 'El CEP es requerido'
            }
            helperColor="error"
          />
          {loading ? (
            <Loading />
          ) : (
            <Select
              options={data.lugares.items.map((lugar) => ({
                label: lugar.nombre,
                value: lugar.id.toString(),
              }))}
              label="Ciudad"
              selected={ciudad}
              setSelected={setCiudad}
              error={!!errors.id_ciudad}
            />
          )}
          {errors.id_ciudad && (
            <span className="text-error">
              {(errors.id_ciudad.message as string) ?? ''}
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Button type="submit" css={{ zIndex: 0 }} size="lg">
          Enviar
        </Button>
      </div>
    </form>
  );
};
