import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { getUserByEmail } from '../../api/users/users.services';
import { signToken } from '../auth.services';

export const handlerLoginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password);
  
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid user or password' });
    } else {
      const token = signToken(user.id, user.fullName, user.role);
      return res.status(200).json({ token });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Internal server errors' });
  }
};
