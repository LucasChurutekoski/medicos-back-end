import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MedicosModule } from './medicos/medicos.module';

@Module({
  imports: [UsuariosModule, MedicosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
