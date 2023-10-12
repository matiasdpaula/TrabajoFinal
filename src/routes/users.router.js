import {Router} from "express";
import {updateDocuments, updateRole} from '../controllers/users.controller.js';
import {upload} from '../utils.js'

const router = Router();

router.put('/premium/:uid', updateRole);
router.post('/:uid/documents', upload.any(), updateDocuments);

export default router;