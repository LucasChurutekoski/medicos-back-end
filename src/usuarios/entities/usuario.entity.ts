export class Usuario {
    id: Number
    email: string
    senhaHash: string
    perfil: string

    constructor(id, email, senhaHash, perfil){
        this.id = id
        this.email = email
        this.senhaHash = senhaHash
        this.perfil = perfil
    }
}
