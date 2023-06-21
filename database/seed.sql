BEGIN;

INSERT INTO csd_lugares_geo (nombre, tipo) VALUES ('Sudeste','region');
INSERT INTO csd_lugares_geo (nombre, tipo, id_padre_lugar) VALUES ('Rio de Janeiro', 'estado', 1);
INSERT INTO csd_lugares_geo (nombre, tipo, id_padre_lugar) VALUES ('Rio de Janeiro', 'ciudad', 2);
INSERT INTO csd_lugares_geo (nombre, tipo, id_padre_lugar) VALUES ('Minas Gerais','estado',1);
INSERT INTO csd_lugares_geo (nombre, tipo, id_padre_lugar) VALUES('Belo Horizonte','ciudad',4);
INSERT INTO csd_lugares_geo (nombre, tipo, id_padre_lugar) VALUES('São Paulo','estado',1);
INSERT INTO csd_lugares_geo (nombre, tipo, id_padre_lugar) VALUES('São Paulo','ciudad',6);

INSERT INTO csd_escuelas_samba (nombre, direccion_sede, numero, cep, fecha_fundacion, resumen_historico, id_ciudad, gres, descripcion)
VALUES ('Imperatriz Leopoldinense', ' R. Professor Lacé', 235, '59155-190', '03-06-1956', 'Fundada el 6 de marzo de 1959 por el farmacéutico Amaury Jório, junto con algunos sambistas de la Zona Leopoldina y remanentes de la extinta asociación Recreio de Ramos, su nombre hace referencia al Ferrocarril Leopoldina -que atravesaba el barrio de Ramos- y que, a su vez, , recibió este nombre en referencia a la emperatriz María Leopoldina de Brasil', 3, TRUE, 'La mejor escola de samba de Rio de Janeiro');
INSERT INTO csd_escuelas_samba (nombre, direccion_sede, numero, cep, fecha_fundacion, resumen_historico, id_ciudad, gres, descripcion)
VALUES ('Acadêmicos de Venda Nova','Rua Soldado Manoel Ferreira',146,'31515-330','12-01-2004','La Escuela de Samba fue fundada el 1 de diciembre de 2004, en el barrio São João Batista, Belo Horizonte, por un grupo de familiares. En la casa de la matriarca Arabela Gonçalves, sus hijos Marco Aurélio (primer presidente y diseñador del carnaval), Francisco, Ricardo y Janaína, así como su hermana Adélia Rubini, tenían el sueño de desfilar con una comunidad que no tenía tradición en la cultura de la samba. La sede de la asociación sigue estando en la casa de la familia, a veces los ensayos se realizan sobre el asfalto, en plena calle, con el apoyo de extras y del barrio.',5,TRUE,'Una escuela de amor, arte y cultura');
INSERT INTO csd_escuelas_samba (nombre, direccion_sede, numero, cep, fecha_fundacion, resumen_historico, id_ciudad, gres, descripcion) 
VALUES ('Mocidade Independente de Padre Miguel','Av. Brasil',31146,'21720-001','11-10-1955','Fue fundada el 10 de noviembre de 1955 por Sílvio Trindade, Renato da Silva, Djalma Rosa, Olímpio Bonifácio (Bronquinha), Ary de Lima, Jorge Avelino da Silva, Orozimbo de Oliveira (Seu Orozimbo), Garibaldi F. Lima, Felipe de Souza (Pavão), José Pereira da Silva y Alfredo Briggs, de un equipo de fútbol amateur en ese momento, Independente Futebol Clube. Sin embargo, su mayor crecimiento fue a partir de la década de 1970.',3,TRUE,'Por eso se dice que la juventud reinará en la eternidad del carnaval divino');
INSERT INTO csd_escuelas_samba (nombre, direccion_sede, numero, cep, fecha_fundacion, resumen_historico, id_ciudad, gres, descripcion)
VALUES ('Independente Tricolor','Rua Doze de Setembro',259,'02051-001','10-13-2010','A principios de la década de 2000, la hinchada de Independente comenzó a organizarse para participar en el Carnaval de São Paulo, como otras asociaciones. Para eso se creó el Bloque Independiente. El bloque se convirtió en una escuela de samba, pero no compitió ni participó en el carnaval oficial. En 2009, incorporó Malungos, y adoptando el nombre de "Grêmio Recreativo Cultural e Escola de Samba Malungos Independente", participó del Carnaval de 2010. En 2012, la escuela pasó a llamarse simplemente "Grêmio Recreativo e Cultural Escola de Samba Independente Tricolor".',7,TRUE,'La casa Independiente Tricolor nació para dar la oportunidad a jóvenes y niños de todas las edades.');
INSERT INTO csd_escuelas_samba (nombre, direccion_sede, numero, cep, fecha_fundacion, resumen_historico, id_ciudad, gres, descripcion)
VALUES ('Unidos do Peruche', 'Rua Samaritá', 1040, '02518-080', '01-04-1956', 'Fundada el 4 de enero de 1956 por un grupo de amigos que vivían en el barrio de Vila Peruche, en la Zona Norte de São Paulo. En 1960, la escuela se convirtió en una asociación civil sin fines de lucro, y en 1961, se convirtió en una escuela de samba. En 1968, la escuela se convirtió en una escuela de samba de primera división, y en 1970, se convirtió en una escuela de samba de primera división.', 7, TRUE, 'Una de las escuelas de samba más tradicionales de la ciudad de São Paulo y de Brasil');
INSERT INTO csd_escuelas_samba (nombre, direccion_sede, numero, cep, fecha_fundacion, resumen_historico, id_ciudad, gres, descripcion)
VALUES ('Beija Flor de Nilopolis', 'Rua Pracinha Wallace Paes Leme', 1025, '26050-032', '12-25-1948', 'Beija-Flor de Nilópolis nació durante las celebraciones navideñas de 1948. Un grupo formado por Milton de Oliveira (Negão da Cuíca), Edson Vieira Rodrigues (Edinho do Ferro Velho), Helles Ferreira da Silva, Mário Silva, Walter da Silva, Hamilton Floriano y José Fernandes da Silva, decidieron formar un grupo que, después de varias discusiones, por sugerencia de D. Eulália de Oliveira, madre de Milton, se llamó Beija-Flor (inspirado en el Rancho Beija-Flor, que existía en Marquês desde Valencia). Doña Eulália fue admitida como fundadora.', 3, TRUE, 'Una de las escuelas de samba más exitosas en la historia del Carnaval en Río de Janeiro. El nombre Beija-Flor significa "colibrí" en portugués, y el emblema de la escuela es un colibrí estilizado');

