const jwt = require('jsonwebtoken')
const JWT_SECRET = 'minha-senha'


export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        res.status(401).json({ message: "Token não fornecido" })
    }
    jwt.verify(token, JWT_SECRET, (erro, userPayload) => {
        console.log("tokem :", token)
        if (erro) {
            console.error(erro)
            res.status(403).json({ message: "token errado ou expirado" })
        }
        req.user = userPayload;
        next();
    })

}

export function authorizeRole(req) {
    // const roles = [].concat(allowedRoles)
    const allowedRoles = []
    console.log(req.user)
    if (req.user.role != allowedRoles) {
        return ({ erro: "Acesso negado" })
    }
}

