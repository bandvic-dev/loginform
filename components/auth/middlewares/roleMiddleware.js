import { config } from '../config.js';
import jwt from 'jsonwebtoken';

export default function (roles) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      // const token = req.headers.authorization.split(' ')[1];
      const token = req.cookies.auth

      if (!token) {
        return res.redirect('/auth/');
        // return res.status(403).json({ message: 'User unauthorized!!' });
      }

      const { roles: userRoles } = jwt.verify(token, config.secret)
      let hasRole = false

      userRoles.forEach(role => {
        if (roles.includes(role)) {
          hasRole = true
        }
      });

      if (!hasRole) {
        res.cookie('auth', '', { maxAge: 0, httpOnly: true })
        return res.redirect('/auth/');
        // return res.status(403).json({ access: false, message: 'No Access to this resource!' });
      }

      next();
    } catch (error) {
      return res.status(403).json({ message: 'User unauthorized!' });
    }
  };
}
