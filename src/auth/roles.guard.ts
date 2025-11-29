import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class adminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean  {
    const { user } = context.switchToHttp().getRequest()
    if(user.perfil === 'admin'){
      return true
    }
    return false;
  }
}