INSERT INTO csd_colores (nombre) VALUES ('azul');
INSERT INTO csd_colores (nombre) VALUES ('rosa');
INSERT INTO csd_colores (nombre) VALUES ('rojo');
INSERT INTO csd_colores (nombre) VALUES ('negro');
INSERT INTO csd_colores (nombre) VALUES ('blanco');
INSERT INTO csd_colores (nombre) VALUES ('verde');
INSERT INTO csd_colores (nombre) VALUES ('amarillo');
INSERT INTO csd_colores (nombre) VALUES ('oro');

INSERT INTO csd_escuelas_colores (id_escuela,id_color) VALUES (1,5);
INSERT INTO csd_escuelas_colores (id_escuela,id_color) VALUES (1,6);
INSERT INTO csd_escuelas_colores (id_escuela,id_color) VALUES (1,8);
INSERT INTO csd_escuelas_colores (id_escuela,id_color) VALUES (2,1);
INSERT INTO csd_escuelas_colores (id_escuela,id_color) VALUES (2,2);
INSERT INTO csd_escuelas_colores (id_escuela,id_color) VALUES (3,3);
INSERT INTO csd_escuelas_colores (id_escuela,id_color) VALUES (3,4);
INSERT INTO csd_escuelas_colores (id_escuela,id_color) VALUES (3,5);
INSERT INTO csd_escuelas_colores (id_escuela,id_color) VALUES (4,5);
INSERT INTO csd_escuelas_colores (id_escuela,id_color) VALUES (4,6);
INSERT INTO csd_escuelas_colores (id_escuela,id_color) VALUES (5,1);
INSERT INTO csd_escuelas_colores (id_escuela,id_color) VALUES (5,5);
INSERT INTO csd_escuelas_colores (id_escuela,id_color) VALUES (5,6);
INSERT INTO csd_escuelas_colores (id_escuela,id_color) VALUES (5,7);
INSERT INTO csd_escuelas_colores (id_escuela,id_color) VALUES (6,1);
INSERT INTO csd_escuelas_colores (id_escuela,id_color) VALUES (6,5);

