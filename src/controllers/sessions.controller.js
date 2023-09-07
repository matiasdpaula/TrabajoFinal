import UserDTO from "../dto/user.dto.js";

export const passportGithub = async (req , res) => {
    req.session.user = new UserDTO(req.user)
    res.redirect('/products');
}

export const passportRegister = async (req , res) => {
    res.send({status:"success", message: "User registered"})
}

export const passportFailRegister = async (req , res) => {
    res.status(400).send({status:"error", error:"Registry fail"})
}

export const login = async (req , res) => {
    if (!req.user) return res.status(400).send({ status: "error", error: "Incorrect credentials" });
    req.session.user = new UserDTO(req.user)
    req.logger.info('Logueo correcto')
    res.send({ status: "success", payload: req.session.user, message: "¡Logueo realizado!" });
}

export const failLogin = async (req , res) => {
    res.status(400).send({status:"error", error:"Login fail"})
}

export const logout = async (req , res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).send({status:"error", error:"Couldn't logout"})
        res.redirect('/login')
    })
}

export const current = async (req , res) => {
    if (!req.session.user) return res.status(400).send({ status: "error", error: "Incorrect credentials" });
    res.send({ status: "success", payload: req.session.user, message: "Tus datos" });
}