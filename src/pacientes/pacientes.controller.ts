import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RecepcaoGuard } from 'src/auth/recepcao.guard';

@UseGuards(AuthGuard, RecepcaoGuard)
@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) { }

  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesService.cadastrarPaciente(createPacienteDto);
  }

  @Get()
  listarTodosPacientes() {
    return this.pacientesService.listarTodos();
  }
}
