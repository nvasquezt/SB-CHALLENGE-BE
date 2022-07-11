import { Router } from 'express';
import users from '../api/users';
import locations from '../api/locations';
import authLocal from '../auth/local';

function routes(app: Router): void {
  app.use('/api/users', users);
  app.use('/api/locations', locations);
  app.use('/auth/local', authLocal);
}

export default routes;
