import express from 'express';
import productRouter from './routes/product.router.js';
import cartsRouter from './routes/carts.router.js';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars';
import Handlebars from 'handlebars';
import { Server } from 'socket.io';
import ProductManager from './dao/managers/productManager.js';
import mongoose from 'mongoose';
import { messageModel } from './dao/models/messages.model.js';
import 'dotenv/config'
import MongoStore from 'connect-mongo';
import sessionsRouter from './routes/sessions.router.js';
import session from 'express-session';
import passport from 'passport';
import initializePassport from './config/passport.config.js';

const listaProductos = new ProductManager();
const app = express();
const httpServer = app.listen(process.env.PORT,() => console.log(`servidor escuchando en el puerto ${process.env.PORT}`));
const socketServer = new Server(httpServer)
const DBConnection = mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'))
app.use(session({
    store: new MongoStore({
        mongoUrl: process.env.MONGO,
        ttl: 3600
    }),
    secret: "CoderSecretSHHHHH",
    resave: false,
    saveUninitialized: false
}))
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/',viewsRouter);

socketServer.on('connection', socket=> {
    console.log("Nuevo cliente conectado");
    socket.on('delete', async (data) => {
        try {
            await listaProductos.deleteProduct(data);
            socketServer.emit('tabla', await listaProductos.getProducts());
        } catch (error) {
            console.log(error);
        }
    });
    socket.on('create', async (data) => {
        try {
            await listaProductos.addProduct(data);
            socketServer.emit('tabla', await listaProductos.getProducts());
        } catch (error) {
            console.log(error);
        }
    });
    socket.on('message', async (data) => {
        try {
            await messageModel.create(data);
            socketServer.emit('messageLogs', await messageModel.find({}));
        } catch (error) {
            console.log(error);
        }
    });
});

Handlebars.registerHelper("isAdmin", function(role) {
    if(role === "Admin") {
        return true;
    }
    return false;
});