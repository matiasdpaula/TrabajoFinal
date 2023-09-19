import { Router } from "express";
import { updateRole} from '../controllers/users.controller.js';

const router = Router();

router.put('/premium/:uid', updateRole);

export default router;