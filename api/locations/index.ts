import { Router } from 'express';
import { isAuth, hasRole } from '../../auth/auth.services';
import {
  handlerAllLocations,
  handlerOneLocation,
  handlerAddLocation,
  handlerUpdateLocation,
  handlerDeleteLocation
} from './locations.controller';

const router = Router();

router.get('/', isAuth(), hasRole(['admin', 'user']), handlerAllLocations);
router.get('/:id', isAuth(), hasRole(['admin', 'user']), handlerOneLocation);
router.post('/', isAuth(), hasRole(['admin', 'user']), handlerAddLocation);
router.patch('/:id', isAuth(), hasRole(['admin', 'user']), handlerUpdateLocation);
router.delete('/:id', isAuth(), hasRole(['admin', 'user']), handlerDeleteLocation);

export default router;
