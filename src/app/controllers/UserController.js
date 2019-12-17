
const User = require('../models/User')

module.exports = {
    registerForm(req, res) {
        return res.render("user/register")
    },
    async post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Por favor preencha todos os campos!")
            }
        }

        let { email, cpf_cnpj, password, passwordRepeat } = req.body

        cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

        const user = await User.findOne({where: {email}, or: {cpf_cnpj}})

        if(user) return res.send('Usuário já existe!')

        if(password != passwordRepeat) return res.send('Sua senha precisa ser igual')

        return res.send('Tudo ok')
    }
}