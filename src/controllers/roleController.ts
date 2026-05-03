import type { Response } from 'express';
import type { AuthRequest } from '../middleware/rbacMiddleware';
import { getAllRoles, createRole, deleteRole } from '../models/roleModel';

export const listRoles = async (req: AuthRequest, res: Response) => {
  const roles = await getAllRoles();
  res.render('layouts/main', {
    title: 'Role Management',
    body: 'roles/list',
    roles,
    userRole: req.user?.role_id
  });
};

export const storeRole = async (req: AuthRequest, res: Response) => {
  const { name } = req.body;
  await createRole(name);
  res.redirect('/roles');
};

export const removeRole = async (req: AuthRequest, res: Response) => {
  await deleteRole(parseInt(req.params.id as string));
  res.redirect('/roles');
};