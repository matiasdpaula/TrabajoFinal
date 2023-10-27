import { Router } from "express";
import { productos , chat , log , profile , inicio , carritos , loggerTest , recover, changePassword, users } from "../controllers/views.controller.js";
import { restrictedAccess, privateAccess, validarToken, adminAccess } from "../utils.js";

const router = Router();

router.get("/products", privateAccess, productos);
router.get("/users", adminAccess, users)
router.get("/chat", chat);
router.get("/carts/:cid", privateAccess, carritos);
router.get("/login", log);
router.get("/profile", privateAccess, profile);
router.get('/', privateAccess, inicio);
router.get('/recover', recover)
router.get('/changePassword/:token', validarToken, changePassword)
router.get('/loggerTest', loggerTest)

export default router;
