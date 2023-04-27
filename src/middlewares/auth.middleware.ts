import {Injectable, NestMiddleware, UnauthorizedException} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {verify} from 'jsonwebtoken';
import * as dotenv from "dotenv";


dotenv.config()
@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["auth-user"];
    if (authHeader){
      let token: string;
      if (Array.isArray(authHeader)) {
      token = authHeader.join('');
      } else {
        token = authHeader;
      } try {
        const decoded = verify(token,process.env.JWT_SECRET)
        req["user"]=decoded;
      }catch (e) {
          throw new UnauthorizedException("Invalid token")
      }
    }
    else {
      throw new UnauthorizedException()
    }
    next();
  }
}


