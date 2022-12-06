import { Request } from 'express';
import { UserEntity } from 'src/user/entity/user.entity';

export type IUser = Omit<UserEntity, 'password'>;

export interface AuthResponse {
  token: string;
  user: {
    email: string;
  };
}

export interface JwtPayload {
  user: IUser;
}

export interface AuthRequest extends Request {
  user: JwtPayload;
}
