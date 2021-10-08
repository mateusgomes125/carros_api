const express = require('express')
const cors = require('cors')
const { pool } = require('./config')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

const controleMarca = require('./controladores/marcas')
const controleCarro = require('./controladores/carros')

app
    .route('/marcas')
    .get(controleMarca.getMarcas)
    .post(controleMarca.addMarca)
    .put(controleMarca.updateMarca)

app
    .route('/marcas/:codigo')
    .get(controleMarca.getMarcaPorCodigo)
    .delete(controleMarca.deleteMarca)


app
    .route('/carros')
    .get(controleCarro.getCarros)
    .post(controleCarro.addCarro)
    .put(controleCarro.updateCarro)

app
    .route('/carros/:codigo')
    .get(controleCarro.getCarroPorCodigo)
    .delete(controleCarro.deleteCarro)    

    
app.listen(process.env.PORT || 3002, () => {
    console.log('Servidor rodando na porta 3002')
})



