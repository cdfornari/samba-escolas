BEGIN;

INSERT INTO lugares_geo (nombre, tipo) VALUES ('Sudeste', 'region');
INSERT INTO lugares_geo (nombre, tipo, id_padre_lugar) VALUES ('Rio de Janeiro', 'estado', 1);
INSERT INTO lugares_geo (nombre, tipo, id_padre_lugar) VALUES ('Rio de Janeiro', 'ciudad', 2);
INSERT INTO lugares_geo (nombre, tipo) VALUES ('Sureste','region');
INSERT INTO lugares_geo (nombre, tipo, id_padre_lugar) VALUES ('Minas Gerais','estado',4);
INSERT INTO lugares_geo (nombre, tipo, id_padre_lugar) VALUES('Belo Horizonte','ciudad',5);

INSERT INTO escuelas_samba (nombre, direccion_sede, numero, cep, fecha_fundacion, resumen_historico, id_ciudad, gres, descripcion)
VALUES ('Imperatriz Leopoldinense', ' R. Professor Lacé', 235, '59155190', '03-06-1956', 'Fundada el 6 de marzo de 1959 por el farmacéutico Amaury Jório, junto con algunos sambistas de la Zona Leopoldina y remanentes de la extinta asociación Recreio de Ramos, su nombre hace referencia al Ferrocarril Leopoldina -que atravesaba el barrio de Ramos- y que, a su vez, , recibió este nombre en referencia a la emperatriz María Leopoldina de Brasil', 3, TRUE, 'La mejor escola de samba de Rio de Janeiro');
INSERT INTO escuelas_samba (nombre, direccion_sede, numero, cep, fecha_fundacion, resumen_historico, id_ciudad, gres, descripcion) VALUES 
	(
	'Acadêmicos de Venda Nova',
	'Rua Soldado Manoel Ferreira',
	146,
	31515330,
	'12-01-2004',
	'La Escuela de Samba fue fundada el 1 de diciembre de 2004, en el barrio São João Batista, Belo Horizonte, por un grupo de familiares. En la casa de la matriarca Arabela Gonçalves, sus hijos Marco Aurélio (primer presidente y diseñador del carnaval), Francisco, Ricardo y Janaína, así como su hermana Adélia Rubini, tenían el sueño de desfilar con una comunidad que no tenía tradición en la cultura de la samba. La sede de la asociación sigue estando en la casa de la familia, a veces los ensayos se realizan sobre el asfalto, en plena calle, con el apoyo de extras y del barrio.',
	6,
	TRUE,
	'Una escuela de amor, arte y cultura'
	);

COMMIT;