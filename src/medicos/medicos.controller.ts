import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { adminGuard } from 'src/auth/roles.guard';
import { RecepcaoGuard } from 'src/auth/recepcao.guard';

@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  //verificaTokendoADmin
  @UseGuards(AuthGuard, adminGuard)
  @Post()
  create(@Body() createMedicoDto: CreateMedicoDto) {
    return this.medicosService.criarMedico(createMedicoDto);
  }

  @Get()
  findAll() {
    return this.medicosService.listarTodos();
  }
}
