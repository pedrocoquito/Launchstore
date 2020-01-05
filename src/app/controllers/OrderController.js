const LoadProductService = require('../services/LoadProductService')
const User = require('../models/User')

const mailer = require('../../lib/mailer')

const email = (seller, product, buyer) => `
<h2> Olá ${seller.name}!</h2>
<p>Seu Produto ${product.formattedPrice} foi vendido!</p>
<p>O comprador ${buyer.email} aguarda envio.</p>
<p>Endereço: ${buyer.address} -- ${buyer.cep}</p>
`

module.exports = {
    async post(req, res) {
        try {
            const product = await LoadProductService.load('product', {
                where: { id: req.body.id }
            })

            const seller = await User.findOne({
                where: {
                    id: product.user_id
                }
            })

            const buyer = User.findOne({
                where: {
                    id: req.session.userId
                }
            })

            await mailer.sendMail({
                to: seller.email,
                from: 'loja@venda.com',
                subject: `Seu produto ${product.name} foi vendido!`,
                html: email(seller, product, buyer)
            })

            return res.render('orders/success')
        } catch (err) {
            console.error(err)
            return res.render('orders/error')
        }
    }
}