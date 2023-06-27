'use client';
import { FC, useEffect, useState } from 'react';
import { Button, Input, Loading } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { Juridico, Place } from '../../interfaces';
import { LUGARES } from '../../graphql';
import { useQuery } from '@apollo/client';
import { PaginationType } from '../../types';
import { Select } from '../ui/Select';

interface DTO {
  id?: number;
  nombre: string;
  cnpj: string;
  email: string;
  id_lugar: string;
  numero: string;
  cep: string;
  dir: string;
}

interface Props {
  action: (data: DTO) => Promise<any>;
  initialValues?: Juridico;
  buttonText: string;
}

export const JuridicosForm: FC<Props> = ({
  action,
  initialValues,
  buttonText,
}) => {
  const { data, loading, error } = useQuery<{ lugares: PaginationType<Place> }>(
    LUGARES,
    {
      variables: {
        tipo: 'ciudad',
        paginate: false,
      },
    }
  );
  const [ciudad, setCiudad] = useState<string>(
    initialValues?.ciudad?.id.toString() ?? null
  );
  useEffect(() => {
    if (ciudad?.length > 0) clearErrors('id_lugar');
  }, [ciudad]);
  const {
    setError,
    clearErrors,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DTO>({
    defaultValues: {
      nombre: initialValues?.nombre,
      email: initialValues?.email,
      cnpj: initialValues?.cnpj,
      numero: initialValues?.numero.toString(),
      cep: initialValues?.cep,
      dir: initialValues?.dir,
    },
  });
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
    if (!ciudad) {
      setError('id_lugar', {
        type: 'manual',
        message: 'Seleccione una ciudad',
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
            initialValue={initialValues?.nombre ?? ''}
            color={errors.nombre ? 'error' : 'primary'}
            {...register('nombre', { required: true })}
            helperText={
              errors.nombre?.type === 'required' &&
              'El primer nombre es requerido'
            }
            helperColor="error"
          />
          <Input
            bordered
            labelPlaceholder="Primer apellido"
            clearable
            initialValue={initialValues?.cnpj ?? ''}
            color={errors.cnpj ? 'error' : 'primary'}
            {...register('cnpj', { required: true })}
            helperText={
              errors.cnpj?.type === 'required' && 'El cnpj es requerido'
            }
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
        <div className="flex flex-col gap-10 px-10">
          <Input
            bordered
            labelPlaceholder="Dirección"
            clearable
            initialValue={initialValues?.dir ?? ''}
            color={errors.dir ? 'error' : 'primary'}
            {...register('dir', { required: true })}
            helperText={
              errors.dir?.type === 'required' && 'La dirección es requerida'
            }
            helperColor="error"
          />
          <Input
            bordered
            labelPlaceholder="Número"
            clearable
            initialValue={initialValues?.numero.toString()}
            color={errors.numero ? 'error' : 'primary'}
            {...register('numero', { required: true })}
            helperText={
              errors.numero?.type === 'required'
                ? 'El número es requerido'
                : errors.numero?.message
            }
            helperColor="error"
          />
          <Input
            bordered
            labelPlaceholder="CEP"
            clearable
            initialValue={initialValues?.nombre ?? ''}
            color={errors.cep ? 'error' : 'primary'}
            {...register('cep', { required: true })}
            helperText={
              errors.cep?.type === 'required' && 'El CEP es requerido'
            }
            helperColor="error"
          />
          {loading ? (
            <Loading />
          ) : (
            <div>
              <Select
                options={data.lugares.items.map((lugar) => ({
                  label: lugar.nombre,
                  value: lugar.id.toString(),
                }))}
                label="Ciudad"
                selected={ciudad}
                setSelected={setCiudad}
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
