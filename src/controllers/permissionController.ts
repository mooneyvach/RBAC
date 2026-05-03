import type { Response } from 'express';
import type { AuthRequest } from '../middleware/rbacMiddleware';
import { getAllPermissions, createPermission, assignPermissionToRole } from '../models/permissionModel';
import { getAllRoles } from '../models/roleModel';

export const listPermissions = async (req: AuthRequest, res: Response) => {
  const permissions = await getAllPermissions();
  const roles = await getAllRoles();
  res.render('layouts/main', {
    title: 'Permission Management',
    body: 'permissions/list',
    permissions,
    roles,
    userRole: req.user?.role_id
  });
};

export const storePermission = async (req: AuthRequest, res: Response) => {
  const { name, resource, action } = req.body;
  await createPermission(name, resource, action);
  res.redirect('/permissions');
};

export const assignPermission = async (req: AuthRequest, res: Response) => {
  const { role_id, permission_id } = req.body;
  await assignPermissionToRole(parseInt(role_id), parseInt(permission_id));
  res.redirect('/permissions');
};