import express from 'express';
import { listUsers, storeUser, removeUser } from '../controllers/userController';
import { checkPermission } from '../middleware/rbacMiddleware';

const router = express.Router();

// User harus punya permission 'user:view' untuk lihat list
router.get('/', checkPermission('user:view'), listUsers);

// User harus punya permission 'user:create' untuk tambah user
router.post('/', checkPermission('user:create'), storeUser);

// User harus punya permission 'user:delete' untuk hapus user
router.delete('/:id', checkPermission('user:delete'), removeUser);

export default router;