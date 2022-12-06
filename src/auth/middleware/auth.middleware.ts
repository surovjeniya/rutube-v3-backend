import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthService } from '../auth.service';
import { AuthRequest } from '../types/auth.types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return next();
      }
      const accessToken = req.headers.authorization.split(' ')[1];
      if (!accessToken) {
        return next();
      }
      const user = await this.authService.verifyJwt(accessToken);
      req.user = user;
      next();
    } catch (e) {
      return next();
    }
  }
}
