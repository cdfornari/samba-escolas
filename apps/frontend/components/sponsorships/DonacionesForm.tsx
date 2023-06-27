'use client';
import { FC, useEffect } from 'react';
import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';

interface DTO {
  fecha: string;
  monto: number;
}

interface Props {
  action: (data: DTO) => Promise<any>;
  buttonText: string;
}

export const DonacionesForm: FC<Props> = ({ action, buttonText }) => {
  const {
    setError,
    clearErrors,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DTO>({
    defaultValues: {
      fecha: new Date().toISOString().split('T')[0],
    },
  });
  const monto = watch('monto');
  useEffect(() => {
    if (!monto || Number(monto)) clearErrors('monto');
    else
      setError('monto', {
        type: 'manual',
        message: 'Monto inválido',
      });
  }, [monto]);
  const fecha = watch('fecha');
  useEffect(() => {
    if (new Date(fecha) > new Date()) {
      setError('fecha', {
        type: 'manual',
        message: 'La fecha no puede ser mayor a la fecha actual',
      });
      return;
    }
    clearErrors('fecha');
  }, [fecha]);
  const onSubmit = async (data: DTO) => {
    if (!data.monto) {
      setError('monto', {
        type: 'manual',
        message: 'Monto requerido',
      });
      return;
    }
    await action({
      fecha: new Date(data.fecha).toISOString().split('T')[0],
      monto: Number(data.monto),
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full pt-20 pb-52 flex flex-col gap-20 justify-start p-[25%]"
    >
      <div className="flex flex-col gap-12">
        <Input
          bordered
          labelPlaceholder="Monto donado"
          clearable
          size="lg"
          color={errors.monto ? 'error' : 'primary'}
          {...register('monto')}
          helperText={errors.monto?.message}
          helperColor="error"
        />
        <Input
          bordered
          labelPlaceholder="Fecha"
          type="date"
          initialValue={new Date().toISOString().split('T')[0]}
          color={errors.fecha ? 'error' : 'primary'}
          {...register('fecha', { required: true })}
          helperText={errors.fecha?.message}
          helperColor="error"
        />
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