INSERT INTO csd_patroc_juridicos(nombre,cnpj,email,id_lugar,dir,numero,cep)
VALUES ('Caixa Economica Federal','00.360.305/0238-21','ag0238@caixa.gov.br',7,'Avenida Paulista, Bela Vista',1708,'01310-918');
INSERT INTO csd_patroc_juridicos(nombre,cnpj,email,id_lugar,dir,numero,cep)
VALUES ('Cervejarias Skol','33.719.311/0001-64','opobrigaces@ambev.com.br',7,NULL,NULL,NULL);
INSERT INTO csd_patroc_juridicos(nombre,cnpj,email,id_lugar,dir,numero,cep)
VALUES ('Nissan Automoveis','04.104.117/0008-42','nissan.fiscal@nissan.com.br',3,'Av. Barão de Tefé, Saúde',27,'20220-460');
INSERT INTO csd_patroc_juridicos(nombre,cnpj,email,id_lugar,dir,numero,cep)
VALUES ('Coca Cola','45.997.418/0018-00','contacto@cocacola.com.br',3,'Praia de Botafogo',374,'22250-040');
INSERT INTO csd_patroc_juridicos(nombre,cnpj,email,id_lugar,dir,numero,cep)
VALUES ('Banco do Brasil','00.000.000/0001-91','bbasset@bb.com.br',3,'Avenida República do Chile',330,'20031-170');
INSERT INTO csd_patroc_juridicos(nombre,cnpj,email,id_lugar,dir,numero,cep)
VALUES ('Ambev','07.526.557/0001-00','ambev@loures.com.br',7,'Rua Dr. Renato Paes de Barros',1017,'04530-001');

INSERT INTO csd_patroc_naturales(nombre1,nombre2,apellido1,apellido2,rg,email) VALUES ('Milton',NULL,'Leite','Filho','125A7G7A-9','fale@miltonleitefilho44250.com.br');
INSERT INTO csd_patroc_naturales(nombre1,nombre2,apellido1,apellido2,rg,email) VALUES ('Fabiano',NULL,'Lopes','Ferreira','24RT7841-0','fabianocazeca@gmail.com.br');
INSERT INTO csd_patroc_naturales(nombre1,nombre2,apellido1,apellido2,rg,email) VALUES ('Carlinhos',NULL,'Mendes','de Jesus','635THY00-2','rachel.cdcj@gmail.com');

INSERT INTO csd_telefonos(cod_int,cod_area,numero,id_escuela) VALUES (55,31,994274064,2);
INSERT INTO csd_telefonos(cod_int,cod_area,numero,id_escuela) VALUES (55,21,33325823,3);
INSERT INTO csd_telefonos(cod_int,cod_area,numero,id_escuela) VALUES (55,11,959634746,4);
INSERT INTO csd_telefonos(cod_int,cod_area,numero,id_escuela) VALUES (55,11,982724128,5);
INSERT INTO csd_telefonos(cod_int,cod_area,numero,id_jur) VALUES (55,11,31035900,1);
INSERT INTO csd_telefonos(cod_int,cod_area,numero,id_jur) VALUES (55,21,21349000,3);
INSERT INTO csd_telefonos(cod_int,cod_area,numero,id_jur) VALUES (55,21,38087500,5);
INSERT INTO csd_telefonos(cod_int,cod_area,numero,id_nat) VALUES (55,11,55417755,1);
INSERT INTO csd_telefonos(cod_int,cod_area,numero,id_nat) VALUES (55,21,992239955,3);

