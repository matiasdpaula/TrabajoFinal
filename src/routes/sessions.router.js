import { Router } from 'express';
import userModel from '../dao/models/user.model.js';

const router = Router();

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    const exists = await userModel.findOne({ email });
    if (exists) return res.status(400).send({ status: "error", error: "User already exists" });
    const user = {
        first_name,
        last_name,
        email,
        age,
        password
    }
    await userModel.create(user);
    res.send({ status: "success", message: "User registered" });
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        req.session.user = {
            name: "Administrador",
            email: "adminCoder@coder.com",
            age: "Indeterminado",
            role: "Admin"
        }
        return res.send({ status: "success", payload: req.session.user, message: "¡Logueo realizado!" });
    } 
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).send({ status: "error", error: "User does not exists" });
    if (user.password !== password) {
        return res.status(400).send({ status: "error", error: "User exists but password is incorrect" });
    }
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role: "Usuario"
    }
    res.send({ status: "success", payload: req.session.user, message: "¡Logueo realizado!" });
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).send({status:"error", error:"Couldn't logout"})
        res.redirect('/login')
    })
})

export default router;