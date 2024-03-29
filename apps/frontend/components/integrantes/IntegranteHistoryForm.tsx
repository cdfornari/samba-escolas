'use client';
import { FC, useEffect, useState } from 'react';
import { Button, Checkbox, Input, Loading } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import { Integrante, IntegranteHistory } from '../../interfaces';
import { Select } from '../ui/Select';
import { INTEGRANTES_ELEGIBLES } from '../../graphql';
import { PaginationType } from '../../types';

interface DTO {
  id_integrante: number;
  fecha_inicio: string;
  fecha_fin?: string;
  autoridad: boolean;
}

interface Props {
  action: (data: DTO) => Promise<any>;
  initialValues?: IntegranteHistory;
  buttonText: string;
}

export const IntegranteHistoryForm: FC<Props> = ({
  action,
  initialValues,
  buttonText,
}) => {
  const [abierto, setAbierto] = useState(true);
  const { data, loading, error } = useQuery<{
    integrantesElegibles: Integrante[];
  }>(INTEGRANTES_ELEGIBLES, {
    variables: {},
    fetchPolicy: 'network-only',
  });
  const [autoridad, setAutoridad] = useState<boolean>(
    initialValues?.autoridad ?? false
  );
  const [integrante, setIntegrante] = useState<string>(
    initialValues?.integrante?.id.toString() ?? null
  );
  const {
    setError,
    clearErrors,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DTO>({
    defaultValues: {
      fecha_inicio:
        initialValues?.fecha_inicio.toString() ??
        new Date().toISOString().split('T')[0],
      fecha_fin:
        initialValues?.fecha_fin?.toString() ??
        new Date().toISOString().split('T')[0],
    },
  });
  useEffect(() => {
    if (integrante) clearErrors('id_integrante');
  }, [integrante]);
  const fechaInicio = watch('fecha_inicio');
  const fechaFin = watch('fecha_fin');
  useEffect(() => {
    if (new Date(fechaInicio) > new Date()) {
      setError('fecha_inicio', {
        type: 'manual',
        message: 'La fecha de inicio no puede ser mayor a la fecha actual',
      });
      return;
    }
    if (!abierto && new Date(fechaFin) > new Date()) {
      setError('fecha_fin', {
        type: 'manual',
        message: 'La fecha de fin no puede ser mayor a la fecha actual',
      });
      return;
    }
    if (!abierto && new Date(fechaInicio) > new Date(fechaFin)) {
      setError('fecha_inicio', {
        type: 'manual',
        message: 'La fecha de inicio no puede ser mayor a la fecha de fin',
      });
      setError('fecha_fin', {
        type: 'manual',
        message: 'La fecha de inicio no puede ser mayor a la fecha de fin',
      });
      return;
    }
    clearErrors('fecha_inicio');
    clearErrors('fecha_fin');
  }, [fechaInicio, fechaFin, abierto]);
  const onSubmit = async (data: DTO) => {
    if (!integrante) {
      setError('id_integrante', {
        type: 'manual',
        message: 'El integrante es requerido',
      });
      return;
    }
    await action({
      ...data,
      autoridad,
      id_integrante: Number(integrante),
      fecha_fin: abierto ? null : data.fecha_fin,
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full pt-20 pb-52 flex flex-col gap-20 justify-start"
    >
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-10 px-10">
          <Input
            bordered
            labelPlaceholder="Fecha de inicio"
            type="date"
            initialValue={
              initialValues?.fecha_inicio.toString() ??
              new Date().toISOString().split('T')[0]
            }
            color={errors.fecha_inicio ? 'error' : 'primary'}
            {...register('fecha_inicio')}
            helperText={errors.fecha_inicio?.message}
            helperColor="error"
          />
          {!abierto && (
            <Input
              bordered
              labelPlaceholder="Fecha de fin"
              type="date"
              initialValue={
                initialValues?.fecha_fin?.toString() ??
                new Date().toDateString()
              }
              color={errors.fecha_fin ? 'error' : 'primary'}
              {...register('fecha_fin')}
              helperText={
                errors.fecha_fin?.type === 'required'
                  ? 'La fecha de fin es requerida'
                  : errors.fecha_fin?.message
              }
              helperColor="error"
            />
          )}
          <div className="flex flex-end">
            <Checkbox
              label="Abierto"
              isSelected={abierto}
              onChange={setAbierto}
              size="xs"
            />
          </div>
        </div>
        <div className="flex flex-col gap-10 px-10">
          <Checkbox
            label="Es autoridad"
            isSelected={autoridad}
            onChange={setAutoridad}
            size="xs"
          />
          {loading ? (
            <Loading />
          ) : (
            <div>
              <Select
                options={data.integrantesElegibles.map((i) => ({
                  label: `${i.nombre1} ${i.nombre2 ? i.nombre2 : ''} ${
                    i.apellido1
                  } ${i.apellido2}`,
                  value: i.id.toString(),
                }))}
                label="Integrante"
                selected={integrante}
                setSelected={setIntegrante}
                error={!!errors.id_integrante}
              />
              {errors.id_integrante && (
                <span className="text-error">
                  {(errors.id_integrante.message as string) ?? ''}
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
