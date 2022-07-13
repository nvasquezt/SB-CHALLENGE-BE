import { Router } from 'express';
import { isAuth, hasRole } from '../../auth/auth.services';
import {
  handlerOneUser,
  handlerRegisterUser,
  handlerUpdateUser,
  handlerDeleteUser
} from './users.controller';

const router = Router();

router.get('/:id', isAuth(), hasRole(['admin', 'user']), handlerOneUser);
router.post('/', handlerRegisterUser);
router.patch('/:id', isAuth(), hasRole(['admin', 'user']), handlerUpdateUser);
router.delete('/:id', isAuth(), hasRole(['admin']), handlerDeleteUser);

export default router;
