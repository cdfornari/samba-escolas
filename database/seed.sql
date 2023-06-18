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

INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Dirección','Sabe dirigir, organizar y coordinar a un grupo de personas');
INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Danza','Domina el movimiento de su cuerpo al ritmo de la música');
INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Batería','Tiene destreza con el instrumento y sabe poner ritmo a la samba');
INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Canto','Su voz produce sonido melodiosos');
INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Creatividad','Consigue crear nuevas ideas y conceptos');
INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Enseñanza','Transmite su conocimiento efectivamente a los demás');
INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Chocalho','Tiene destreza con el instrumento y apoya a mantener el ritmo de los tambores');

INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Danilo',NULL,'Prímola',NULL,NULL,'05-05-85','M','brasilero','A12JA4Y1-2');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Catarina',NULL,'Prímola',NULL,'Cat','09-26-88','F','brasilero','2YH749I-0');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Michiru',NULL,'Sadame',NULL,NULL,'09-20-89','F','japones','A725894-Y');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Francisco',NULL,'Gonçalves',NULL,NULL,'04-16-72','M','brasilero','6DAU5FRT-9');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Roseni',NULL,'Gomes',NULL,NULL,'08-16-75','F','brasilero','34RGAH11-4');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Marco','Aurelio','Gonçalves',NULL,NULL,'10-20-68','M','brasilero','HT5AU821-8');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Luciana',NULL,'Luanda',NULL,NULL,'08-13-93','F','brasilero','6YASDH2K-2');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Vagner',NULL,'Lourenco',NULL,NULL,'06-22-2004','M','brasilero','YA678LPQ-1');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Fabiana',NULL,'Caren',NULL,NULL,'11-28-88','F','brasilero','UHJ16AYU-4');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Bruna',NULL,'Santos','Portabandera',NULL,'05-18-88','F','brasilero','817JAI86-1');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Zé','Paulo','Ferreira','Sierra',NULL,'04-22-76','M','brasilero','16YU8L23-7');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('George',NULL,'Lozada',NULL,NULL,'11-23-94','M','brasilero','7UL6456A-9');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Alessandro',NULL,'Oliviera','Santana','Batata','01-13-87','M','brasilero','62HOL4P2-3');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Drika',NULL,'Santos',NULL,NULL,'06-11-71','F','brasilero','6YA8WOTH-2');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Cassiano',NULL,'Andrade',NULL,NULL,'12-01-90','M','brasilero','NB1267IO-1');

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

COMMIT;
