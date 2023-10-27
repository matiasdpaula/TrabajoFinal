import UserDTO from "../dto/user.dto.js";
import mailConfig from "../config/mailConfig.js";
import nodemailer from 'nodemailer';
import { UserService } from "../services/users.services.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enum.js";
import { generateNotFoundError , generateInvalidTypesError} from "../services/errors/info.js";
import { createJwt, isValidPassword, createHash} from "../utils.js";
import 'dotenv/config'

const userService = new UserService();

export const passportGithub = async (req , res) => {
    req.session.user = new UserDTO(req.user)
    res.redirect('/products');
}

export const passportRegister = async (req , res) => {
    res.status(201).send({status:"success", message: "User registered"})
}

export const passportFailRegister = async (req , res) => {
    res.status(400).send({status:"error", error:"Registry fail"})
}

export const login = async (req , res) => {
    if (!req.user) return res.status(400).send({ status: "error", error: "Incorrect credentials" });
    req.session.user = new UserDTO(req.user)
    const userEmail = req.session.user.email;
    await userService.updateConnection(userEmail)
    req.logger.info('Logueo correcto')
    res.send({ status: "success", payload: req.session.user, message: "¡Logueo realizado!" });
}

export const failLogin = async (req , res) => {
    res.status(400).send({status:"error", error:"Login fail"})
}

export const logout = async (req , res) => {
    const userEmail = req.session.user.email;
    await userService.updateConnection(userEmail)
    req.session.destroy(err => {
        if(err) return res.status(500).send({status:"error", error:"Couldn't logout"})
        return res.redirect('/login');
    })
}

export const current = async (req , res) => {
    if (!req.session.user) return res.status(400).send({ status: "error", error: "Incorrect credentials" });
    res.send({ status: "success", payload: req.session.user, message: "Tus datos" });
}

const configMail = {
    service: mailConfig.mailing.service,
    port: mailConfig.mailing.port,
    auth: {
        user: mailConfig.mailing.auth.user,
        pass: mailConfig.mailing.auth.pass
    },
}

const transport = nodemailer.createTransport(configMail);

export const recover = async (req, res, next) => {
    const email = req.body.email;
    const user = await userService.getUser(email);
    if(!user) {
        req.logger.error('Usuario no encontrado')
        return next(new CustomError("Usuario no encontrado", generateNotFoundError(), EErrors.NOT_FOUND_ERROR, "Usuario no encontrado"));
    }
    const jwt = createJwt(email);
    try {
        transport.sendMail({
            from:`LocalHost <${mailConfig.mailing.auth.user}>`,
            to: email,
            subject: 'Recuperación de contraseña',
            html: `<h1>Click en el botón de abajo para recuperar la contraseña</h1>
                <hr>
                <button><a href="http://${process.env.URL}:${process.env.PORT}/changePassword/${jwt}">Click Aquí</a></button>`
        });
        res.status(200).send('Mail sent')
    } catch (error) {
        res.json({error:error})
    }
}

export const changePassword = async (req, res, next) => {
    const password = req.body.password;
    const email = req.email;
    try {
        const user = await userService.getUser(email);
        if(isValidPassword(user, password)) {
            return next(new CustomError("Nueva contraseña no puede ser igual a la anterior", generateInvalidTypesError(), EErrors.INVALID_TYPES_ERROR, "Nueva contraseña no puede ser igual a la anterior"))
        }
        const passwordHash = {password: createHash(password)};
        const newUser = await userService.update(email, passwordHash);
        res.status(200).send({ status: "success", payload: newUser, message: "Cambio realizado" });
    } catch (error) {
        res.status(404).send({status : "Error", error: "Usuario no encontrado"})
    }
}
