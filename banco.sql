create table marcas (
codigo serial not null primary key, 
nome varchar(50) not null);

create table carros (
codigo serial not null primary key,
nome varchar(50) not null, 
ano date not null, 
marca integer not null, 
foreign key (marca) references marcas (codigo));

-- inserir alguns registros
insert into marcas (nome) values ('Fiat') , 
('Ford'), ('Volkswagem');

insert into carros (nome, ano, marca) values
('uno','05/01/2021',1),
('Gol', '05/10/2018',3);