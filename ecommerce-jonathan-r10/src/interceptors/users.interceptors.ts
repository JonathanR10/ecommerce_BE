import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Users } from 'src/users/users.entity';

@Injectable()
export class UsersInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map(({ password, isAdmin, ...userData }) => userData);
        } else if (typeof data === 'string') {
          return data;
        }
        const { password, isadmin, ...userData } = data;
        return userData;
      }),
    );
  }
}
