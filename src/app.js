import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import { ProductManager } from './productManager.js';

const listaProductos = new ProductManager;
const productosListados = listaProductos.getProducts();
const app = express();
const httpServer = app.listen(8080,() => console.log('servidor escuchando en el puerto 8080'));
const socketServer = new Server(httpServer)
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'))
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/',viewsRouter);

socketServer.on('connection', socket=> {
    console.log("Nuevo cliente conectado");
    socket.emit('tabla', productosListados);
    socket.on('delete', data => {
        let dataToNumber = Number(data);
        try {
            listaProductos.deleteProduct(dataToNumber);
        } catch (error){
            console.log(error)
        }
        socket.emit('tabla', productosListados);
    })
    socket.on('create', data => {
        try {
            listaProductos.addProduct(data);
        } catch (error){
            console.log(error)
        }
        socket.emit('tabla', productosListados);
    })
})
