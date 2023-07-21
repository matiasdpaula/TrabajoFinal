import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/github', passport.authenticate('github', {scope: [`user : email`]}), async (req, res) => {})

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: 'api/sessions/login' }), async (req, res) => {
    req.session.user = {
        name: req.user.name,
        email: req.user.email,
        age: req.user.age,
        rol: "Usuario"
    }
    res.redirect('/products');
});

router.post('/register', passport.authenticate('register',{failureRedirect: 'api/sessions/failregister'}), async (req, res) => {
    res.send({status:"success", message: "User registered"})
})

router.get('/failregister', (req, res) => {
    res.status(400).send({status:"error", error:"Registry fail"})
})

router.post('/loginAdmin', async (req, res) => {
    req.session.user = {
        name: "Administrador",
        email: "adminCoder@coder.com",
        age: "Indeterminado",
        rol: "Admin"
    }
    res.send({ status: "success", payload: req.session.user, message: "¡Logueo realizado!" });
})

router.post('/login', passport.authenticate('login',{failureRedirect: 'api/sessions/faillogin'}), async (req, res) => {
    if (!req.user) return res.status(400).send({ status: "error", error: "Incorrect credentials" });
    req.session.user = {
        name: req.user.name,
        email: req.user.email,
        age: req.user.age,
        rol: "Usuario"
    }
    res.send({ status: "success", payload: req.session.user, message: "¡Logueo realizado! :)" });
    console.log(req.session.user);
})

router.get('faillogin', (req, res) => {
    res.status(400).send({status:"error", error:"Login fail"})
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).send({status:"error", error:"Couldn't logout"})
        res.redirect('/login')
    })
})

router.get('/github', passport.authenticate('github', {scope: [`user : email`]}))

export default router;