import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import * as fs from 'fs'
import { Consulta } from './entities/consulta.entity';

@Injectable()
export class ConsultasService {

  private readonly path = 'src/data/consultas.json'

  private lerBancoJson() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8')
      if (!data.trim()) {
        return []
      }
      return JSON.parse(data)
    } catch (error) {
      console.error(error)
    }
  }

  private criaId() {
    const usuario = this.lerBancoJson()
    const id = usuario.length + 1
    return id
  }

  agendarConsulta(createConsultaDto: CreateConsultaDto) {
    const consultas = this.lerBancoJson()    
    const novaConsulta = new Consulta(
      this.criaId(),
      createConsultaDto.dataHora,
      'Agendada',
      createConsultaDto.medicoId,
      createConsultaDto.pacienteId
    )
    console.log(novaConsulta);
    
    consultas.push(novaConsulta)
    fs.writeFileSync(this.path, JSON.stringify(consultas, null, 2), 'utf8')
    return novaConsulta
  }

  listarConsultas() {
    const consultas = this.lerBancoJson()
    return consultas
  }

  buscaConsultaPorId(id: number) {
    const consultas = this.lerBancoJson()
    const consultaEncontrada = consultas.find(consulta => consulta.id === id)
    if (!consultaEncontrada) {
      throw new NotFoundException("consulta com este id não encontrada")
    }
    return consultaEncontrada;
  }

  atualizarStatusDaConsulta(id: number, status: string) {
    const consultas = this.lerBancoJson()
    const indice = consultas.findIndex(consulta => consulta.id == id)
    if (indice === -1) {
      throw new NotFoundException(`Consulta com ID ${id} não encontrada para atualização.`);
    }
    const consultaEncontrada = consultas[indice]    
    consultaEncontrada.status = status

    fs.writeFileSync(this.path, JSON.stringify(consultas, null, 2), 'utf8')
    return consultaEncontrada
  }

  cancelarConsulta(id: number) {
    const consultaCancelada = this.atualizarStatusDaConsulta(id, 'cancelada')
    return consultaCancelada
  }
}
