export class Medico {
    id : number
    nome : string
    especialidade : string
    crm : string

    constructor(id, nome, especialidade, crm){
        this.id = id
        this.nome = nome
        this.especialidade = especialidade
        this.crm = crm
    }
}
