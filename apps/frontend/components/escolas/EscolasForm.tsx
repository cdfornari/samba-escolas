'use client';
import { FC, useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  Loading,
  Textarea,
} from '@nextui-org/react';
import { useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Color, Escola, Place } from '../../interfaces';
import { Select } from '../ui/Select';
import { COLORS, LUGARES } from '../../graphql';
import { PaginationType } from '../../types';

interface DTO {
  id?: number;
  nombre: string;
  descripcion: string;
  direccion_sede: string;
  numero: number;
  cep: string;
  fecha_fundacion: string;
  resumen_historico: string;
  gres: boolean;
  id_ciudad: number;
  id_colores: number[];
}

interface Props {
  action: (data: DTO) => Promise<any>;
  initialValues?: Escola;
  buttonText: string;
}

export const EscolaForm: FC<Props> = ({
  action,
  initialValues,
  buttonText,
}) => {
  const { data: colorsData, loading: loadingColors } = useQuery<{
    colores: PaginationType<Color>;
  }>(COLORS, {
    variables: {
      paginate: false,
    },
  });
  const [gres, setGres] = useState<boolean>(initialValues?.gres ?? false);
  const [ciudad, setCiudad] = useState<string>(
    initialValues?.ciudad?.id.toString() ?? null
  );
  const [colors, setColors] = useState<any>(
    new Set(initialValues?.colores.map((c) => c.id.toString()) ?? [])
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
      nombre: initialValues?.nombre ?? '',
      descripcion: initialValues?.descripcion ?? '',
      direccion_sede: initialValues?.direccion_sede ?? '',
      numero: initialValues?.numero,
      cep: initialValues?.cep ?? '',
      fecha_fundacion: initialValues?.fecha_fundacion
        ? new Date(initialValues.fecha_fundacion).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      resumen_historico: initialValues?.resumen_historico ?? '',
    },
  });
  const numero = watch('numero');
  const fecha = watch('fecha_fundacion');
  useEffect(() => {
    if (ciudad?.length > 0) clearErrors('id_ciudad');
  }, [ciudad]);
  useEffect(() => {
    if (Array.from(colors).length > 0) clearErrors('id_colores');
  }, [colors]);
  useEffect(() => {
    if (!numero) return;
    if (Number(numero)) clearErrors('numero');
    else
      setError('numero', {
        type: 'manual',
        message: 'Número inválido',
      });
  }, [numero]);
  useEffect(() => {
    if (new Date(fecha) > new Date()) {
      setError('fecha_fundacion', {
        type: 'manual',
        message: 'La fecha no puede ser mayor a la actual',
      });
      return;
    }
    clearErrors('fecha_fundacion');
  }, [fecha]);
  const { data, loading, error } = useQuery<{ lugares: PaginationType<Place> }>(
    LUGARES,
    {
      variables: {
        tipo: 'ciudad',
        paginate: false,
      },
    }
  );
  const onSubmit = async (data: DTO) => {
    if (!ciudad) {
      setError('id_ciudad', {
        type: 'manual',
        message: 'Seleccione una ciudad',
      });
      return;
    }
    if (Array.from(colors).length === 0) {
      setError('id_colores', {
        type: 'manual',
        message: 'Seleccione al menos un color',
      });
      return;
    }
    await action({
      ...data,
      id_ciudad: Number(ciudad),
      numero: Number(numero),
      gres,
      id_colores: Array.from(colors).map((c) => Number(c)),
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full pt-20 pb-52 flex flex-col gap-4 justify-between"
    >
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-10 px-10">
          <div className="flex gap-4">
            <div className="w-11/12 flex flex-col">
              <Input
                bordered
                labelPlaceholder="Nombre"
                clearable
                size="lg"
                initialValue={initialValues?.nombre ?? ''}
                color={errors.nombre ? 'error' : 'primary'}
                {...register('nombre', { required: true })}
                helperText={
                  errors.nombre?.type === 'required' && 'El nombre es requerido'
                }
                helperColor="error"
              />
            </div>
            <Checkbox
              label="GRES"
              isSelected={gres}
              onChange={setGres}
              size="sm"
            />
          </div>
          <Textarea
            bordered
            color="primary"
            labelPlaceholder="Descripción"
            {...register('descripcion')}
            rows={4}
            maxLength={500}
            initialValue={initialValues?.descripcion ?? ''}
          />
          <Textarea
            bordered
            color={errors.resumen_historico ? 'error' : 'primary'}
            labelPlaceholder="Resumen histórico"
            {...register('resumen_historico', { required: true })}
            helperText={
              errors.resumen_historico?.type === 'required' &&
              'El resumen histórico es requerido'
            }
            helperColor="error"
            rows={4}
            maxLength={600}
            initialValue={initialValues?.resumen_historico ?? ''}
          />
          {loadingColors ? (
            <Loading />
          ) : (
            <div>
              <Dropdown>
                <Dropdown.Button flat css={{ tt: 'capitalize' }}>
                  Colores
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Multiple selection actions"
                  disallowEmptySelection
                  selectionMode="multiple"
                  selectedKeys={colors}
                  onSelectionChange={setColors}
                >
                  {colorsData.colores.items.map((color) => (
                    <Dropdown.Item key={color.id}>{color.nombre}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              {errors.id_colores && (
                <span className="text-error">
                  {(errors.id_colores.message as string) ?? ''}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-10 px-10">
          <Input
            bordered
            labelPlaceholder="Fecha de fundación"
            type="date"
            initialValue={
              initialValues?.fecha_fundacion
                ? new Date(initialValues.fecha_fundacion)
                    .toISOString()
                    .split('T')[0]
                : new Date().toISOString().split('T')[0]
            }
            color={errors.fecha_fundacion ? 'error' : 'primary'}
            {...register('fecha_fundacion', { required: true })}
            helperText={
              errors.fecha_fundacion?.type === 'required'
                ? 'La fecha de fundación es requerida'
                : errors.fecha_fundacion?.message
            }
            helperColor="error"
          />
          <Input
            bordered
            labelPlaceholder="Dirección"
            clearable
            initialValue={initialValues?.nombre ?? ''}
            color={errors.direccion_sede ? 'error' : 'primary'}
            {...register('direccion_sede', { required: true })}
            helperText={
              errors.direccion_sede?.type === 'required' &&
              'La dirección es requerida'
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
                error={!!errors.id_ciudad}
              />
              {errors.id_ciudad && (
                <span className="text-error">
                  {(errors.id_ciudad.message as string) ?? ''}
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
