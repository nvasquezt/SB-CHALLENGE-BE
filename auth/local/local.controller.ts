import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { getOneUser } from '../../api/users/users.service';
import { signToken } from '../auth.service';

export const handlerLoginUser = async (req: Request, res: Response) => {
  const { userId, password } = req.body;
  try {
    const user = await getOneUser(userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid user or password' });
    } else {
      const token = signToken(user.idUser, user.name, user.lastName, user.role);
      return res.status(200).json({ token });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Internal server errors' });
  }
};
