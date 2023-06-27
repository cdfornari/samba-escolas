'use client';
import { FC } from 'react';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { Habilidad } from '../../interfaces';

interface DTO {
  id?: number;
  nombre: string;
  descripcion: string;
}

interface Props {
  action: (data: DTO) => Promise<any>;
  initialValues?: Habilidad;
  buttonText: string;
}

export const HabilidadForm: FC<Props> = ({ action, initialValues, buttonText }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DTO>({
    defaultValues: {
      nombre: initialValues?.nombre ?? '',
      descripcion: initialValues?.descripcion ?? '',
    },
  });
  const onSubmit = async (data: DTO) => action(data);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full py-10 px-[25%] flex flex-col gap-16 justify-center"
    >
      <div className="flex flex-col gap-12">
        <Input
          bordered
          labelPlaceholder="Nombre"
          clearable
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
          color={errors.descripcion ? 'error' : 'primary'}
          labelPlaceholder="Descripción"
          {...register('descripcion', { required: true })}
          rows={4}
          maxLength={500}
          initialValue={initialValues?.descripcion ?? ''}
          helperColor="error"
          helperText={
            errors.descripcion?.type === 'required' &&
            'La descripción es requerida'
          }
        />
      </div>
      <div className="flex justify-center">
        <Button type="submit" css={{ zIndex: 0 }}>
          {buttonText}
        </Button>
      </div>
    </form>
  );
};
