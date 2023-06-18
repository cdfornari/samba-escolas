BEGIN;

INSERT INTO lugares_geo (nombre, tipo) VALUES ('Sudeste', 'region');
INSERT INTO lugares_geo (nombre, tipo, id_padre_lugar) VALUES ('Rio de Janeiro', 'estado', 1);
INSERT INTO lugares_geo (nombre, tipo, id_padre_lugar) VALUES ('Rio de Janeiro', 'ciudad', 2);
INSERT INTO lugares_geo (nombre, tipo) VALUES ('Sureste','region');
INSERT INTO lugares_geo (nombre, tipo, id_padre_lugar) VALUES ('Minas Gerais','estado',4);
INSERT INTO lugares_geo (nombre, tipo, id_padre_lugar) VALUES('Belo Horizonte','ciudad',5);
INSERT INTO lugares_geo (nombre, tipo, id_padre_lugar) VALUES('São Paulo','estado',1);
INSERT INTO lugares_geo (nombre, tipo, id_padre_lugar) VALUES('São Paulo','ciudad',7);
INSERT INTO lugares_geo (nombre, tipo, id_padre_lugar) VALUES('São Paulo','ciudad',7);

INSERT INTO escuelas_samba (nombre, direccion_sede, numero, cep, fecha_fundacion, resumen_historico, id_ciudad, gres, descripcion)
VALUES ('Imperatriz Leopoldinense', ' R. Professor Lacé', 235, '59155190', '03-06-1956', 'Fundada el 6 de marzo de 1959 por el farmacéutico Amaury Jório, junto con algunos sambistas de la Zona Leopoldina y remanentes de la extinta asociación Recreio de Ramos, su nombre hace referencia al Ferrocarril Leopoldina -que atravesaba el barrio de Ramos- y que, a su vez, , recibió este nombre en referencia a la emperatriz María Leopoldina de Brasil', 3, TRUE, 'La mejor escola de samba de Rio de Janeiro');
INSERT INTO escuelas_samba (nombre, direccion_sede, numero, cep, fecha_fundacion, resumen_historico, id_ciudad, gres, descripcion)
VALUES ('Acadêmicos de Venda Nova','Rua Soldado Manoel Ferreira',146,31515330,'12-01-2004','La Escuela de Samba fue fundada el 1 de diciembre de 2004, en el barrio São João Batista, Belo Horizonte, por un grupo de familiares. En la casa de la matriarca Arabela Gonçalves, sus hijos Marco Aurélio (primer presidente y diseñador del carnaval), Francisco, Ricardo y Janaína, así como su hermana Adélia Rubini, tenían el sueño de desfilar con una comunidad que no tenía tradición en la cultura de la samba. La sede de la asociación sigue estando en la casa de la familia, a veces los ensayos se realizan sobre el asfalto, en plena calle, con el apoyo de extras y del barrio.',6,TRUE,'Una escuela de amor, arte y cultura');
INSERT INTO escuelas_samba (nombre, direccion_sede, numero, cep, fecha_fundacion, resumen_historico, id_ciudad, gres, descripcion) 
VALUES ('Mocidade Independente de Padre Miguel','Av. Brasil',31146,21720-001,'11-10-1955','Fue fundada el 10 de noviembre de 1955 por Sílvio Trindade, Renato da Silva, Djalma Rosa, Olímpio Bonifácio (Bronquinha), Ary de Lima, Jorge Avelino da Silva, Orozimbo de Oliveira (Seu Orozimbo), Garibaldi F. Lima, Felipe de Souza (Pavão), José Pereira da Silva y Alfredo Briggs, de un equipo de fútbol amateur en ese momento, Independente Futebol Clube. Sin embargo, su mayor crecimiento fue a partir de la década de 1970.',3,TRUE,'Por eso se dice que la juventud reinará en la eternidad del carnaval divino');
INSERT INTO escuelas_samba (nombre, direccion_sede, numero, cep, fecha_fundacion, resumen_historico, id_ciudad, gres, descripcion)
VALUES ('Independente Tricolor','Rua Doze de Setembro',259,02051001,'10-13-2010','A principios de la década de 2000, la hinchada de Independente comenzó a organizarse para participar en el Carnaval de São Paulo, como otras asociaciones. Para eso se creó el Bloque Independiente. El bloque se convirtió en una escuela de samba, pero no compitió ni participó en el carnaval oficial. En 2009, incorporó Malungos, y adoptando el nombre de "Grêmio Recreativo Cultural e Escola de Samba Malungos Independente", participó del Carnaval de 2010. En 2012, la escuela pasó a llamarse simplemente "Grêmio Recreativo e Cultural Escola de Samba Independente Tricolor".',8,TRUE,'La casa Independiente Tricolor nació para dar la oportunidad a jóvenes y niños de todas las edades.');

