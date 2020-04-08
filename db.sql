
# COMANDOS PARA CONSULTAR LA BASE DE DATOS
show databases;
use undbtest;
create database temp;
use temp;
show tables;

    # EJECUTAR 1 por 1
    select * from creadores;
    select * from colecciones;
    select * from lugares;
    select * from piezas;
    select * from hechos;


# COMANDOS DE INICIALIZACIÓN (NO EJECUTAR)
    drop table piezas;
    drop table hechos;
    drop table colecciones;
    drop table creadores;
    drop table lugares;

    CREATE TABLE IF NOT EXISTS lugares (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR (300) NOT NULL,
        pais VARCHAR (100),
        departamento VARCHAR (100),
        localidad VARCHAR (150),
        direccion VARCHAR (100),
        lat FLOAT,
        longf FLOAT,
        tipo INT
    );

    CREATE TABLE IF NOT EXISTS hechos (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        tipo INT,
        modalidad TEXT,
        relato TEXT,
        descripcion TEXT,
        actores TEXT,
        acciones_resistencia_sobrevivencia TEXT,
        fecha VARCHAR(10),
        fk_lugar INT,
        FOREIGN KEY (fk_lugar) REFERENCES lugares (id) ON
    DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS creadores (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR (300) NOT NULL,
        imagen_path TEXT,
        tipo INT,
        resena TEXT,
        sociopolitico TEXT,
        caracterizacion TEXT,
        documentos_json TEXT,
        responsable_nombre VARCHAR (200),
        responsable_celular VARCHAR (15), 
        responsable_correo VARCHAR (100),
        imagen_descripcion TEXT,
        il_1_path TEXT,
        il_2_path TEXT,
        img_linea_path TEXT,
        img_azul_path TEXT,
        fk_lugar INT,
        FOREIGN KEY (fk_lugar) REFERENCES lugares (id) ON
    DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS colecciones (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR (300) NOT NULL,
        codigo VARCHAR(100),
        tipo INT,
        cantidad_piezas MEDIUMINT,
        creacion VARCHAR(10),
        contexto TEXT,
        documentos_json TEXT,
        fk_creador INT,
        fk_lugar INT,
        FOREIGN KEY (fk_lugar) REFERENCES lugares (id) ON
    DELETE CASCADE,
        FOREIGN KEY (fk_creador) REFERENCES creadores (id) ON
    DELETE CASCADE
    );

    

    CREATE TABLE IF NOT EXISTS piezas (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(200),
        codigo VARCHAR(100),
        imagen_path TEXT,
        imagen_descripcion TEXT,
        detalle_path TEXT,
        detalle_descripcion TEXT,
        autores TEXT,
        fecha VARCHAR(10),
        entidad_json TEXT,
        tematicas TEXT, 
        hecho_relato TEXT,
        relato_pieza TEXT,
        audio_path TEXT,
        descriptores TEXT,
        ancho VARCHAR(100),
        alto  VARCHAR(100),
        espesor  VARCHAR(100),
        tipo_textil VARCHAR(200),
        materiales TEXT,
        tecnicas TEXT,
        conservacion TEXT,
        usos TEXT,
        eventos_json TEXT,
        ducumentos_json TEXT,
        consentimiento_path TEXT,
        galeria_path TEXT,
        fotografo VARCHAR(150),
        autor_ficha VARCHAR(150),
        fecha_rdttc VARCHAR(10),
        fk_creador INT,
        fk_coleccion INT,
        fk_hecho INT,
        FOREIGN KEY (fk_creador) REFERENCES creadores (id) ON
    DELETE CASCADE,
        FOREIGN KEY (fk_coleccion) REFERENCES colecciones (id) ON
    DELETE CASCADE,
        FOREIGN KEY (fk_hecho) REFERENCES hechos (id) ON
    DELETE CASCADE
    );

    insert into hechos (id, tipo, descripcion, actores, anio, fk_lugar) values (
        1, 1, null, null, null, null
    );

    INSERT INTO lugares(id, nombre, pais, departamento, localidad, direccion, lat, long, tipo) VALUES (
        1,
        "Taller Choibá Subestación",
        "Colombia",
        "Chocó",
        "Quibdó",
        "Calle 7a No. 8 – 22",
        5.6845800,
        -76.6453400,
        0
    );

    INSERT INTO lugares(id, nombre, pais, departamento, localidad, direccion, lat, long, tipo) VALUES (
        2,
        "Casa de la cultura municipal Roberto Jaramillo Arango",
        "Colombia",
        "Antioquia",
        "Sosón",
        "Cl. 7 #8-18",
        5.7093920,
        -75.3109280,
        0
    );

    INSERT INTO lugares(id, nombre, pais, departamento, localidad, direccion, lat, long, tipo) VALUES (
        3,
        "Sonsón",
        "Colombia",
        "Antioquia",
        "null",
        "Cl. 7 #8-18",
        5.7099700,
        -75.3101500,
        0
    );

    insert into fondos(id, nombre, fk_lugar, tipo, imagen_path, resena, sociopolitico, caracterizacion, documentos_json, responsable_nombre, responsable_celular, responsable_correo) values(
        1,
        "Grupo de Artesanías Choibá  ",
        1,
        2, 
        "Choiba/principal.jpg",
        "Las mujeres que conforman el Grupo de Artesanías Choibá llegaron a Quibdó hace veinte años desde distintos municipios del Chocó y del Urabá Antioqueño huyendo de la guerra. Son mujeres que se encontraron en diciembre de 1998 en la toma que hicieron más de 280 personas desplazadas al Coliseo Municipal de la ciudad como protesta contra la poca atención recibida y la falta de agilidad en la garantía de seguridad para el regreso a sus territorios. Estando allí, mientras esperaban respuestas sobre su situación, aprendieron de la mano de la teóloga y psicóloga Úrsula Holzapfel a construir muñecas, a tejer, bordar y coser, un conocimiento que después las motivaría a crear un proyecto productivo autónomo. Actualmente, son un grupo de 10 mujeres y un hombre que se dedican a la elaboración de muñecas de trapo, telones, ropa, llaveros, bolsos, artículos de cocina, entre otros elementos. Como la madera del Choibá ellas, desde su oficio textil, desde el manejo de la aguja y el hilo, han sido fuertes durante estos veinte años para responder a la precariedades y exclusiones que deja la guerra, por eso, su trabajo también se ha enfocado en la trasmisión de sus conocimientos a otros grupos o colectivos que buscan generar alternativas productivas y sociales propias.",
        "Quibdó es la capital del departamento del Chocó, está localizada en la región del Pacífico sobre la margen derecha del río Atrato. Es una zona de gran biodiversidad, con importantes recursos hídricos y minerales, sin embargo, el 70% de la población no cuenta con servicio de agua potable y depende del agua lluvia. Tiene 27 corregimientos y 14 resguardos indígenas.
    En el territorio coexisten dos tipos de economías, la extractiva de recursos naturales como madera y minerales, y las prácticas productivas tradicionales asociadas a la pesca y el cultivo de plátano, arroz, yuca y caña. En la zona urbana predomina la economía informal y comercio lo que la ubica como la ciudad con mayor tasa de desempleo en el país, un 18,9% respecto a un promedio nacional de 12,8%.
    La disputa entre actores sociales, económicos y políticos por el control de la capital chocoana y sus vías de conexión con el río Atrato y el río San Juan fueron la principal causa del surgimiento del conflicto armado en la región. La extracción de recursos en el departamento, convierten a Quibdó en uno de los centros urbanos geoestratégicos para la movilidad y la expansión de los actores armados.
    La presencia de diferentes actores armados en la región (Autodefensas Unidas de Colombia Bloque Élmer Cárdenas, Ejército de Liberación Nacional (ELN), FARC-EP) convirtieron a Quibdó en el mayor receptor de población desplazada del departamento. En la zona urbana hay más de 10 asentamientos de comunidades indígenas desplazadas y decenas de barrios informales que demandan la atención del estado y garantías para la no repetición de las violencias sufridas que en el contexto urbano se reproducen en un ciclo interminable. ",
        "El grupo de Artesanías Choibá fue creado en el año 2002 por mujeres, afrodescendientes, víctimas de desplazamiento forzado que llegaron a Quibdó hace 20 años, provenientes de distintos municipios del Chocó y del Urabá Antioqueño.   ",
        NULL,
        "Luz Romaña ",
        "3104336578",
        "choiba@prueba.com;"
    );


    INSERT INTO colecciones(id, nombre, codigo, tipo, cantidad_piezas, creacion, contexto, documentos_json, fk_fondo, fk_lugar) VALUES (
        1,
        "Telones",
        "GAC-001",
        2,
        5,
        2002,
        null,
        null,
        1, 
        1
    );

    INSERT INTO piezas (id, fk_fondo, fk_coleccion, titulo, codigo, imagen_path, detalle_path, autores, fecha, entidad_json, tematicas, fk_hecho, relato, audio_path, descriptores, ancho, alto, espesor, tipo_textil, materiales, tecnicas, conservacion, usos, eventos_json, ducumentos_json, consentimiento_path, galeria_path, fotografo, autor_ficha, fecha_rdttc) VALUES (
        1, 
        1, 
        1, 
        "Telón Choibá Atrateño",
        "GAC-001-001",
        "Choiba/GAC-001/001/principal.jpg",
        "Choiba/GAC-001/001/detalle.jpg",
        "Gloria, Millo, Yaneth, Rubiela, Luz, Rosa, Lucy, Úrsula",
        "2004",
        '[
            {"nombre":"Comisión Justicia y Paz. - Diócesis de Quibdó.", "descripcion": "null", "url": "null"}
        ]',
        "Vida cotidiana; Trayectorias de vida; Conmemoracion ",
        1,
        "Letra por letra, franja por franja, crece una obra de arte, un trabajo comunitario construyendo vida digna”, así presentan las mujeres del grupo Artesanías Choibá en uno de sus catálogos una de sus piezas textiles más queridas: el telón Choibá Atrateño. En él está bordado el poema que así se titula y fue escrito por el sacerdote Gonzalo de la Torre como un regalo para las mujeres y hombres que integran este grupo, quienes como el árbol del Choibá que crece en las selvas atrateñas con raíces y ramas resistentes e intensas flores moradas, han sido fuertes para mantener la vida pese al despojo, el desplazamiento forzado y las distintas violencias que se han perpetuado en su territorio.

    Luz Romaña, una de las integrantes más antiguas y quien cuida el archivo del grupo, cuenta que este telón fue uno de los primeros trabajos colectivos y ha sido uno de los más significativos, pues lo hicieron en el momento en el que ellas estaban aprendiendo a bordar para llenarse de resistencia ante las adversidades sufridas como consecuencia de la guerra en el río Atrato. Bordar el telón implicó revivir los momentos felices en el campo, retratar los buenos recuerdos del río, de los árboles y de sus casas, y narrar mediante letras, colores y figuras toda la belleza de la naturaleza chocona.

    El telón fue elaborado como una colcha de retazos forrados y bordados y es una marca de identidad para el grupo. En los lugares visitados por Artesanías Choibá para compartir experiencias o para publicitar sus productos este es expuesto como una manera de presentación del grupo, su historia y el lugar de donde provienen.",
        "Choiba/GAC-001/001/audios/",
        "Poema, árbol de Choibá, selva, río Atrato, casas, flores",
        119,
        83,
        0.5,
        "Telón",
        "Telas de algodón,  hilos de bordar y coser.",
        "Bordado y costura",
        "La pieza está deteriorada por el paso del tiempo y la humedad, tiene manchas, decoloración en la tela y los hilos, tiene roturas. Esta pieza debe tratarse con cuidado para garantizar su conservación. ",
        "La pieza se exhibió mucho tiempo en el taller de Artesanías Choibá, en el punto de venta para identificarlas. Hoy esta guardada para preservarla y es exhibida solo en exposiciones, como la conmemoración de los 20 años de trabajo del grupo.
    Esta pieza es considerada la pieza emblemática por ser el primer telón elaborado por el grupo.",
        '[
            {"nombre":"Exposición 20 años de resistencia", "fecha": "09/2019", "lugar": "Quibdó, chocó"}
        ]',
        null,
        "Choiba/GAC-001/001/audios/consentimientos.pdf",
        "Choiba/GAC-001/001/galeria/",
        "Equipo apropiación proyecto Remedar lo Nuevo ",
        "Isabel González",
        "nov.-19"
    );

    select fondos.id, fondos.nombre, fondos.fk_lugar, lugares.lat, lugares.long FROM fondos INNER JOIN lugares ON fondos.fk_lugar = lugares.id;