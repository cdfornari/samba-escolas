'use client';
import { FC, useEffect, useState } from 'react';
import { Button, Input, Radio, Textarea } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { Event } from '../../interfaces';

interface DTO {
  id?: number;
  fecha_inicio: string;
  fecha_fin: string;
  tipo: string;
  nombre: string;
  costo_unit: number;
  descripcion?: string;
  asist_total?: number;
}

interface Props {
  action: (data: DTO) => Promise<any>;
  initialValues?: Event;
  buttonText: string;
}

export const EventForm: FC<Props> = ({ action, initialValues, buttonText }) => {
  const [tipo, setTipo] = useState(initialValues?.tipo);
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
      nombre: initialValues?.nombre ?? '',
      tipo: initialValues?.tipo,
      costo_unit: initialValues?.costo_unit,
      descripcion: initialValues?.descripcion ?? '',
      asist_total: initialValues?.asist_total,
    },
  });
  useEffect(() => {
    if (tipo) clearErrors('tipo');
  }, [tipo]);
  const costo = watch('costo_unit');
  const asist = watch('asist_total');
  useEffect(() => {
    if (!costo) return;
    if (Number(costo)) clearErrors('costo_unit');
    else
      setError('costo_unit', {
        type: 'manual',
        message: 'Costo inválido',
      });
  }, [costo]);
  useEffect(() => {
    if (!asist || Number(asist)) clearErrors('asist_total');
    else
      setError('asist_total', {
        type: 'manual',
        message: 'Asistencia inválida',
      });
  }, [asist]);
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
    if (!tipo) {
      setError('tipo', {
        type: 'manual',
        message: 'El tipo es requerido',
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
      className="w-full h-full pt-20 pb-52 flex flex-col gap-20 justify-start"
    >
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-10 px-10">
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
            color="primary"
            labelPlaceholder="Descripción"
            {...register('descripcion')}
            rows={4}
            maxLength={500}
            initialValue={initialValues?.descripcion ?? ''}
          />
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
            {...register('fecha_fin', { required: true })}
            helperText={
              errors.fecha_fin?.type === 'required'
                ? 'La fecha de fin es requerida'
                : errors.fecha_fin?.message
            }
            helperColor="error"
          />
        </div>
        <div className="flex flex-col gap-10 px-10">
          <Radio.Group
            orientation="horizontal"
            label="tipo"
            value={tipo}
            onChange={(value) => setTipo(value as 'n_samba' | 'general')}
            size="sm"
            validationState={!errors.tipo ? 'valid' : 'invalid'}
          >
            <Radio value="n_samba" color="primary">
              Noche de Samba
            </Radio>
            <Radio value="general" color="primary">
              General
            </Radio>
            {errors.tipo && (
              <span className="text-error">
                {(errors.tipo.message as string) ?? ''}
              </span>
            )}
          </Radio.Group>
          <Input
            bordered
            labelPlaceholder="Costo unitario"
            clearable
            initialValue={initialValues?.costo_unit.toString()}
            color={errors.costo_unit ? 'error' : 'primary'}
            {...register('costo_unit', { required: true })}
            helperText={
              errors.costo_unit?.type === 'required'
                ? 'El costo es requerido'
                : errors.costo_unit?.message
            }
            helperColor="error"
          />
          <Input
            bordered
            labelPlaceholder="Asistencia total"
            clearable
            initialValue={initialValues?.asist_total.toString()}
            color={errors.asist_total ? 'error' : 'primary'}
            {...register('asist_total')}
            helperText={errors.asist_total?.message}
            helperColor="error"
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
