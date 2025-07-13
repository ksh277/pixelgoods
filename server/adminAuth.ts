import { Request, Response, NextFunction } from 'express';

// Simple admin authentication middleware
export interface AdminSession {
  isAdmin: boolean;
  loginTime: Date;
}

// Extend Express Request to include admin session
declare global {
  namespace Express {
    interface Request {
      adminSession?: AdminSession;
    }
  }
}

// Default admin credentials
const ADMIN_CREDENTIALS = [
  { username: 'admin', password: '12345' },
  { username: 'superadmin', password: '12345' }
];

export function initializeAdminAuth(app: any) {
  // Admin login endpoint
  app.post('/api/admin/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    const validCredentials = ADMIN_CREDENTIALS.find(cred => cred.username === username && cred.password === password);
    
    if (validCredentials) {
      // Set admin session
      req.session.adminSession = {
        isAdmin: true,
        loginTime: new Date()
      };
      
      res.json({ success: true, message: 'Admin login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });

  // Admin logout endpoint
  app.post('/api/admin/logout', (req: Request, res: Response) => {
    req.session.adminSession = undefined;
    res.json({ success: true, message: 'Admin logged out' });
  });

  // Check admin status endpoint
  app.get('/api/admin/status', (req: Request, res: Response) => {
    const isAdmin = req.session.adminSession?.isAdmin || false;
    res.json({ isAdmin });
  });
}

// Admin authentication middleware
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session.adminSession?.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: 'Admin access required' });
  }
}