const { pool } = require("../config");
const { request, response } = require("express");

const getMarcas = (request, response) => {
    pool.query("select * from marcas order by codigo", (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar as marcas: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

module.exports.getMarcas = getMarcas;

const addMarca = (request, response) => {
    const { nome} = request.body

    pool.query(
        'insert into marcas (nome) values ($1)',
        [nome],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao inserir as marcas: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'marca criada.' })
        }        
    )
}

module.exports.addMarca = addMarca;


const updateMarca = (request, response) => {
    const { codigo, nome} = request.body

    pool.query(
        'update marcas set nome = $1 where codigo = $2',
        [nome, codigo],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao atualizar as marcas: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'marca atualizada.' })
        }        
    )
}

module.exports.updateMarca = updateMarca;

const deleteMarca = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'delete from marcas where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível remover a marca: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'marca removida.' })
        }        
    )
}

module.exports.deleteMarca = deleteMarca;

const getMarcaPorCodigo = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'select * from marcas where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível recuperar a marca: ' + error });
            }
            response.status(201).json(results.rows)
        }        
    )
}

module.exports.getMarcaPorCodigo = getMarcaPorCodigo;