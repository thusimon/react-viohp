import { Request } from 'express';

export interface IUserRequest extends Request {
  user: {
    _id: string;
  },
  token: object;
};
