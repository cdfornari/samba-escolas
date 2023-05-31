CREATE TABLE IF NOT EXISTS habilidades (
  id SERIAL NOT NULL PRIMARY KEY,
  nombre VARCHAR(40) NOT NULL UNIQUE, 
  descripcion TEXT NOT NULL,
);

CREATE TABLE IF NOT EXISTS integrantes (
  id SERIAL NOT NULL PRIMARY KEY,
  nombre1 VARCHAR(50) NOT NULL, 
  nombre2 VARCHAR(50), 
  apellido1 VARCHAR(50) NOT NULL, 
  apellido2 VARCHAR(50) NOT NULL, 
  apodo VARCHAR(50),
  fecha_nacimiento DATE NOT NULL,
  nacionalidad VARCHAR(25) NOT NULL DEFAULT 'brasilero',
  genero CHAR NOT NULL CHECK (genero IN ('M', 'F')),
  rg VARCHAR(15) UNIQUE,
);

CREATE TABLE IF NOT EXISTS integrantes_habilidades (
  id_integrante INTEGER NOT NULL REFERENCES integrantes(id),
  id_habilidad INTEGER NOT NULL REFERENCES habilidades(id),
  PRIMARY KEY (id_integrante, id_habilidad)
);