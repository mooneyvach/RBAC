import type { Response } from 'express';
import type { AuthRequest } from '../middleware/rbacMiddleware';
import { getAllUsers, createUser, deleteUser } from '../models/userModel';
import { getAllRoles } from '../models/roleModel';

export const listUsers = async (req: AuthRequest, res: Response) => {
  const users = await getAllUsers();
  const roles = await getAllRoles();
  res.render('layouts/main', {
    title: 'User Management',
    body: 'users/list',
    users,
    roles,
    userRole: req.user?.role_id
  });
};

export const storeUser = async (req: AuthRequest, res: Response) => {
  const { username, password, role_id } = req.body;
  const normalizedRoleId = Array.isArray(role_id) ? role_id[0] : role_id ?? '';
  await createUser({
    username,
    password,
    role_id: parseInt(normalizedRoleId, 10)
  });
  res.redirect('/users');
};

export const removeUser = async (req: AuthRequest, res: Response) => {
  const id = parseInt(req.params.id as string, 10);
  await deleteUser(id);
  res.redirect('/users');
};