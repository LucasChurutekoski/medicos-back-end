import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';


@Injectable()
export class UsuariosService {
  private readonly path = 'src/data/usuarios.json'

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

  private async hashearSenha(senha) {
    const saltRounds = 10;
    const senhaHasheada = await bcrypt.hash(senha, saltRounds)
    return senhaHasheada
  }

  private criaId() {
    const usuario = this.lerBancoJson()
    const id = usuario.length + 1
    return id
  }

  async criarUsuario(createUsuarioDto: CreateUsuarioDto) {
    const usuarios = this.lerBancoJson()
    const senhaHasheada = await this.hashearSenha(createUsuarioDto.senha.toString())
    const novoUsuario = new Usuario(
      this.criaId(),
      createUsuarioDto.email,
      senhaHasheada,
      createUsuarioDto.perfil
    )
    usuarios.push(novoUsuario)
    fs.writeFileSync(this.path, JSON.stringify(usuarios, null, 2), 'utf8')
    return novoUsuario;
  }

  buscarPorEmail(email: string) {
    const usuarios = this.lerBancoJson()
    const UsuarioEncontrado = usuarios.filter(usuario => usuario.email === email)
    if (!UsuarioEncontrado) {
      throw new NotFoundException("Usuário não encontrado")
    }
    return UsuarioEncontrado
  }

}
