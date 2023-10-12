import userModel from "../models/user.model.js";
import { CartService } from "../../services/carts.services.js";

const cartService = new CartService();

export class UsersManager {
    userModel
    constructor() {
        this.userModel = userModel;
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
        const user = await this.userModel.findOneAndUpdate({email : email},{last_connection : fecha})
        return user;
    }
    async updateDocuments(idUser, files) {
        const user = await this.userModel.find({_id : idUser});
        const documents = user[0].documents;
        const newDocuments = [...documents, ...files.map(file => ({name: file.originalname, reference: file.path}))];
        return await this.userModel.findOneAndUpdate({_id : idUser},{documents : newDocuments})
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