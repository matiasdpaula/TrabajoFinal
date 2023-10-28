import passport from "passport";
import local from 'passport-local';
import userService from '../dao/models/user.model.js';
import { createHash , isValidPassword } from "../utils.js";
import GitHubStrategy from 'passport-github2';
import { CartManager } from "../dao/managers/cartManager.js";

const cartMng = new CartManager;

const LocalStrategy = local.Strategy;
const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true,
    }, async (req , username , password , done) => {
        const {first_name, last_name, email, age} = req.body;
        try {
            const user = await userService.findOne({email : username});
            if(user) return done(null, false, {message: "User already exists"});
            const carrito = await cartMng.addCart();
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                cart: carrito._id,
                last_connection: new Date()
            }
            const result = await userService.create(newUser);
            return done(null , result)
        } catch (error) {
            return done("Error al obtener el usuario: "+error)
        }
    }));
    passport.use('login', new LocalStrategy({usernameField:'email'}, async (email , password, done) => {
        try {
            if(email === "adminCoder@coder.com" && password === "adminCod3r123") {
                const user = {
                    _id : "1",
                    first_name: "Administrador",
                    email: "adminCoder@coder.com",
                    age: "Indeterminado",
                    role: "Admin"
                }
                return done (null , user);
            }
            const user = await userService.findOne({email:email})
            if(!user) {
                return done(null , false);
            }
            if(!isValidPassword(user , password)) return done(null , false);
            return done (null , user);
        } catch (error) {
            return done(error)
        }
    }))
    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.d0e2ce5ec6153a62',
        clientSecret: 'dca9b338e6a9a8260952f925a16070fa28594295',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userService.findOne({ email: profile._json.email });
            if (user) return done(null, user);
            let carrito = await cartMng.addCart();
            carrito = carrito[0];
            const newUser = {
                first_name: profile._json.name,
                email: profile._json.email,
                age: 18,
                password: '',
                cart: carrito._id
            }
            user = await userService.create(newUser);
            return done(null, user);
        } catch (error) {
            return done({ message: 'Error creating user' });
        }
    }));
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (_id, done) => {
        try {
            if (_id === "1") {
                const user = {
                    _id : "1",
                    first_name: "Administrador",
                    email: "adminCoder@coder.com",
                    age: "Indeterminado",
                    role: "Admin"
                }
                return done(null, user);
            }
            const user = await userService.findOne({ _id });
            return done(null, user);
        } catch {
            return done({ message: "Error deserializing user" });
        }
    });
};

export default initializePassport;
