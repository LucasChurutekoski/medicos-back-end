import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { AuthResponseDto } from './dto/AuthResponseDto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly usuariosService : UsuariosService,
        private readonly jwtService : JwtService
    ){ }
    
    async signIn(email : string, password : string) : Promise<AuthResponseDto>{

        const resposta = this.usuariosService.buscarPorEmail(email)
        const usuarioEncontrado = resposta[0]
        
        if(!usuarioEncontrado || !await bcrypt.compare(password, usuarioEncontrado.senhaHash)){
            throw new UnauthorizedException("Confidenciais não conferem")
        }
                
        const payload = {
            sub : usuarioEncontrado.id,
            email : usuarioEncontrado.email,
            perfil : usuarioEncontrado.perfil
        }
        
        const token = this.jwtService.sign(payload)
        return {
            token : token,
            expiresIn : '2h'
        }

    }
}
