'use client';
import { useState } from 'react';
import { Button, Input, Loading } from '@nextui-org/react';
import { useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Place } from '../../interfaces';
import { Select } from '../ui/Select';
import { LUGARES } from '../../graphql';
import { PaginationType } from '../../types';

interface Props {
  onSubmit: (data: Place) => void;
  initialValues?: Place;
}

export const PlaceForm = () => {
  const [type, setType] = useState<string>();
  const [parent, setParent] = useState<string>();
  const {
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
  const onSubmit = (data: Place) => console.log(data);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full py-10 px-[25%] flex flex-col gap-4 justify-around"
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
          <Select
            options={['ciudad', 'estado', 'region']}
            label="Tipo"
            selected={type}
            setSelected={setType}
          />
          {type &&
            type !== 'region' &&
            (loading ? (
              <Loading />
            ) : error ? (
              <span>Error</span>
            ) : (
              <Select
                options={data.lugares.items.map((lugar) => lugar.nombre)}
                label="Padre"
                selected={parent}
                setSelected={setParent}
              />
            ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Button type="submit">Enviar</Button>
      </div>
    </form>
  );
};
