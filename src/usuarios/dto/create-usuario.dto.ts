import { IsNotEmpty, IsString } from "class-validator"

export class CreateUsuarioDto {

    @IsNotEmpty({message : "email é obrigatório"})
    email : string
    @IsNotEmpty({message : "senha é obrigatório"})
    senha : string
    @IsNotEmpty({message : "perfil é obrigatório"})
    perfil : string
}


