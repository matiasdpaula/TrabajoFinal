import { UserService } from "../services/users.services.js";

const userService = new UserService();

export const updateRole = async (req , res) => {
    const idUser = req.params.uid;
    try {
        res.status(200).send({status : "success", payload: await userService.updateRole(idUser)})
        req.logger.info('Usuario actualizado')
    } catch (error) {
        res.status(400).send({status : "Error", error: "No están todos los archivos cargados"})
    }
}

export const updateDocuments = async (req, res, next) => {
    const idUser = req.params.uid;
    const files = req.files;
    try {
        res.status(200).send({status : "success", payload: await userService.updateDocuments(idUser, files)})
        req.logger.info('Usuario actualizado')
    } catch (error) {
        res.status(400).send({status : "Error", error: "No se pudo actualizar los documentos"})
    }
}

export const deleteUser = async (req, res, next) => {
    const email = req.body.email;
    try {
        const user = await userService.deleteUser(email);
        res.status(200).send({ status: "success", payload: user, message: "Usuario borrado" });
    } catch (error) {
        res.status(404).send({status : "Error", error: "Usuario no encontrado"})
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const user = await userService.getAllUsers();
        res.status(200).send({ status: "success", payload: user});
    } catch (error) {
        res.status(404).send({status : "Error", error: "Usuarios no encontrados"})
    }
}

export const deleteUsersByDate = async (req, res, next) => {
    try {
        await userService.deleteUsersByDate();
        res.status(200).send({ status: "success"});
    } catch (error) {
        res.status(404).send({status : "Error", error: "Usuarios no encontrados"})
    }
}

export const adminUpdate = async (req, res, next) => {
    const idUser = req.params.uid;
    try {
        res.status(200).send({status : "success", payload: await userService.adminUpdate(idUser)})
        req.logger.info('Usuario actualizado')
    } catch (error) {
        res.status(400).send({status : "Error", error: "Error al actualizar"})
    }
}