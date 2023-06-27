'use client';
import { FC, useEffect, useState } from 'react';
import { Button, Checkbox, Input, Loading } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { Patrocinio } from '../../interfaces';
import { Select } from '../ui/Select';

interface DTO {
  patroc_jur?: number;
  patroc_nat?: number;
  fecha_inicio: string;
  fecha_fin?: string;
}

interface Props {
  action: (data: DTO) => Promise<any>;
  initialValues?: Patrocinio;
  buttonText: string;
}

export const SponsorshipForm: FC<Props> = ({
  action,
  initialValues,
  buttonText,
}) => {
  const [nat, setNat] = useState<string>(
    initialValues?.patroc_natural?.id.toString() ?? null
  );
  const [jur, setJur] = useState<string>(
    initialValues?.patroc_juridico?.id.toString() ?? null
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
    if (nat || jur) {
      clearErrors('patroc_jur');
      clearErrors('patroc_nat');
    }
  }, [nat, jur]);
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
    if (new Date(fechaFin) > new Date()) {
      setError('fecha_fin', {
        type: 'manual',
        message: 'La fecha de fin no puede ser mayor a la fecha actual',
      });
      return;
    }
    if (new Date(fechaInicio) > new Date(fechaFin)) {
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
  }, [fechaInicio, fechaFin]);
  const onSubmit = async (data: DTO) => {
    if (!jur && !nat) {
      setError('patroc_jur', {
        type: 'manual',
        message: 'El patrocinador es requerido',
      });
      setError('patroc_nat', {
        type: 'manual',
        message: 'El patrocinador es requerido',
      });
      return;
    }
    await action({
      ...data,
      patroc_jur: jur ? parseInt(jur) : null,
      patroc_nat: nat ? parseInt(nat) : null,
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
            {...register('fecha_inicio', { required: true })}
            helperText={
              errors.fecha_inicio?.type === 'required'
                ? 'La fecha de inicio es requerida'
                : errors.fecha_inicio?.message
            }
            helperColor="error"
          />
          <Input
            bordered
            labelPlaceholder="Fecha de fin"
            type="date"
            initialValue={
              initialValues?.fecha_fin?.toString() ??
              new Date().toISOString().split('T')[0]
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
        </div>
        <div className="flex flex-col gap-10 px-10">
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