INSERT INTO colores (nombre) VALUES ('azul');
INSERT INTO colores (nombre) VALUES ('rosa');
INSERT INTO colores (nombre) VALUES ('rojo');
INSERT INTO colores (nombre) VALUES ('negro');
INSERT INTO colores (nombre) VALUES ('blanco');
INSERT INTO colores (nombre) VALUES ('verde');

INSERT INTO escuelas_colores (id_escuela,id_color) VALUES (2,1);
INSERT INTO escuelas_colores (id_escuela,id_color) VALUES (2,2);
INSERT INTO escuelas_colores (id_escuela,id_color) VALUES (3,3);
INSERT INTO escuelas_colores (id_escuela,id_color) VALUES (3,4);
INSERT INTO escuelas_colores (id_escuela,id_color) VALUES (3,5);
INSERT INTO escuelas_colores (id_escuela,id_color) VALUES (4,5);
INSERT INTO escuelas_colores (id_escuela,id_color) VALUES (4,6);

INSERT INTO habilidades (nombre,descripcion) VALUES ('Dirección','Sabe dirigir, organizar y coordinar a un grupo de personas');
INSERT INTO habilidades (nombre,descripcion) VALUES ('Danza','Domina el movimiento de su cuerpo al ritmo de la música');
INSERT INTO habilidades (nombre,descripcion) VALUES ('Batería','Tiene destreza con el instrumento y sabe poner ritmo a la samba');
INSERT INTO habilidades (nombre,descripcion) VALUES ('Canto','Su voz produce sonido melodiosos');
INSERT INTO habilidades (nombre,descripcion) VALUES ('Creatividad','Consigue crear nuevas ideas y conceptos');

INSERT INTO integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Danillo',NULL,'Prímola','Soares',NULL,'05-05-85','M','brasilero',147554627)
INSERT INTO integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Catarina',NULL,'Prímola','Souza','Cat','09-26-88','F','brasilero',135544771)
INSERT INTO integrantes (nombre1,nombre2,apellido1,apellido2,apodo,fecha_nacimiento,genero,nacionalidad,rg)
VALUES ('Danillo',NULL,'Prímola','Soares',NULL,'05-05-85','M','brasilero',147554627)

INSERT INTO integrantes_habilidades (id_integrante,id_habilidad) VALUES (1,1);
INSERT INTO integrantes_habilidades (id_integrante,id_habilidad) VALUES (1,2);
INSERT INTO integrantes_habilidades (id_integrante,id_habilidad) VALUES (2,1);
INSERT INTO integrantes_habilidades (id_integrante,id_habilidad) VALUES (2,2);

INSERT INTO parentescos (id_integrante_1,id_integrante_2,tipo) VALUES (1,2,'pareja')

INSERT INTO historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('29-01-2015',1,2,'no','03-12-2023')
INSERT INTO historicos_integrantes (fecha_inicio,id_integrante,id_escuela,autoridad,fecha_fin)
VALUES ('01-09-2021',2,2,'no',NULL)


COMMIT;