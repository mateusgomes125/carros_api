const { pool } = require("../config");
const { request, response } = require("express");

const getCarros = (request, response) => {
    pool.query("select l.codigo as codigo, l.nome as nome, to_char(l.ano, \'YYYY-MM-DD\') as ano, \
    l.marca as marca, e.nome as marca_nome \
    from carros l \
    join marcas e on e.codigo = l.marca order by l.codigo", (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar os carros: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

module.exports.getCarros = getCarros;

const addCarro = (request, response) => {
    const { nome , ano, marca } = request.body

    pool.query(
        'insert into carros ( nome , ano, marca ) values ($1, $2, $3)',
        [ nome , ano, marca ],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao inserir o carro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Carro criado.' })
        }        
    )
}

module.exports.addCarro = addCarro;


const updateCarro = (request, response) => {
    const { codigo, nome , ano, marca } = request.body

    pool.query(
        'update carros set nome = $1, ano = $2, marca = $3 where codigo = $4',
        [nome , ano, marca, codigo],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao atualizar o carro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Carro atualizado.' })
        }        
    )
}

module.exports.updateCarro = updateCarro;

const deleteCarro = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'delete from carros where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível remover o carro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'carro removido.' })
        }        
    )
}

module.exports.deleteCarro = deleteCarro;

const getCarroPorCodigo = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'select l.codigo as codigo, l.nome as nome, to_char(l.ano, \'YYYY-MM-DD\') as ano, \
        l.marca as marca, e.nome as marca_nome \
        from carros l \
        join marcas e on e.codigo = l.marca where l.codigo = $1 order by l.codigo ',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível recuperar o carro: ' + error });
            }
            response.status(201).json(results.rows)
        }        
    )
}

module.exports.getCarroPorCodigo = getCarroPorCodigo;