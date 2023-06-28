import express from 'express';
import productRouter from './routes/productDB.router.js';
import cartsRouter from './routes/cartsDB.router.js';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { messageModel } from './dao/models/messages.model.js';

const MONGO = 'mongodb+srv://Tuchix10:uToZBsguHQ9P18sJ@codercluster.1lyicj9.mongodb.net/ecommerce'
const app = express();
const httpServer = app.listen(8080,() => console.log('servidor escuchando en el puerto 8080'));
const socketServer = new Server(httpServer)
const DBConnection = mongoose.connect(MONGO);
const modeloMensaje = messageModel;
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'))
app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);
app.use('/',viewsRouter);

socketServer.on('connection', socket=> {
    console.log("Nuevo cliente conectado");
    async function emiter() {
        socketServer.emit('messageLogs', await modeloMensaje.find({}))
    }
    emiter();
    socket.on('message', (data) => {
        modeloMensaje.create(data)
        emiter();
    })
})
