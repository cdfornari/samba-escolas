'use client';
import { FC, useEffect, useMemo, useState } from 'react';
import { Button, Dropdown, Input, Loading, Radio } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { Integrante } from '../../interfaces';
import { PaginationType } from '../../types';
import { HABILIDADES } from '../../graphql';
import { useQuery } from '@apollo/client';

interface DTO {
  id?: number;
  nombre1: string;
  nombre2?: string;
  apellido1: string;
  apellido2?: string;
  apodo?: string;
  fecha_nacimiento: string;
  genero: string;
  nacionalidad: string;
  rg?: string;
  id_habilidades: number[];
}

interface Props {
  action: (data: DTO) => Promise<any>;
  initialValues?: Integrante;
  buttonText: string;
}

export const IntegranteForm: FC<Props> = ({
  action,
  initialValues,
  buttonText,
}) => {
  const { data, loading } = useQuery<{
    habilidades: PaginationType<{
      id: number;
      nombre: string;
    }>;
  }>(HABILIDADES, {
    variables: {
      paginate: false,
    },
  });
  const [habilidades, setHabilidades] = useState<any>(
    new Set(initialValues?.habilidades.map((c) => c.id.toString()) ?? [])
  );
  const {
    setError,
    clearErrors,
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<DTO>({
    defaultValues: {
      nombre1: initialValues?.nombre1,
      nombre2: initialValues?.nombre2,
      apellido1: initialValues?.apellido1,
      apellido2: initialValues?.apellido2,
      apodo: initialValues?.apodo,
      fecha_nacimiento: new Date(initialValues?.fecha_nacimiento)
        .toISOString()
        .split('T')[0],
      nacionalidad: initialValues?.nacionalidad,
      rg: initialValues?.rg,
    },
  });
  const [genero, setGenero] = useState(initialValues?.genero);
  const fecha = watch('fecha_nacimiento');
  const rg = watch('rg');
  const age = useMemo(() => {
    const birthdate = new Date(fecha);
    const diffMs = Date.now() - birthdate.getTime();
    const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365);
    const age = Math.round(diffYears);
    if (age < 12) {
      resetField('rg');
      clearErrors('rg');
    }
    return age;
  }, [fecha]);
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
  useEffect(() => {
    if (genero) clearErrors('genero');
  }, [genero]);
  useEffect(() => {
    if (new Date(fecha) > new Date()) {
      setError('fecha_nacimiento', {
        type: 'manual',
        message: 'La fecha de nacimiento no puede ser mayor a la actual',
      });
      return;
    }
    clearErrors('fecha_nacimiento');
  }, [fecha]);
  const onSubmit = async (data: DTO) => {
    if (!genero) {
      setError('genero', {
        type: 'manual',
        message: 'El genero es requerido',
      });
      return;
    }
    if (age >= 12) {
      if (!data.rg) {
        setError('rg', {
          type: 'manual',
          message: 'El RG es requerido para personas a partir de 12 años',
        });
        return;
      }
    }
    if (Array.from(habilidades).length === 0) {
      setError('id_habilidades', {
        type: 'manual',
        message: 'Seleccione al menos una habilidad',
      });
      return;
    }
    await action({
      ...data,
      genero,
      id_habilidades: Array.from(habilidades).map((h) => Number(h)),
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
          <Input
            bordered
            labelPlaceholder="Apodo"
            clearable
            initialValue={initialValues?.apodo ?? ''}
            color={errors.apodo ? 'error' : 'primary'}
            {...register('apodo')}
          />
        </div>
        <div className="flex flex-col gap-10 px-10">
          <Radio.Group
            orientation="horizontal"
            label="Género"
            value={genero}
            onChange={(value) => setGenero(value as 'M' | 'F')}
            size="sm"
            validationState={!errors.genero ? 'valid' : 'invalid'}
          >
            <Radio value="M" color="primary">
              Masculino
            </Radio>
            <Radio value="F" color="primary">
              Femenino
            </Radio>
            {errors.genero && (
              <span className="text-error">
                {(errors.genero.message as string) ?? ''}
              </span>
            )}
          </Radio.Group>
          <Input
            bordered
            labelPlaceholder="Registro general"
            clearable
            initialValue={initialValues?.rg ?? ''}
            color={errors.rg ? 'error' : 'primary'}
            {...register('rg')}
            helperText={errors.rg?.message}
            helperColor="error"
            disabled={age < 12}
          />
          <Input
            bordered
            labelPlaceholder="Nacionalidad"
            clearable
            initialValue={initialValues?.nacionalidad}
            color={errors.nacionalidad ? 'error' : 'primary'}
            {...register('nacionalidad', { required: true })}
            helperColor="error"
            helperText={
              errors.nacionalidad?.type === 'required' &&
              'La nacionalidad es requerida'
            }
          />
          <Input
            bordered
            labelPlaceholder="Fecha de nacimiento"
            type="date"
            initialValue={
              new Date(initialValues?.fecha_nacimiento)
                .toISOString()
                .split('T')[0]
            }
            color={errors.fecha_nacimiento ? 'error' : 'primary'}
            {...register('fecha_nacimiento', { required: true })}
            helperText={
              errors.fecha_nacimiento?.type === 'required'
                ? 'La fecha de nacimiento es requerida'
                : errors.fecha_nacimiento?.message
            }
            helperColor="error"
          />
          {loading ? (
            <Loading />
          ) : (
            <div className="flex justify-end">
              <Dropdown>
                <Dropdown.Button flat css={{ tt: 'capitalize' }}>
                  Habilidades
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Multiple selection actions"
                  disallowEmptySelection
                  selectionMode="multiple"
                  selectedKeys={habilidades}
                  onSelectionChange={setHabilidades}
                >
                  {data.habilidades.items.map((color) => (
                    <Dropdown.Item key={color.id}>{color.nombre}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              {errors.id_habilidades && (
                <span className="text-error">
                  {(errors.id_habilidades.message as string) ?? ''}
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
