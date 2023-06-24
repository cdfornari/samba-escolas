'use client';
import { FC, useEffect } from 'react';
import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { Integrante } from '../../interfaces';

interface DTO {
  id?: number;
  nombre1: string;
  nombre2?: string;
  apellido1: string;
  apellido2?: string;
  apodo?: string;
  fecha_nacimiento: string;
  genero: string;
  nacionalidad: string;
  rg?: string;
}

interface Props {
  action: (data: DTO) => Promise<any>;
  initialValues?: Integrante;
  buttonText: string;
}

export const IntegranteForm: FC<Props> = ({
  action,
  initialValues,
  buttonText,
}) => {
  const {
    setError,
    clearErrors,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DTO>({
    defaultValues: {
      nombre1: initialValues?.nombre1,
      nombre2: initialValues?.nombre2,
      apellido1: initialValues?.apellido1,
      apellido2: initialValues?.apellido2,
      apodo: initialValues?.apodo,
      fecha_nacimiento: initialValues?.fecha_nacimiento,
      genero: initialValues?.genero,
      nacionalidad: initialValues?.nacionalidad,
      rg: initialValues?.rg,
    },
  });
  const fecha = watch('fecha_nacimiento');
  useEffect(() => {
    if (new Date(fecha) > new Date()) {
      setError('fecha_nacimiento', {
        type: 'manual',
        message: 'La fecha no puede ser mayor a la actual',
      });
      return;
    }
    clearErrors('fecha_nacimiento');
  }, [fecha]);
  const onSubmit = async (data: DTO) => {
    await action({
      ...data,
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
            labelPlaceholder="Primer nombre"
            clearable
            initialValue={initialValues?.nombre1 ?? ''}
            color={errors.nombre1 ? 'error' : 'primary'}
            {...register('nombre1', { required: true })}
            helperText={
              errors.nombre1?.type === 'required' &&
              'El primer nombre es requerido'
            }
            helperColor="error"
          />
          <Input
            bordered
            labelPlaceholder="Segundo nombre"
            clearable
            initialValue={initialValues?.nombre2 ?? ''}
            color={errors.nombre2 ? 'error' : 'primary'}
            {...register('nombre2')}
          />
          <Input
            bordered
            labelPlaceholder="Primer apellido"
            clearable
            initialValue={initialValues?.apellido1 ?? ''}
            color={errors.apellido1 ? 'error' : 'primary'}
            {...register('apellido1', { required: true })}
            helperText={
              errors.apellido1?.type === 'required' &&
              'El primer apellido es requerido'
            }
            helperColor="error"
          />
          <Input
            bordered
            labelPlaceholder="Segundo apellido"
            clearable
            initialValue={initialValues?.apellido2 ?? ''}
            color={errors.apellido2 ? 'error' : 'primary'}
            {...register('apellido2', { required: true })}
            helperText={
              errors.apellido2?.type === 'required' &&
              'El segundo apellido es requerido'
            }
            helperColor="error"
          />
          <Input
            bordered
            labelPlaceholder="Fecha de nacimiento"
            type="date"
            initialValue={
              initialValues?.fecha_nacimiento.toString() ??
              new Date().toISOString().split('T')[0]
            }
            color={errors.fecha_nacimiento ? 'error' : 'primary'}
            {...register('fecha_nacimiento', { required: true })}
            helperText={
              errors.fecha_nacimiento?.type === 'required'
                ? 'La fecha de nacimiento es requerida'
                : errors.fecha_nacimiento?.message
            }
            helperColor="error"
          />
        </div>
        <div className="flex flex-col gap-10 px-10">
          <Input
            bordered
            labelPlaceholder="Registro general"
            clearable
            initialValue={initialValues?.rg ?? ''}
            color={errors.rg ? 'error' : 'primary'}
            {...register('rg', { required: true })}
            helperText={errors.rg?.message}
            helperColor="error"
          />
          <Input
            bordered
            labelPlaceholder="Nacionalidad"
            clearable
            initialValue={initialValues?.nacionalidad}
            color={errors.nacionalidad ? 'error' : 'primary'}
            {...register('nacionalidad', { required: true })}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          css={{ zIndex: 0 }}
          size="lg"
          disabled={Object.keys(errors).length > 0}
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
};
