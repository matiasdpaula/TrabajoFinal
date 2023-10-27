import userModel from "../models/user.model.js";
import { CartService } from "../../services/carts.services.js";
import mailConfig from "../../config/mailConfig.js";
import nodemailer from 'nodemailer';

const configMail = {
    service: mailConfig.mailing.service,
    port: mailConfig.mailing.port,
    auth: {
        user: mailConfig.mailing.auth.user,
        pass: mailConfig.mailing.auth.pass
    },
}

const transport = nodemailer.createTransport(configMail);

const cartService = new CartService();

export class UsersManager {
    userModel
    constructor() {
        this.userModel = userModel;
    }
    async getAllUsers() {
        const users = await this.userModel.find({}, '_id first_name last_name email role');
        return users;
    }
    async updateRole(idUser) {
        const userToUpdate = await this.userModel.findOne({_id : idUser})
        if (userToUpdate.role === "premium") {
            const updatedUser = await this.userModel.updateOne({_id : idUser}, {role : "user"})
            return updatedUser
        } else if (this.validarDocumentos(userToUpdate.documents)) {
            const updatedUser = await this.userModel.updateOne({_id : idUser}, {role : "premium"})
            return updatedUser
        }
        throw new Error("No están todos los documentos cargados")
    }
    async adminUpdate(idUser) {
        const userToUpdate = await this.userModel.findOne({_id : idUser})
        if (userToUpdate.role === "premium") {
            const updatedUser = await this.userModel.updateOne({_id : idUser}, {role : "user"})
            return updatedUser
        }
            const updatedUser = await this.userModel.updateOne({_id : idUser}, {role : "premium"})
            return updatedUser
    }
    async getUser(email) {
        try {
            const user = await this.userModel.findOne({email : email});
            return user;
        } catch (error) {
            res.status(404).send({status : "Error", error: "Usuario no encontrado"})
        }
    }
    async update(email, object) {
        const user = await this.userModel.findOneAndUpdate({email : email}, object);
        return user;
    }
    async delete(email) {
        const user = await this.userModel.findOne({email : email});
        const carrito = user.cart;
        await cartService.deleteCart(carrito);
        await this.userModel.deleteOne({email : email});
        return user;
    }
    async updateConnection(email) {
        const fecha = new Date()
        const user = await this.userModel.findOneAndUpdate({email : email},{$set: {last_connection : fecha}})
        return user;
    }
    async updateDocuments(idUser, files) {
        const user = await this.userModel.find({_id : idUser});
        const documents = user[0].documents;
        const newDocuments = [...documents, ...files.map(file => ({name: file.originalname, reference: file.path}))];
        return await this.userModel.findOneAndUpdate({_id : idUser},{documents : newDocuments})
    }
    async deleteUsersByDate() {
        const treintaMinutosAtras = new Date(Date.now() - 30 * 60 * 1000); // Reemplazar el 30 por el valor en minutos deseado.
        const users = await this.userModel.find({ last_connection: { $lt: treintaMinutosAtras } })
        users.forEach(usuario => {
            transport.sendMail({
                from:`LocalHost <${mailConfig.mailing.auth.user}>`,
                to: usuario.email,
                subject: 'Cuenta eliminada por inactividad',
                html: `<h1>Hola ${usuario.first_name}</h1>
                    <hr>
                    <p>Deseamos informarte que tu cuenta fue borrada por inactividad</p>`
            });
            this.delete(usuario.email)})
    }
    // Validaciones
    validarDocumentos(documents) {
        const requiredDocuments = ['id', 'address', 'bankAccount'];
        const hasAllDocuments = requiredDocuments.every(document => {
            return documents.some(doc => doc.name.includes(document))
        })
        return hasAllDocuments;
    }
}