INSERT INTO csd_historicos_patrocinios(id_escuela,fecha_inicio,id_jur,fecha_fin) VALUES (4,'06-01-2016',1,NULL);
INSERT INTO csd_historicos_patrocinios(id_escuela,fecha_inicio,id_jur,fecha_fin) VALUES (2,'05-01-2020',2,NULL);
INSERT INTO csd_historicos_patrocinios(id_escuela,fecha_inicio,id_jur,fecha_fin) VALUES (3,'07-01-2018',3,NULL);

INSERT INTO csd_donaciones(id_patroc,id_escuela,fecha,monto) VALUES (1,4,'08-03-2016',15000);
INSERT INTO csd_donaciones(id_patroc,id_escuela,fecha,monto) VALUES (2,2,'06-10-2020',15000);
INSERT INTO csd_donaciones(id_patroc,id_escuela,fecha,monto) VALUES (3,3,'10-20-2019',25000);

INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2013,4,'UESP-2',12000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2014,4,'UESP-1',15000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2017,3,'Especial',90000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2023,2,'Especial',90000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (1980,1,'Grupo 1A',5000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (1981,1,'Grupo 1A',7500);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (1989,1,'Grupo 1',20000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (1994,1,'Especial',20000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (1995,1,'Especial',20000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (1999,1,'Especial',30000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2000,1,'Especial',30000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2001,1,'Especial',30000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2020,1,'Serie A',40000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2023,1,'Especial',90000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (1965,5,'Grupo 1',5000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (1966,5,'Grupo 1',5000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (1967,5,'Grupo 1',5000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (1981,5,'Grupo 2',3000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2008,5,'Acceso',10000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2015,5,'Acceso',15000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (1976,6,'Grupo 1',5000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (1977,6,'Grupo 1',5000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (1978,6,'Grupo 1',5000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (1980,6,'Grupo 1A',5000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (1983,6,'Grupo 1A',5000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (1998,6,'Especial',30000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2003,6,'Especial',30000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2004,6,'Especial',30000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2005,6,'Especial',30000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2007,6,'Especial',50000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2008,6,'Especial',50000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2011,6,'Especial',50000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2015,6,'Especial',90000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2018,6,'Especial',90000);

INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Dirección','Sabe dirigir, organizar y coordinar a un grupo de personas');
INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Danza','Domina el movimiento de su cuerpo al ritmo de la música');
INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Batería','Tiene destreza con el instrumento y sabe poner ritmo a la samba');
INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Canto','Su voz produce sonido melodiosos');
INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Creatividad','Consigue crear nuevas ideas y conceptos');
INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Enseñanza','Transmite su conocimiento efectivamente a los demás');
INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Chocalho','Tiene destreza con el instrumento y apoya a mantener el ritmo de los tambores');
INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Composición','Tiene la habilidad de componer canciones y melodías');

INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Danillo',NULL,'Prímola','Mendes',NULL,'05-05-1985','M','brasilero','A12JA4Y1-2');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Catarina',NULL,'Prímola','Sosa','Cat','09-26-1988','F','brasilero','2YH749I-0');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Michiru',NULL,'Sadame','Nakamara',NULL,'09-20-1989','F','japones','A725894-Y');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Francisco',NULL,'Gonçalves','Aveiro',NULL,'04-16-1972','M','brasilero','6DAU5FRT-9');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Roseni',NULL,'Gomes','Inhildo',NULL,'08-16-1975','F','brasilero','34RGAH11-4');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Marco','Aurelio','Gonçalves','Santos',NULL,'10-20-1968','M','brasilero','HT5AU821-8');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Luciana',NULL,'Luanda','Tello',NULL,'08-13-1993','F','brasilero','6YASDH2K-2');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Vagner',NULL,'Lourenco','Freitas',NULL,'06-22-2004','M','brasilero','YA678LPQ-1');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Fabiana',NULL,'Caren','Silva',NULL,'11-28-1988','F','brasilero','UHJ16AYU-4');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Bruna',NULL,'Santos','Oliveira',NULL,'05-18-1988','F','brasilero','817JAI86-1');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Zé','Paulo','Ferreira','Sierra',NULL,'04-22-1976','M','brasilero','16YU8L23-7');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('George',NULL,'Lozada','Alves',NULL,'11-23-1994','M','brasilero','7UL6456A-9');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Alessandro',NULL,'Oliveira','Santana','Batata','01-13-1987','M','brasilero','62HOL4P2-3');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Drika',NULL,'Santos','Rodrigues',NULL,'06-11-1971','F','brasilero','6YA8WOTH-2');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Cassiano',NULL,'Andrade','Almao',NULL,'12-01-1990','M','brasilero','NB1267IO-1');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Diego','Pereira','Nicolau','de Oliviera',NULL,'03-01-1982','M','brasilero','AH25AY8I-7');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Pê',NULL,'Santana','Reyes',NULL,'04-07-1979','M','brasilero','6QTYA201-5');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('João','Eduardo','de Salles','Nobre','Dudu','11-06-1973','M','brasilero','3T52F901-5');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Leandro', NULL,'Vieira','Oliveira',NULL,'07-25-1983','M','brasilero','4SD2K201-5');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Mauro', 'Henrique','Amorim','Silva',NULL,'08-15-1980','M','brasilero','5SS9K201-1');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Cassio', NULL,'Dias','Moura',NULL,'11-08-1986','M','brasilero','2US9K8U7-3');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Neide', NULL,'Tamborim','Leite',NULL,'03-12-1962','F','brasilero','1A34L087-3');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Selma', NULL,'de Matos','Rocha','Selminha Sorriso','05-30-1971','F','brasilero','5B37L884-9');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Alessandro', NULL,'Lopes','Dias','Zoio','05-30-1979','M','brasilero','8U2T5884-9');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Marcel', NULL,'Bonfim','Zeca',NULL,'11-27-1974','M','brasilero','4UT05281-3');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Claudio', NULL,'de Souza','Dias','Claudinho','05-04-1972','M','brasilero','1E9I72Y1-2');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Phelipe', NULL,'Lemos','Guedes',NULL,'03-31-1989','M','brasilero','9Y4I80A1-8');

INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (1,1);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (1,2);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (1,6);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (2,1);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (2,2);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (2,6);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (3,1);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (3,2);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (3,6);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (4,1);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (5,2);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (6,1);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (6,5);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (7,2);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (8,7);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (9,2);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (10,2);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (11,4);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (12,2);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (13,1);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (14,2);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (15,1);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (15,2);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (16,4);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (16,5);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (17,4);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (17,5);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (18,4);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (18,5);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (19,2);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (19,5);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (20,1);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (21,2);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (22,2);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (23,2);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (25,3);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (26,2);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (26,3);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (26,6);
INSERT INTO csd_integrantes_habilidades (id_integrante,id_habilidad) VALUES (26,8);

INSERT INTO csd_parentescos (id_integrante_1,id_integrante_2,tipo) VALUES (1,2,'pareja');

INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('01-29-2015',1,2,'no','03-12-2023');
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('09-21-2021',2,2,'no',NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('12-01-2022',3,2,'no',NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('03-01-2012',4,2,'si',NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('05-01-2021',5,2,'no',NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('01-13-2013',6,2,'no',NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('02-25-2020',7,2,'no',NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('02-02-2019',8,2,'no',NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('02-26-2019',9,2,'no',NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('11-28-2017',10,3,'no',NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('03-23-2023',11,3,'no',NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('04-19-2011',12,3,'no',NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('10-13-2010',13,4,'si',NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('01-15-2016',14,4,'no',NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('05-02-2022',15,4,'no',NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('11-30-2013',16,3,'no','03-15-2016');
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('12-12-2021',16,3,'no',NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('12-02-2011',17,4,'no','03-10-2018');
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('01-10-2021',17,4,'no','04-19-2023');
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('12-15-2013',18,3,'no','03-29-2014');
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('01-15-2022',19,1,'no',NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('01-15-2018',20,1,'no',NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('07-19-2015',21,6,'no',NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('05-04-1977',22,6,'no','02-28-2018');
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('05-04-1991',23,6,'no', NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('01-15-2019',24,5,'si', NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('04-05-2023',25,5,'no', NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('01-08-1990',26,6,'no', NULL);
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('01-10-2011',27,1,'no', '04-10-2015');
INSERT INTO csd_historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('01-18-2023',27,1,'no', NULL);

INSERT INTO csd_roles(nombre,descripcion) VALUES ('Bailarín','Se dedica a bailar y desfilar.');
INSERT INTO csd_roles(nombre,descripcion) VALUES ('Coreógrafo','Crea y diseña las coreografías para los bailarines.');
INSERT INTO csd_roles(nombre,descripcion) VALUES ('Maestro de Batería','Músico líder de la sección de percusión.');
INSERT INTO csd_roles(nombre,descripcion) VALUES ('Carnavalesco','Conceptualiza el desfile de carnaval, la temática, diseño de trajes y carrozas, organización del espectáculo, etc.');
INSERT INTO csd_roles(nombre,descripcion) VALUES ('Presidente','Lidera y coordina la organización de la escuela');
INSERT INTO csd_roles(nombre,descripcion) VALUES ('Portabandera','Desfila portando la bandera de la escuela.');
INSERT INTO csd_roles(nombre,descripcion) VALUES ('Intérprete','Canta y lidera el coro.');
INSERT INTO csd_roles(nombre,descripcion) VALUES ('Coordinador de ala de bailarines','Organiza la disposición de los bailarines.');
INSERT INTO csd_roles(nombre,descripcion) VALUES ('Ritmista','Apoya a las baterías con el ritmo de la samba.');

INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (1,'01-29-2015',2,2,2023);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (2,'09-21-2021',2,2,2023);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (3,'12-01-2022',2,1,2023);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (4,'03-01-2012',2,1,2023);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (5,'05-01-2021',2,1,2023);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (6,'01-13-2013',2,4,2023);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (7,'02-25-2020',2,1,2022);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (8,'02-02-2019',2,9,2022);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (9,'02-26-2019',2,1,2022);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (10,'11-28-2017',3,6,2023);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (12,'04-19-2011',3,8,2023);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (13,'10-13-2010',4,5,2023);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (13,'10-13-2010',4,5,2022);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (13,'10-13-2010',4,5,2020);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (13,'10-13-2010',4,5,2019);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (13,'10-13-2010',4,5,2018);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (13,'10-13-2010',4,5,2017);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (13,'10-13-2010',4,5,2016);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (13,'10-13-2010',4,5,2015);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (13,'10-13-2010',4,5,2014);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (13,'10-13-2010',4,5,2013);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (13,'10-13-2010',4,5,2012);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (13,'10-13-2010',4,5,2011);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (13,'10-13-2010',4,5,2010);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (14,'01-15-2016',4,1,2023);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (14,'01-15-2016',4,1,2022);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (14,'01-15-2016',4,1,2020);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (14,'01-15-2016',4,1,2019);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (14,'01-15-2016',4,1,2018);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (14,'01-15-2016',4,1,2017);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (14,'01-15-2016',4,1,2016);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (15,'05-02-2022',4,3,2023);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (16,'11-30-2013',3,7,2014);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (17,'12-02-2011',4,7,2014);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (18,'12-15-2013',3,7,2014);

INSERT INTO csd_sambas(titulo,letra,anual_carnv,tipo) VALUES ('Pernambucópolis','Eita saudade danada
Vim das estrelas com meu ziriguidum
"Parece que estou sonhando"
Meus olhos reencontrando
Minha gente, meu lugar
É Vitalino ao som do baião
Tem batucada no meu São João
"Vixe Maria" me dê proteção
Rodei ciranda com os pés na areia
Toquei viola sob a lua cheia

Chegue venha cá forrozear
Zabumbei meu coração
Puxa o fole sanfoneiro
"Arretado" é meu sertão

Ah, meu Pernambuco ...
Sou mameluco, do Norte sou Leão
Um peregrino personagem de cordel
Levo comigo meu "padim Padre Miguel"
Eu danço frevo até o dia clarear
No colorido do folclore vem brincar
Abre a sombrinha que o "Galo" madrugou
Também tem festa em Olinda, meu amor!
Vejam quanta alegria vou levar
Viver um sonho no espaço sideral
Da pioneira, ergo a bandeira
"Pernambucópolis" meu carnaval!

Louco de paixão, sempre vou te amar
Luz da emoção no meu cantar
Independente na identidade
Com muito orgulho, "eu sou Mocidade"!',2014,'enredo');

INSERT INTO csd_sambas(titulo,letra,anual_carnv,tipo) VALUES ('Canção Paulistana','Fonte de inspiração da minha canção
e de tantos artistas imortais
Eis a Lira Paulistana
quanta saudade você me traz!
Lendária terra da garoa
Já não existem mais os lampiões de gás.

Trem das onze e tradição estão na história
da sinfonia que ecoa pelo ar,
com poesias, ricas melodias,
que ainda hoje o povo vive a cantar.

De noite eu rondo a cidade,
encontrei o meu amor.
É Sampa, quanta emoção.
Quando cruzo a Ipiranga e a Avenida São João.
(Bis)

E assim vou curtindo a cidade.
"Realidade" que me enche de prazer,
"sonhando" amanhece trabalhando,
com suas tribos, não para de crescer.

Aqui tudo acontece
e o samba "dos Bambas" frutificou.
Oh Paulicéia desvairada! Tão amada!
Multicultural, taí o nosso carnaval.

Sou Independente de coração.
Carrego no peito amor e paixão.
Traduzo em versos pra te exaltar.
São Paulo para sempre vou te amar.
(Bis)',2014,'enredo');

INSERT INTO csd_sambas(titulo,letra,anual_carnv,tipo) VALUES ('Samba No Pé, Lança Na Mão, Isso É Uma Invasão','Um guerreiro valente eu sou
Se preciso for eu vou
Além do infinito defender você
Sou Independente até morrer

É mais que uma lenda imortal
Que o poeta eternizou
Vou bordar meu carnaval
Numa história de amor
Se os destinos são traçados
Se encontram frente a frente
Sou mais você
Independente
Forjam-se lanças e espadas
Os deuses e a vida
De Troia à Esparta
A paixão proibida
Sentimento e traição
Atravessou o mar
O Sol a lhe guiar
O sonho realizar

Ooo no olimpo, na terra
E nos mares bravios
Ooo olhares de fogo
E o corte dos fios

De um lado mil barcos
De tantas cidades
Do outros arqueiros
Defendem a muralha
O herói que afronta
Não é divindade
Mas vence a coragem
E tantas batalhas
Sem medo chega o presente grego
Dentro dele um segredo
A flecha que tarda, certeira não falha
Avante minha escola
Rumo à vitória
Este é nosso lugar
Conquiste a avenida
A invasão vai começar',2023,'enredo');

INSERT INTO csd_autores(id_integrante,fecha_inicio,id_escuela,id_samba) VALUES (16,'11-30-2013',3,1);
INSERT INTO csd_autores(id_integrante,fecha_inicio,id_escuela,id_samba) VALUES (18,'12-15-2013',3,1);
INSERT INTO csd_autores(id_integrante,fecha_inicio,id_escuela,id_samba) VALUES (17,'12-02-2011',4,2);
INSERT INTO csd_autores(id_integrante,fecha_inicio,id_escuela,id_samba) VALUES (17,'01-10-2021',4,3);

INSERT INTO csd_premios_especiales(nombre,tipo,descripcion,id_lugar) VALUES ('Estandarte de Oro (Escuela)','escola','escola',3);
INSERT INTO csd_premios_especiales(nombre,tipo,descripcion,id_lugar) VALUES ('Estandarte de Oro (Fernando Pamplona)','escola','Mejor uso de materiales baratos.',3);
INSERT INTO csd_premios_especiales(nombre,tipo,descripcion,id_lugar) VALUES ('Estandarte de Oro (Escuela Acceso)','escola','Mejor escuela de grupo de acceso',3);
INSERT INTO csd_premios_especiales(nombre,tipo,descripcion,id_lugar) VALUES ('Estandarte de Oro (Samba-Enredo)','escola','Mejor samba enredo',3);
INSERT INTO csd_premios_especiales(nombre,tipo,descripcion,id_lugar) VALUES ('Estandarte de Oro (Enredo)','escola','Mejor enredo',3);
INSERT INTO csd_premios_especiales(nombre,tipo,descripcion,id_lugar) VALUES ('Estandarte de Oro (Batería)','escola','Mejor batería',3);
INSERT INTO csd_premios_especiales(nombre,tipo,descripcion,id_lugar) VALUES ('Estandarte de Oro (Mestre-sala)','integrante','Mejor mestre-sala',3);
INSERT INTO csd_premios_especiales(nombre,tipo,descripcion,id_lugar) VALUES ('Estandarte de Oro (Porta-bandeira)','integrante','Mejor porta-bandeira',3);
INSERT INTO csd_premios_especiales(nombre,tipo,descripcion,id_lugar) VALUES ('Estandarte de Oro (Comisión de frente)','escola','Mejor comisión de frente',3);

INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (2023,2,3);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (1978,1,6);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (1986,1,6);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (1989,1,6);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (2001,1,6);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (2001,5,6);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (2007,1,6);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (2007,4,6);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (2023,1,6);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (2017,4,6);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (2016,6,6);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (2005,4,6);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (1999,4,6);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (1996,1,1);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (2015,1,1);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (2020,3,1);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (2023,5,1);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (2015,4,1);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (2010,4,1);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (2008,4,1);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (2008,5,1);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (2006,9,1);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (2000,9,1);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (1997,9,1);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (1996,4,1);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (1993,9,1);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (1991,1,3);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (1999,1,3);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (2018,4,3);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (1996,5,3);

INSERT INTO csd_ganadores(anual,id_premio,id_escuela_integrante, id_integrante, fecha_inicio) VALUES (2009,8,6,23,'05-04-1991');
INSERT INTO csd_ganadores(anual,id_premio,id_escuela_integrante, id_integrante, fecha_inicio) VALUES (2005,8,6,23,'05-04-1991');
INSERT INTO csd_ganadores(anual,id_premio,id_escuela_integrante, id_integrante, fecha_inicio) VALUES (2002,8,6,23,'05-04-1991');
INSERT INTO csd_ganadores(anual,id_premio,id_escuela_integrante, id_integrante, fecha_inicio) VALUES (2000,8,6,23,'05-04-1991');
INSERT INTO csd_ganadores(anual,id_premio,id_escuela_integrante, id_integrante, fecha_inicio) VALUES (1998,8,6,23,'05-04-1991');
INSERT INTO csd_ganadores(anual,id_premio,id_escuela_integrante, id_integrante, fecha_inicio) VALUES (1996,7,6,26,'01-08-1990');
INSERT INTO csd_ganadores(anual,id_premio,id_escuela_integrante, id_integrante, fecha_inicio) VALUES (2002,7,6,26,'01-08-1990');
INSERT INTO csd_ganadores(anual,id_premio,id_escuela_integrante, id_integrante, fecha_inicio) VALUES (2005,7,6,26,'01-08-1990');
INSERT INTO csd_ganadores(anual,id_premio,id_escuela_integrante, id_integrante, fecha_inicio) VALUES (2006,7,6,26,'01-08-1990');
INSERT INTO csd_ganadores(anual,id_premio,id_escuela_integrante, id_integrante, fecha_inicio) VALUES (2015,7,6,26,'01-08-1990');
INSERT INTO csd_ganadores(anual,id_premio,id_escuela_integrante, id_integrante, fecha_inicio) VALUES (2023,7,6,26,'01-08-1990');
INSERT INTO csd_ganadores(anual,id_premio,id_escuela_integrante, id_integrante, fecha_inicio) VALUES (2013,7,1,27,'01-10-2011');
INSERT INTO csd_ganadores(anual,id_premio,id_escuela_integrante, id_integrante, fecha_inicio) VALUES (2014,7,1,27,'01-10-2011');

COMMIT;
