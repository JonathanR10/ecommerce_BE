import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException('No se ha enviado token');

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token)
      throw new UnauthorizedException('No se ha enviado token');

    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const payload = this.jwtService.verify(token, {
        secret,
      });

      req.user = payload;
    } catch (error: any) {
      if (error.name === 'TokenExpiredError')
        throw new UnauthorizedException('El token ha expirado');
      else if (error.name === 'JsonWebTokenError')
        throw new UnauthorizedException(
          'Error en el Token. Formato incorrecto o corrupto',
        );
      else if (error.name === 'NotBeforeError')
        throw new UnauthorizedException(
          'Token valido para una fecha posterior',
        );
      throw new UnauthorizedException('Error en el token');
    }
    return true;
  }
}
