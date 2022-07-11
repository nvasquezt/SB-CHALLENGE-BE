import { Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { InfoAuthRequest } from './definitionFile';
import { getOneUser } from '../api/users/users.service';
import jsonWebToken, { JwtPayload } from 'jsonwebtoken';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const compose = require('composable-middleware');

dotenv.config();

export function isAuth() {
  return compose().use(
    async (req: InfoAuthRequest, res: Response, next: NextFunction) => {
      try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return res.status(401).json({ message: 'No token provided' });
        }
        const token = authHeader.split(' ')[1];
        const payload = (await verifyToken(token)) as JwtPayload;
        if (payload) {
          const user = await getOneUser(payload.idUser);
          if (user) {
            req.user = {
              role: user.role,
            };
            next();
          } else {
            return res.status(401).json({ message: 'Invalid token' });
          }
        }
      } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
      }
    }
  );
}

export function hasRole(allowedRoles = ['admin', 'user']) {
  return compose()
    .use(isAuth())
    .use(async (req: InfoAuthRequest, res: Response, next: NextFunction) => {
      try {
        const { role } = req.user;
        if (!allowedRoles.includes(role)) {
          return res.status(401).json({ message: 'User not authorized' });
        }
        next();
        return null;
      } catch (error) {
        return res.status(401).json({ message: 'User not authorized' });
      }
    });
}

export function verifyToken(token: string) {
  try {
    if (process?.env?.JWT_SECRET) {
      return jsonWebToken.verify(token, process.env.JWT_SECRET);
    }
  } catch (err) {
    return 'Invalid token';
  }
}

export function signToken(
  idUser: string,
  name: string,
  lastName: string,
  role: string
) {
  if (process?.env?.JWT_SECRET) {
    return jsonWebToken.sign(
      {
        idUser,
        name,
        lastName,
        role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );
  }
}
