import { Injectable } from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import * as fs from 'fs'
import { Medico } from './entities/medico.entity';

@Injectable()
export class MedicosService {
  private readonly path = 'src/data/medicos.json'

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
    let listaDeMedicos = this.lerBancoJson()
    let ids = listaDeMedicos.map(m => m.id)
    const maiorId = ids.length > 0 ? Math.max(...ids) : 0;
    return maiorId + 1;
  }

  async criarMedico(createMedicoDto: CreateMedicoDto) {
    const listaDeMedicos = this.lerBancoJson()
    const novoMedico = new Medico(
      this.criaId(),
      createMedicoDto.nome,
      createMedicoDto.especialidade,
      createMedicoDto.crm
    )
    listaDeMedicos.push(novoMedico)
    fs.writeFileSync(this.path, JSON.stringify(listaDeMedicos, null, 2), 'utf8')
    return novoMedico;
  }

  listarTodos() {
    const listaDeMedicos = this.lerBancoJson()
    return listaDeMedicos
  }

}
