'use client';
import { FC, useEffect, useState } from 'react';
import { Button, Input, Loading } from '@nextui-org/react';
import { useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Place } from '../../interfaces';
import { Select } from '../ui/Select';
import { LUGARES } from '../../graphql';
import { PaginationType, PlaceType } from '../../types';

interface DTO {
  id?: number;
  nombre: string;
  tipo: string;
  id_padre_lugar?: number;
}

interface Props {
  action: (data: DTO) => Promise<any>;
  initialValues?: DTO;
}

export const PlaceForm: FC<Props> = ({ action, initialValues }) => {
  const [type, setType] = useState<string>();
  const [parent, setParent] = useState<string>();
  const {
    setError,
    clearErrors,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data, loading, error } = useQuery<{ lugares: PaginationType<Place> }>(
    LUGARES,
    {
      skip: !type || type === 'region',
      variables: {
        tipo: type === 'ciudad' ? 'estado' : 'region',
      },
    }
  );
  useEffect(() => {
    if (type?.length > 0) {
      clearErrors('tipo');
    }
  }, [type]);
  useEffect(() => {
    if (parent?.length > 0) {
      clearErrors('padre');
    }
  }, [parent]);
  const onSubmit = async (data: { nombre: string }) => {
    if (!type) {
      setError('tipo', {
        type: 'manual',
        message: 'El tipo es requerido',
      });
      return;
    }
    if (type !== 'region' && !parent) {
      setError('padre', {
        type: 'manual',
        message: 'El padre es requerido',
      });
      return;
    }
    await action({
      nombre: data.nombre,
      tipo: type as PlaceType,
      id_padre_lugar: Number(parent),
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full py-10 px-[25%] flex flex-col gap-4 justify-center"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <Input
            bordered
            labelPlaceholder="Nombre"
            clearable
            initialValue=""
            color={errors.nombre ? 'error' : 'primary'}
            {...register('nombre', { required: true })}
          />
          {errors.nombre?.type === 'required' && (
            <span className="text-error">El nombre es requerido</span>
          )}
        </div>
        <div className="w-full flex justify-center gap-6">
          <div className="w-full flex flex-col">
            <Select
              options={[
                { label: 'Región', value: 'region' },
                { label: 'Estado', value: 'estado' },
                { label: 'Ciudad', value: 'ciudad' },
              ]}
              label="Tipo"
              selected={type}
              setSelected={setType}
              error={!!errors.tipo}
            />
            {errors.tipo && (
              <span className="text-error">
                {(errors.tipo.message as string) ?? ''}
              </span>
            )}
          </div>
          {type &&
            type !== 'region' &&
            (loading ? (
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
                  label="Padre"
                  selected={parent}
                  setSelected={setParent}
                  error={!!errors.padre}
                />
                {errors.padre && (
                  <span className="text-error">
                    {(errors.padre.message as string) ?? ''}
                  </span>
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Button type="submit" css={{ zIndex: 0 }}>
          Enviar
        </Button>
      </div>
    </form>
  );
};
