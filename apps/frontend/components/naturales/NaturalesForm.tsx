'use client';
import { FC, useEffect } from 'react';
import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { Natural } from '../../interfaces';

interface DTO {
  id?: number;
  nombre1: string;
  nombre2?: string;
  apellido1: string;
  apellido2: string;
  email: string;
  rg: string;
}

interface Props {
  action: (data: DTO) => Promise<any>;
  initialValues?: Natural;
  buttonText: string;
}

export const NaturalForm: FC<Props> = ({
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
      email: initialValues?.email,
      rg: initialValues?.rg,
    },
  });
  const rg = watch('rg');
  useEffect(() => {
    if (!rg) return;
    if (
      rg.length !== 10 ||
      !new RegExp(/[a-zA-Z0-9]{8}[-]{1}[0-9|X|x]{1}$/).test(rg)
    ) {
      setError('rg', {
        type: 'manual',
        message:
          'El RG no es valido, ingresa los 8 dígitos y el dígito verificador sin puntos (12345678-X)',
      });
      return;
    }
    clearErrors('rg');
  }, [rg]);
  const email = watch('email');
  useEffect(() => {
    if (!email) return;
    if (!new RegExp(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi).test(email)) {
      setError('email', {
        type: 'manual',
        message: 'Email inválido',
      });
      return;
    }
    clearErrors('email');
  }, [email]);
  const onSubmit = async (data: DTO) => {
    if (!data.email) {
      setError('email', {
        type: 'manual',
        message: 'El email es requerido',
      });
      return;
    }
    if (!data.rg) {
      setError('rg', {
        type: 'manual',
        message: 'El RG es requerido',
      });
      return;
    }
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
        </div>
        <div className="flex flex-col gap-10 px-10">
          <Input
            bordered
            labelPlaceholder="Registro general"
            clearable
            initialValue={initialValues?.rg ?? ''}
            color={errors.rg ? 'error' : 'primary'}
            {...register('rg')}
            helperText={errors.rg?.message}
            helperColor="error"
          />
          <Input
            bordered
            labelPlaceholder="Email"
            clearable
            initialValue={initialValues?.email}
            color={errors.email ? 'error' : 'primary'}
            {...register('email')}
            helperColor="error"
            helperText={errors.email?.message}
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
