import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RecepcaoGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean  {
    const { user } = context.switchToHttp().getRequest()
    if(user.perfil === 'recepcao' || user.perfil === 'admin'){
      return true
    }
    return false;
  }
}
