import { Router } from "express";
import { getAllProducts , getProductById , createProduct , updateProduct , deleteProduct } from "../controllers/product.controller.js";
import { adminAccess, publicAccess} from "../utils.js";

const router = Router();

router.get('/', publicAccess, getAllProducts);
router.get('/:pid', publicAccess, getProductById);
router.post('/', adminAccess, createProduct);
router.put('/:pid', adminAccess, updateProduct);
router.delete('/:pid', adminAccess, deleteProduct);

export default router;