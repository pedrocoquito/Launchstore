const User = require('../models/User')

async function post(req, res, next) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.render('user/register', {
                user: req.body,
                error: 'Por favor preencha todos os campos'
            })
        }
    }

    let { email, cpf_cnpj, password, passwordRepeat, cep } = req.body

    cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
    cep = cep.replace(/\D/g, "")

    const user = await User.findOne({ where: { email }, or: { cpf_cnpj } })

    if (user) return res.render('user/register', {
        user: req.body,
        error: 'Usuário já cadastrado'
    })

    if (password != passwordRepeat) return res.render('user/register', {
        user: req.body,
        error: 'As senhas estão diferentes'
    })

    next()
}

module.exports = {
    post
}