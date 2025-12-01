import { Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import * as fs from 'fs';
import { Paciente } from './entities/paciente.entity';

@Injectable()
export class PacientesService {

  private readonly path = 'src/data/pacientes.json'

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
    let pacientes = this.lerBancoJson()
    let ids = pacientes.map(m => m.id)
    const maiorId = ids.length > 0 ? Math.max(...ids) : 0;
    return maiorId + 1;
  }
  async cadastrarPaciente(createPacienteDto: CreatePacienteDto) {
    const listaPacientes = this.lerBancoJson()
    const novoPaciente = new Paciente(
      this.criaId(),
      createPacienteDto.nome,
      createPacienteDto.cpf,
      createPacienteDto.telefone
    )
    listaPacientes.push(novoPaciente)
    fs.writeFileSync(this.path, JSON.stringify(listaPacientes, null, 2), 'utf8')
    return novoPaciente
  }

  listarTodos() {
    const todosPacientes = this.lerBancoJson()
    return todosPacientes;
  }
}
