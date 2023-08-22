import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export default __dirname;

export const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect("/products");
    next();
};

export const privateAccess = (req, res, next) => {
    if (!req.session.user) return res.redirect("/login");
    next();
};

export const adminAccess = (req, res, next) => {
    if (!req.session.user) return res.redirect("/login");
    if (req.session.user.role === "Admin"){
        return next();
    } return res.redirect("/login");
}

