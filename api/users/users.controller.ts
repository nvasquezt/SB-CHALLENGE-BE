import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import {
  getOneUser,
  addNewUser,
  updateUser,
  deleteUser,
} from './users.services';

export async function handlerOneUser(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const user = await getOneUser(id);
    if (!user) {
      res.status(404).json({ message: 'No user found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while getting user', error });
  }
}

export async function handlerRegisterUser(req: Request, res: Response) {
  const dataUser = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(dataUser.password, salt);
  dataUser.password = hash;
  try {
    const addUser = await addNewUser(dataUser);
    if (!addUser) {
      throw new Error('User not added');
    } else {
      res.status(200).json(addUser);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error Register User', error });
  }
}

export async function handlerUpdateUser(req: Request, res: Response) {
  const id: string = req.params.id;
  const user = req.body;
  try {
    const patchUser = await updateUser(id, user);
    if (!patchUser) {
      res.status(404).json({ message: 'User was not updated' });
    } else {
      res.status(200).json(patchUser);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while updating user', error });
  }
}

export async function handlerDeleteUser(req: Request, res: Response) {
  const id: string = req.params.id;
  try {
    const deletedUser = await deleteUser(id);
    if (!deletedUser) {
      res.status(404).json({ message: 'User was not deleted' });
    } else {
      res.status(200).json(deletedUser);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while deleting user', error });
  }
}
