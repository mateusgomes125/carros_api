require('dotenv').config()

const isProduction = process.env.NODE_ENV === 'production'

const {Pool} = require('pg')

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: !isProduction ? false : {
    rejectUnauthorized: false
  }
})

function db_seed(){
  pool.query(`
  insert into marcas (nome) values ('Fiat') , 
  ('Ford'), ('Volkswagem');
  
  insert into carros (nome, ano, marca) values
  ('uno','05/01/2021',1),
  ('Gol', '05/10/2018',3);
  `)
}

function db_migrate(){
  pool.query(`
  create table marcas (
    codigo serial not null primary key, 
    nome varchar(50) not null);
    
    create table carros (
    codigo serial not null primary key,
    nome varchar(50) not null, 
    ano date not null, 
    marca integer not null, 
    foreign key (marca) references marcas (codigo));
  `)
}

module.exports = {pool, db_migrate,db_seed}