import {Router} from "express";
import {updateDocuments, deleteUser, getAllUsers, deleteUsersByDate, updateRole, adminUpdate} from '../controllers/users.controller.js';
import {adminAccess, privateAccess, upload} from '../utils.js'

const router = Router();

router.put('/premium/:uid', privateAccess, updateRole);
router.put('/adminUpdate/:uid', adminAccess, adminUpdate)
router.delete('/deleteUser', adminAccess, deleteUser)
router.post('/:uid/documents', upload.any(), updateDocuments);
router.get('/', getAllUsers)
router.delete('/', deleteUsersByDate)


export default router;