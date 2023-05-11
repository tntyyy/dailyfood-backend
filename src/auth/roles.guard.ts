import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';
import { UserRoles } from '../constants/roles';
import { getTokenFromRequest } from './utils/getTokenFromRequest';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRoles) {
        return true;
      }

      const token = getTokenFromRequest(req);

      const user = this.jwtService.verify(token);
      req.user = user;

      return user.roles.some((role) => requiredRoles.includes(role));
    } catch (e) {
      throw new HttpException('Недостаточно прав', HttpStatus.FORBIDDEN);
    }
  }
}
