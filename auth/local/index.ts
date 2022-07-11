import { Router } from 'express';
import { handlerLoginUser } from './local.controller';

const router = Router();

router.post('/login', handlerLoginUser);

export default router;
