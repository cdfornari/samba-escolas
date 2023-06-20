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
VALUES ('Nissan Automoveis','04.104.117/0008-42','nissan.fiscal@nissan.com.br',3,'Av. Barão de Tefé, Saúde',27,'20220-460');

INSERT INTO csd_telefonos(cod_int,cod_area,numero,id_escuela) VALUES (55,31,994274064,2);
INSERT INTO csd_telefonos(cod_int,cod_area,numero,id_escuela) VALUES (55,31,994274064,3);
INSERT INTO csd_telefonos(cod_int,cod_area,numero,id_escuela) VALUES (55,21,32918700,4);
INSERT INTO csd_telefonos(cod_int,cod_area,numero,id_jur) VALUES (55,11,31035900,1);

INSERT INTO csd_historicos_patrocinios(id_escuela,fecha_inicio,id_jur,fecha_fin) VALUES (4,'06-01-2016',1,NULL);
INSERT INTO csd_historicos_patrocinios(id_escuela,fecha_inicio,id_jur,fecha_fin) VALUES (2,'05-01-2020',2,NULL);
INSERT INTO csd_historicos_patrocinios(id_escuela,fecha_inicio,id_jur,fecha_fin) VALUES (3,'07-01-2018',3,NULL);

INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2013,4,'UESP-2',12000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2014,4,'UESP-1',15000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2017,3,'Especial',90000);
INSERT INTO csd_historicos_titulos(anual,id_escuela,grupo,monto) VALUES (2023,2,'Especial',90000);

INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Dirección','Sabe dirigir, organizar y coordinar a un grupo de personas');
INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Danza','Domina el movimiento de su cuerpo al ritmo de la música');
INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Batería','Tiene destreza con el instrumento y sabe poner ritmo a la samba');
INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Canto','Su voz produce sonido melodiosos');
INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Creatividad','Consigue crear nuevas ideas y conceptos');
INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Enseñanza','Transmite su conocimiento efectivamente a los demás');
INSERT INTO csd_habilidades (nombre,descripcion) VALUES ('Chocalho','Tiene destreza con el instrumento y apoya a mantener el ritmo de los tambores');

INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Danillo',NULL,'Prímola',NULL,NULL,'05-05-85','M','brasilero','A12JA4Y1-2');
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
VALUES ('Bruna',NULL,'Santos',NULL,NULL,'05-18-88','F','brasilero','817JAI86-1');
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
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Diego','Pereira','Nicolau','de Oliviera',NULL,'03-01-82','M','brasilero','AH25AY8I-7');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Pê',NULL,'Santana',NULL,NULL,'04-07-79','M','brasilero','6QTYA201-5');
INSERT INTO csd_integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('João','Eduardo','de Salles','Nobre','Dudu','11-06-73','M','brasilero','3T52F901-5');

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
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (3,'12-01-2021',2,1,2023);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (4,'03-01-2012',2,1,2023);
INSERT INTO csd_org_carnavales(id_integrante,fecha_inicio,id_escuela,id_rol,anual) VALUES (5,'03-01-2012',2,1,2023);
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

INSERT INTO csd_autores(id_integrante,fecha_inicio,id_escuela,id_samba) VALUES (16,'11-30-2013',3,1);
INSERT INTO csd_autores(id_integrante,fecha_inicio,id_escuela,id_samba) VALUES (18,'12-15-2013',3,1);
INSERT INTO csd_autores(id_integrante,fecha_inicio,id_escuela,id_samba) VALUES (17,'12-02-2011',4,2);

INSERT INTO csd_premios_especiales(nombre,tipo,descripcion,id_lugar) VALUES ('Mejor comité de frente','Escuela','Mejor grupo de bailares que lideran el desfile de su escuela.',5);
INSERT INTO csd_premios_especiales(nombre,tipo,descripcion,id_lugar) VALUES ('Fernando Pamplona','Escuela','Mejor uso de materiales baratos.',3);
INSERT INTO csd_premios_especiales(nombre,tipo,descripcion,id_lugar) VALUES ('Estandarte de Oro','Escuela','Mejor escuela de samba',3);

INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (2023,1,2);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (2023,2,3);
INSERT INTO csd_ganadores(anual,id_premio,id_escuela) VALUES (1991,3,3);

COMMIT;
