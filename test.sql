 select documentos_json from creadores;
 select contexto from colecciones;
 select * from colecciones;

 CREATE TABLE IF NOT EXISTS admins (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR (300) NOT NULL,
        pass   VARCHAR (300) NOT NULL
    );

INSERT INTO admins (nombre, pass) VALUES ("admin", "%FCv9DMeBUbC7;Y")

select * from admins;