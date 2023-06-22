CREATE TABLE IF NOT EXISTS csd_habilidades (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(40) NOT NULL UNIQUE, 
  descripcion TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS csd_integrantes (
  id SERIAL PRIMARY KEY,
  nombre1 VARCHAR(50) NOT NULL, 
  apellido1 VARCHAR(50) NOT NULL,
  apellido2 VARCHAR(50) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  genero CHAR(1) NOT NULL,
  nacionalidad VARCHAR(25) NOT NULL DEFAULT 'brasilero',
  rg VARCHAR(15) UNIQUE,
  nombre2 VARCHAR(50),
  apodo VARCHAR(50),
  CONSTRAINT val_genero CHECK (genero IN ('M', 'F'))
);

CREATE TABLE IF NOT EXISTS csd_integrantes_habilidades (
  id_integrante INTEGER REFERENCES csd_integrantes(id),
  id_habilidad INTEGER REFERENCES csd_habilidades(id),
  PRIMARY KEY (id_integrante, id_habilidad)
);

CREATE TABLE IF NOT EXISTS csd_parentescos(
  id_integrante_1 INTEGER REFERENCES csd_integrantes(id),
  id_integrante_2 INTEGER REFERENCES csd_integrantes(id),
  tipo VARCHAR(7) NOT NULL,
  PRIMARY KEY (id_integrante_1,id_integrante_2),
  CONSTRAINT tipo_parentesco CHECK (tipo IN ('padre','hermano','pareja'))
);

CREATE TABLE IF NOT EXISTS csd_lugares_geo(
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  tipo VARCHAR(6) NOT NULL,
  id_padre_lugar INTEGER REFERENCES csd_lugares_geo(id),
  CONSTRAINT nombres_tipo CHECK (tipo IN ('region','estado','ciudad'))
);

CREATE TABLE IF NOT EXISTS csd_escuelas_samba(
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  direccion_sede VARCHAR(30) NOT NULL,
  numero INTEGER NOT NULL,
  cep VARCHAR(9) NOT NULL,
  fecha_fundacion DATE NOT NULL,
  resumen_historico VARCHAR(600) NOT NULL,
  id_ciudad INTEGER NOT NULL REFERENCES csd_lugares_geo(id),
  gres BOOLEAN,
  descripcion VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS csd_colores(
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(15) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS csd_escuelas_colores(
  id_escuela INTEGER REFERENCES csd_escuelas_samba(id),
  id_color INTEGER REFERENCES csd_colores(id),
  PRIMARY KEY (id_escuela,id_color)
);

CREATE TABLE IF NOT EXISTS csd_historicos_integrantes(
  fecha_inicio DATE,
  id_integrante INTEGER REFERENCES csd_integrantes(id),
  id_escuela INTEGER NOT NULL REFERENCES csd_escuelas_samba(id),
  autoridad CHAR(2) NOT NULL,
  fecha_fin DATE,
  PRIMARY KEY (fecha_inicio,id_integrante,id_escuela)
);

CREATE TABLE IF NOT EXISTS csd_historicos_titulos(
  anual INTEGER,
  id_escuela INTEGER REFERENCES csd_escuelas_samba(id),
  grupo VARCHAR(10),
  monto INTEGER,
  PRIMARY KEY (anual,id_escuela)
);

CREATE TABLE IF NOT EXISTS csd_patroc_juridicos(
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  cnpj VARCHAR(18) NOT NULL UNIQUE,
  email VARCHAR(35) NOT NULL,
  id_lugar INTEGER NOT NULL REFERENCES csd_lugares_geo(id),
  dir VARCHAR(50),
  numero INTEGER,
  cep VARCHAR(9)
);

CREATE TABLE IF NOT EXISTS csd_patroc_naturales(
  id SERIAL PRIMARY KEY,
  nombre1 VARCHAR(15) NOT NULL,
  apellido1 VARCHAR(15) NOT NULL,
  apellido2 VARCHAR(15) NOT NULL,
  rg VARCHAR(15) NOT NULL UNIQUE,
  email VARCHAR(35) NOT NULL,
  nombre2 VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS csd_historicos_patrocinios(
  id SERIAL,
  id_escuela INTEGER REFERENCES csd_escuelas_samba(id),
  fecha_inicio DATE NOT NULL,
  id_jur INTEGER REFERENCES csd_patroc_juridicos(id),
  id_nat INTEGER REFERENCES csd_patroc_naturales(id),
  fecha_fin DATE,
  PRIMARY KEY (id,id_escuela)
);

CREATE TABLE IF NOT EXISTS csd_donaciones(
  id SERIAL,
  id_patroc INTEGER,
  id_escuela INTEGER,
  fecha DATE NOT NULL,
  monto FLOAT(2) NOT NULL,
  FOREIGN KEY (id_patroc,id_escuela) REFERENCES csd_historicos_patrocinios(id,id_escuela),
  PRIMARY KEY (id,id_patroc,id_escuela)
);

CREATE TABLE IF NOT EXISTS csd_telefonos(
  cod_int INTEGER,
  cod_area INTEGER,
  numero INTEGER,
  id_escuela INTEGER REFERENCES csd_escuelas_samba(id),
  id_jur INTEGER REFERENCES csd_patroc_juridicos(id),
  id_nat INTEGER REFERENCES csd_patroc_naturales(id),
  PRIMARY KEY (cod_int,cod_area,numero)
);

CREATE TABLE IF NOT EXISTS csd_sambas(
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL UNIQUE,
  letra TEXT NOT NULL,
  anual_carnv INTEGER NOT NULL,
  tipo VARCHAR(20) NOT NULL,
  CONSTRAINT tipos_samba CHECK (tipo IN ('enredo','deco','emablo','marchinha','frevo','maracatu','reggae'))
);

CREATE TABLE IF NOT EXISTS csd_autores(
  id_integrante INTEGER,
  fecha_inicio DATE,
  id_escuela INTEGER,
  id_samba INTEGER REFERENCES csd_sambas(id),
  FOREIGN KEY (id_integrante,fecha_inicio,id_escuela) REFERENCES csd_historicos_integrantes(id_integrante,fecha_inicio,id_escuela),
  PRIMARY KEY (id_integrante,fecha_inicio,id_samba)
);

CREATE TABLE IF NOT EXISTS csd_roles(
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  descripcion VARCHAR(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS csd_org_carnavales(
  id_integrante INTEGER,
  fecha_inicio DATE,
  id_escuela INTEGER,
  id_rol INTEGER REFERENCES csd_roles(id),
  anual INTEGER,
  FOREIGN KEY (id_integrante,fecha_inicio,id_escuela) REFERENCES csd_historicos_integrantes(id_integrante,fecha_inicio,id_escuela),
  PRIMARY KEY (id_integrante,fecha_inicio,anual,id_rol)
);

CREATE TABLE IF NOT EXISTS csd_eventos_anuales_sems(
  id SERIAL,
  id_escuela INTEGER REFERENCES csd_escuelas_samba(id),
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  tipo VARCHAR(7) NOT NULL,
  nombre VARCHAR(30) NOT NULL,
  costo_unit FLOAT(2) NOT NULL,
  descripcion VARCHAR(500),
  asist_total INTEGER,
  CONSTRAINT tipo_evento CHECK (tipo IN ('n_samba','general')),
  PRIMARY KEY(id,id_escuela)
);

CREATE TABLE IF NOT EXISTS csd_premios_especiales(
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  tipo VARCHAR(10) NOT NULL,
  descripcion VARCHAR(100) NOT NULL,
  id_lugar INTEGER NOT NULL REFERENCES csd_lugares_geo(id)
  CONSTRAINT tipo_premio CHECK (tipo IN ('escola','integrante'))
);

CREATE TABLE IF NOT EXISTS csd_ganadores(
  anual INTEGER,
  id_premio INTEGER REFERENCES csd_premios_especiales(id),
  id_escuela INTEGER REFERENCES csd_escuelas_samba(id),
  id_escuela_integrante INTEGER,
  id_integrante INTEGER,
  fecha_inicio DATE,
  FOREIGN KEY (id_integrante,fecha_inicio,id_escuela_integrante) REFERENCES csd_historicos_integrantes(id_integrante,fecha_inicio,id_escuela),
  PRIMARY KEY(anual,id_premio)
);