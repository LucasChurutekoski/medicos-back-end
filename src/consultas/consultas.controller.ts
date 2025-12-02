import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RecepcaoGuard } from 'src/auth/recepcao.guard';

 @UseGuards(AuthGuard, RecepcaoGuard)
@Controller('consultas')
export class ConsultasController {
  constructor(private readonly consultasService: ConsultasService) { }

  @Post()
  agendarConsulta(@Body() createConsultaDto: CreateConsultaDto) {
    return this.consultasService.agendarConsulta(createConsultaDto);
  }

  @Get()
  listarConsultas() {
    return this.consultasService.listarConsultas();
  }

  @Get(':id')
  buscarConsultaPeloId(
    @Param('id') id: number
  ) {
    return this.consultasService.buscaConsultaPorId(+id);
  }

  @Put(':id')
  mudarStatusDeUmaConsulta(
    @Param('id') id: number,
    @Body() body ) {
      const { status } = body
    return this.consultasService.atualizarStatusDaConsulta(+id, status);
  }
  @Delete(':id')
  cancelamentoDeConsulta(
    @Param('id') id: number) {
    return this.consultasService.cancelarConsulta(id)
  }

}
