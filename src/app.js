import express from 'express';
import { ProductManager } from './productManager.js'

const app = express();
const listaProductos = new ProductManager();

app.get('/', (req, res) => {
    res.send('<h1> Bienvenido <h1>')
}) ,

app.get('/products', (req, res) => {
    let limit = req.query.limit;
    if(!limit) {
        res.send(listaProductos.getProducts())
    }
    res.send(listaProductos.getProductLimit(limit));
});

app.get('/products/:pid', (req, res) => {
    let idProducto = Number(req.params.pid);
    res.send(listaProductos.getProductById(idProducto))
});

app.listen(8080, () => {
    console.log('servidor escuchando en el puerto 8080')
})


