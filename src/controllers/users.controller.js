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