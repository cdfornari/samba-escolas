CREATE TABLE IF NOT EXISTS habilidades (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(40) NOT NULL UNIQUE, 
  descripcion TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS integrantes (
  id SERIAL PRIMARY KEY,
  nombre1 VARCHAR(50) NOT NULL, 
  apellido1 VARCHAR(50) NOT NULL, 
  apellido2 VARCHAR(50) NOT NULL, 
  fecha_nacimiento DATE NOT NULL,
  nacionalidad VARCHAR(25) NOT NULL DEFAULT 'brasilero',
  genero CHAR(1) NOT NULL,
  rg VARCHAR(15) UNIQUE,
  nombre2 VARCHAR(50),
  apodo VARCHAR(50)
  CONSTRAINT val_genero CHECK (genero IN ('M', 'F'))
);

CREATE TABLE IF NOT EXISTS integrantes_habilidades (
  id_integrante INTEGER NOT NULL REFERENCES integrantes(id),
  id_habilidad INTEGER NOT NULL REFERENCES habilidades(id),
  PRIMARY KEY (id_integrante, id_habilidad)
);

CREATE TABLE IF NOT EXISTS parentescos(
  id_integrante_1 INTEGER NOT NULL REFERENCES integrantes(id),
  id_integrante_2 INTEGER NOT NULL REFERENCES integrantes(id),
  tipo VARCHAR(7) NOT NULL,
  PRIMARY KEY (id_integrante_1,id_integrante_2 ),
  CONSTRAINT tipo_parentesco CHECK (tipo IN ('padre','hermano','pareja'))
);

CREATE TABLE IF NOT EXISTS lugares_geo(
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  tipo VARCHAR(6) NOT NULL,
  id_padre_lugar INTEGER REFERENCES lugares_geo(id),
  CONSTRAINT nombres_tipo CHECK (tipo IN ('region','estado','ciudad'))
);

CREATE TABLE IF NOT EXISTS escuelas_samba(
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  dir_sede VARCHAR(20) NOT NULL,
  numero INTEGER NOT NULL,
  cep VARCHAR(9) NOT NULL,
  fecha_fund DATE NOT NULL,
  resumen_hist VARCHAR(500) NOT NULL,
  id_ciudad INTEGER NOT NULL REFERENCES lugares_geo(id),
  gres BOOLEAN;
  descrip VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS colores(
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(15) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS escuelas_colores(
  id_escuela INTEGER NOT NULL REFERENCES escuelas_samba(id),
  id_color INTEGER NOT NULL REFERENCES colores(id),
  PRIMARY KEY (id_escuela,id_color)
);

CREATE TABLE IF NOT EXISTS historicos_integrantes(
  fecha_inic DATE NOT NULL,
  id_integrante INTEGER NOT NULL REFERENCES integrantes(id),
  id_escuela INTEGER NOT NULL REFERENCES escuelas_samba(id),
  autoridad CHAR(2) NOT NULL,
  fecha_fin DATE,
  PRIMARY KEY (fecha_inic,id_integrante)
);

CREATE TABLE IF NOT EXISTS historicos_titulos(
  anual INTEGER NOT NULL,
  id_escuela INTEGER NOT NULL REFERENCES escuelas_samba(id),
  grupo VARCHAR(10),
  monto INTEGER,
  PRIMARY KEY (anuel,id_escuela)
);

CREATE TABLE IF NOT EXISTS patroc_juridicos(
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  cnip INTEGER NOT NULL UNIQUE,
  email VARCHAR(35) NOT NULL,
  id_lugar INTEGER NOT NULL REFERENCES lugares_geo(id),
  dir VARCHAR(50),
  numero INTEGER,
  cep INTEGER
);

CREATE TABLE IF NOT EXISTS patroc_naturales(
  id SERIAL PRIMARY KEY,
  nombre1 VARCHAR(15) NOT NULL,
  apellido1 VARCHAR(15) NOT NULL,
  apellido2 VARCHAR(15) NOT NULL,
  rg INTEGER NOT NULL UNIQUE,
  num_telf INTEGER NOT NULL,
  email VARCHAR(35) NOT NULL,
  nombre2 VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS historicos_patrocinios(
  id SERIAL,
  id_escuela INTEGER NOT NULL REFERENCES escuelas_samba(id),
  fecha_inicio DATE NOT NULL,
  id_jur INTEGER REFERENCES patroc_juridicos(id),
  id_nat INTEGER REFERENCES patroc_naturales(id),
  fecha_fin DATE,
  PRIMARY KEY (id,id_escuela)
);

CREATE TABLE IF NOT EXISTS donaciones(
  id SERIAL,
  id_patroc INTEGER NOT NULL REFERENCES historicos_patrocinios(id),
  id_escuela INTEGER NOT NULL REFERENCES historicos_patrocinios(id_escuela),
  fecha DATE NOT NULL,
  cantidad INTEGER NOT NULL,
  PRIMARY KEY (id,id_patroc,id_escuela)
);

CREATE TABLE IF NOT EXISTS telefonos(
  cod_int INTEGER NOT NULL,
  cod_area INTEGER NOT NULL,
  numero INTEGER NOT NULL,
  id_escuela INTEGER REFERENCES escuelas_samba(id),
  id_jur INTEGER REFERENCES patroc_juridicos(id),
  id_nat INTEGER REFERENCES patroc_naturales(id),
  PRIMARY KEY (cod_int,cod_area,numero)
);

CREATE TABLE IF NOT EXISTS sambas(
  id SERIAL PRIMARY KEY,
  titulo INTEGER NOT NULL UNIQUE,
  letra VARCHAR(500),
  anuel_carnv INTEGER NOT NULL,
  tipo INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS autores(
  id_integrante INTEGER NOT NULL REFERENCES historicos_integrantes(id_integrante),
  fecha_inicio DATE NOT NULL REFERENCES historicos_integrantes(fecha_inic),
  id_samba INTEGER NOT NULL REFERENCES samba(id),
  PRIMARY KEY (id_integrante,fecha_inicio)
);

CREATE TABLE IF NOT EXISTS roles(
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(15) NOT NULL UNIQUE,
  descripcion VARCHAR(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS org_carnavales(
  id_integrante INTEGER NOT NULL REFERENCES historicos_integrantes(id_integrante),
  fecha_inicio DATE NOT NULL REFERENCES historicos_integrantes(fecha_inic),
  id_rol INTEGER NOT NULL REFERENCES roles(id),
  PRIMARY KEY (id_integrante,fecha_inicio,id_rol)
);

CREATE TABLE IF NOT EXISTS eventos_anuales_sems(
  id SERIAL,
  id_escuela INTEGER NOT NULL REFERENCES escuelas_samba(id),
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  tipo VARCHAR(9) NOT NULL,
  nombre VARCHAR(30) NOT NULL,
  costo_unit INTEGER NOT NULL,
  descripcion VARCHAR(500),
  asist_total INTEGER,
  PRIMARY KEY(id,id_escuela)
);

CREATE TABLE IF NOT EXISTS premios_especiales(
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(35) NOT NULL UNIQUE,
  tipo VARCHAR(35) NOT NULL,
  descripcion VARCHAR(500) NOT NULL,
  id_lugar INTEGER NOT NULL REFERENCES lugares_geo(id)
);

CREATE TABLE IF NOT EXISTS ganadores(
  anual INTEGER NOT NULL,
  id_premio INTEGER NOT NULL REFERENCES premios_especiales(id),
  id_escuela REFERENCES escuelas_samba(id),
  id_intg INTEGER REFERENCES historicos_integrantes(id_integrante),
  fecha_inicio DATE REFERENCES historicos_integrantes(fecha_inic),
  PRIMARY KEY(anual,id_premio)
);