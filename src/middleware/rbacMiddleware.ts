import type { Request, Response, NextFunction } from 'express';
import pool from '../config/database';

// Extend Request agar ada properti user
export interface AuthRequest extends Request {
  user?: { id: number; role_id: number };
}

export const checkPermission = (requiredPermission: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    if (!userId) return res.status(401).send('Unauthorized');

    try {
      // Query sesuai instruksi materi dosen
      const [rows] = await pool.query(`
        SELECT p.name FROM users u
        JOIN roles r ON u.role_id = r.id
        JOIN role_permissions rp ON r.id = rp.role_id
        JOIN permissions p ON rp.permission_id = p.id
        WHERE u.id = ?
      `, [userId]);

      const permissions = (rows as any[]).map(row => row.name);
      
      console.log(`User ${userId} permissions:`, permissions);
      console.log(`Required permission: ${requiredPermission}`);

      if (permissions.includes(requiredPermission)) {
        next();
      } else {
        res.status(403).send('Forbidden: insufficient permissions');
      }
    } catch (error) {
      console.error('Permission check error:', error);
      res.status(500).send('Internal Server Error');
    }
  };
};

// Middleware simulasi login sesuai maumu
export const setUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Ambil dari ?userId= di URL, kalau gak ada default ke ID 1
  const userId = req.query.userId ? parseInt(req.query.userId as string) : 1;
  req.user = { id: userId, role_id: 0 }; // role_id akan dihandle query DB nanti
  next();
};