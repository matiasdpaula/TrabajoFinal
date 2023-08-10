export const passportGithub = async (req , res) => {
    req.session.user = {
        first_name: req.user.first_name,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role
    }
    res.redirect('/products');
}

export const passportRegister = async (req , res) => {
    res.send({status:"success", message: "User registered"})
}

export const passportFailRegister = async (req , res) => {
    res.status(400).send({status:"error", error:"Registry fail"})
}

export const loginAdmin = async (req , res) => {
    req.session.user = {
        first_name: "Administrador",
        email: "adminCoder@coder.com",
        age: "Indeterminado",
        role: "Admin"
    }
    res.send({ status: "success", payload: req.session.user, message: "¡Logueo realizado!" });
}

export const login = async (req , res) => {
    if (!req.user) return res.status(400).send({ status: "error", error: "Incorrect credentials" });
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role
    }
    res.send({ status: "success", payload: req.session.user, message: "¡Logueo realizado! :)" });
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
