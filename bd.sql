drop database if exists saviatest;
create database saviatest;
use saviatest;
create table persona(
	id int primary key AUTO_INCREMENT,
	nombre varchar(60) not null,
	apellidos varchar(100) not null,
	email varchar(60) not null,
	fecha_nacimiento date not null,
	salario decimal(10, 2) not null
);