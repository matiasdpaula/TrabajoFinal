import { Router } from "express";
import { productos , chat , log , profile , inicio , carritos } from "../controllers/views.controller.js";
import { privateAccess , publicAccess } from "../utils.js";

const router = Router();

router.get("/products", privateAccess, productos);
router.get("/chat", chat);
router.get("/carts/:cid", privateAccess, carritos);
router.get("/login", publicAccess, log);
router.get("/profile", privateAccess, profile);
router.get('/', privateAccess, inicio);

export default router;
