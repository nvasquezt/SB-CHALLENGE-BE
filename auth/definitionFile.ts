import { Request } from 'express';

export interface InfoAuthRequest extends Request {
  user: {
    role: string;
  };
}