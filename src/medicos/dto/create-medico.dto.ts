import { IsNotEmpty } from "class-validator"

export class CreateMedicoDto {
    @IsNotEmpty({message : "Nome do médico é obrigatório"})
    nome : string
    @IsNotEmpty({message : "Especialidade do médico é obrigatória"})
    especialidade : string
    @IsNotEmpty({message : "Crm é obrigatório"})
    crm : string
}
