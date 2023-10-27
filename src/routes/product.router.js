import { Router } from "express";
import { getAllProducts , getProductById , getMockingProducts , createProduct , updateProduct , deleteProduct , mockFatalError } from "../controllers/product.controller.js";
import { restrictedAccess } from "../utils.js";

const router = Router();

router.get('/', getAllProducts);
router.post('/', restrictedAccess, createProduct);
router.get('/mockingproducts', getMockingProducts)
router.get('/fatal', mockFatalError)
router.post('/productLoggerTest', createProduct);
router.get('/:pid', getProductById);
router.put('/:pid', restrictedAccess, updateProduct);
router.delete('/:pid', restrictedAccess, deleteProduct);

export default router;