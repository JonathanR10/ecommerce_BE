import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/config/environment';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

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
      const payload = this.jwtService.verify(token, {
        secret: environment.JWT_SECRET,
      });

      req.user = payload;
    } catch (error) {
      if (error.name === 'TokenExpiredError')
        throw new UnauthorizedException('El token ha expirado');
      throw new UnauthorizedException('Error en el token');
    }
    return true;
  }
}
