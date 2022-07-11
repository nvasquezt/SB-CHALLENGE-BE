import express, { Express } from 'express';
import cors from 'cors';

function configExpress(app: Express) {
  const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
  };

  app.use(cors(corsOptions));
  app.use(express.json());
}

export default configExpress;
