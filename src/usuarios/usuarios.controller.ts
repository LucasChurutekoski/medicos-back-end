import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { adminGuard } from 'src/auth/roles.guard';


@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  //authverificaAdmin
  
  @Post()
  @UseGuards(AuthGuard, adminGuard)
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.criarUsuario(createUsuarioDto);
  }

  @Get('/:email')
  buscaUsuarioPorEmail(@Param('email') email : string) {
    return this.usuariosService.buscarPorEmail(email);
  }

}
