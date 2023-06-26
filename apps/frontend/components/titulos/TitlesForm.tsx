'use client';
import { FC, useEffect } from 'react';
import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  Loading,
  Textarea,
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { Titulo } from '../../interfaces';
import { Select } from '../ui/Select';

interface DTO {
  year: number;
  grupo?: string;
  monto?: number;
}

interface Props {
  action: (data: DTO) => Promise<any>;
  initialValues?: Titulo;
  buttonText: string;
}

export const TitleForm: FC<Props> = ({ action, initialValues, buttonText }) => {
  const {
    setError,
    clearErrors,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DTO>({
    defaultValues: {
      year: initialValues?.year,
      grupo: initialValues?.grupo ?? '',
      monto: initialValues?.monto,
    },
  });
  const year = watch('year');
  const monto = watch('monto');
  useEffect(() => {
    if (!year) return;
    if (Number(year)) clearErrors('year');
    else
      setError('year', {
        type: 'manual',
        message: 'Año inválido',
      });
  }, [year]);
  useEffect(() => {
    if (!monto || Number(monto)) clearErrors('monto');
    else
      setError('monto', {
        type: 'manual',
        message: 'Monto inválido',
      });
  }, [monto]);
  const onSubmit = async (data: DTO) => {
    await action({
      ...data,
      year: Number(data.year),
      monto: data.monto ? Number(data.monto) : null,
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full pt-20 pb-52 flex flex-col gap-16"
    >
      <div className="flex flex-col gap-10 px-[25%]">
        <Input
          bordered
          labelPlaceholder="Año"
          clearable
          size="lg"
          initialValue={initialValues?.year.toString() ?? ''}
          color={errors.year ? 'error' : 'primary'}
          {...register('year', { required: true })}
          helperText={
            errors.year?.type === 'required'
              ? 'El año es requerido'
              : errors.year?.message
          }
          helperColor="error"
        />
        <Input
          bordered
          labelPlaceholder="Monto obtenido"
          clearable
          size="lg"
          initialValue={initialValues?.monto.toString() ?? ''}
          color={errors.monto ? 'error' : 'primary'}
          {...register('monto')}
          helperText={errors.monto?.message}
          helperColor="error"
        />
        <Input
          bordered
          labelPlaceholder="Grupo"
          clearable
          size="lg"
          initialValue={initialValues?.grupo ?? ''}
          {...register('grupo')}
          helperText={errors.grupo?.message}
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
