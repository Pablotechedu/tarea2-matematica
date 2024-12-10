-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS BancoDB;
USE BancoDB;

-- Crear la tabla clientes
CREATE TABLE IF NOT EXISTS clientes (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100) NOT NULL
);

-- Crear la tabla cuentas
CREATE TABLE IF NOT EXISTS cuentas (
    id_cuenta INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT,
    tipo_cuenta VARCHAR(50) NOT NULL,
    saldo DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

-- Insertar datos de ejemplo en la tabla clientes
INSERT INTO clientes (nombre, ciudad) VALUES
('Pedro', 'Guatemala'),
('María', 'Quetzaltenango'),
('Juan', 'Antigua Guatemala'),
('Ana', 'Escuintla');

-- Insertar datos de ejemplo en la tabla cuentas
INSERT INTO cuentas (id_cliente, tipo_cuenta, saldo) VALUES
(1, 'Monetaria', 1000.00),
(2, 'Ahorro', 5000.50),
(3, 'Monetaria', 2500.75),
(1, 'Ahorro', 10000.00);