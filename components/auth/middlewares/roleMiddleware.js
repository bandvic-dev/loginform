import { authConfig } from '../authConfig.js';
import jwt from 'jsonwebtoken';

export default function (roles) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token = req.cookies.auth

      if (!token) {
        return res.redirect('/auth/');
      }

      const { roles: userRoles } = jwt.verify(token, authConfig.secret)
      let hasRole = false

      userRoles.forEach(role => {
        if (roles.includes(role)) {
          hasRole = true
        }
      });

      if (!hasRole) {
        res.cookie('auth', '', { maxAge: 0, httpOnly: true })
        return res.redirect('/auth/');
      }

      next();
    } catch (error) {
      res.cookie('auth', '', { maxAge: 0, httpOnly: true })
      return res.redirect('/auth/');
    }
  };
}
