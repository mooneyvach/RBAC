import { Router } from 'express';
import { listPermissions, storePermission, assignPermission } from '../controllers/permissionController';
import { checkPermission } from '../middleware/rbacMiddleware';

const router = Router();

router.get('/', checkPermission('permission:view'), listPermissions);
router.post('/', checkPermission('permission:create'), storePermission);
router.post('/assign', checkPermission('permission:assign'), assignPermission);

export default router;