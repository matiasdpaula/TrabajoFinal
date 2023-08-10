import { Router } from "express";
import { productos , chat , log , profile , inicio , carritos } from "../controllers/views.controller.js";

const router = Router();

const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect("/products");
    next();
};

const privateAccess = (req, res, next) => {
    if (!req.session.user) return res.redirect("/login");
    next();
};

router.get("/products", privateAccess, productos);
router.get("/chat", chat);
router.get("/carts/:cid", carritos);
router.get("/login", publicAccess, log);
router.get("/perfil", privateAccess, profile);
router.get('/', privateAccess, inicio);

export default router;
