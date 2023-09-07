import { Router } from "express";
import { getAllProducts , getProductById , getMockingProducts , createProduct , updateProduct , deleteProduct , mockFatalError } from "../controllers/product.controller.js";
import { adminAccess } from "../utils.js";

const router = Router();

router.get('/', getAllProducts);
router.post('/', adminAccess, createProduct);
router.get('/mockingproducts', getMockingProducts)
router.get('/fatal', mockFatalError)
router.post('/productLoggerTest', createProduct);
router.get('/:pid', getProductById);
router.put('/:pid', adminAccess, updateProduct);
router.delete('/:pid', adminAccess, deleteProduct);

export default router;