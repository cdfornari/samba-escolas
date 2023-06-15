'use client';
import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { Place } from '../../interfaces';
import { useState } from 'react';
import { Select } from '../ui/Select';

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
  const onSubmit = (data: Place) => console.log(data);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full py-10 px-[25%] flex flex-col gap-4 justify-around"
    >
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
        <Select
          options={['ciudad', 'estado', 'region']}
          label="Tipo"
          selected={parent}
          setSelected={setParent}
        />
        {
            type && type !== 'region' && (
                <Select
                    options={['ciudad', 'estado', 'region']}
                    label="Padre"
                    selected={type}
                    setSelected={setType}
                />
            )
        }
      </div>
      <div className="flex justify-center">
        <Button type="submit">Enviar</Button>
      </div>
    </form>
  );
};
