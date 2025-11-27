import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';


@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  //authverificaAdmin
  
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.criarUsuario(createUsuarioDto);
  }

  @Get('/:email')
  findAll(@Param('email') email : string) {
    return this.usuariosService.buscarPorEmail(email);
  }

}
