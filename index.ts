import express, { Express, Request, Response } from 'express';
import routes from './utils/routes';
import configExpress from './config/express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

configExpress(app);
routes(app);

const port = process.env.PORT;
app.get('/', (req: Request, res: Response) => {
  res.send('Health Check system location for Spy Bee Challenge');
});

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});