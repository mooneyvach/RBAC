import { Router } from 'express';
import { listRoles, storeRole, removeRole } from '../controllers/roleController';
import { checkPermission } from '../middleware/rbacMiddleware';

const router = Router();

router.get('/', checkPermission('role:view'), listRoles);
router.post('/', checkPermission('role:create'), storeRole);
router.delete('/:id', checkPermission('role:delete'), removeRole);

export default router;