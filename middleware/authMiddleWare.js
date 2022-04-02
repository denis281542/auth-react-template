const jwt = require('jsonwebtoken')
const { secret } = require('../config')

module.exports = function(req, res, next) {
    if(req.method === "OPTIONS") {
        next()
    }

    try {
        const toket = req.headers.authorization.split(" ")[1]
        if(!toket) {
            return res.status(400).json({message: "Пользователь не авторизован"})
        }
        const decodedData = jwt.verify(toket, secret)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(400).json({message: `Пользователь не авторизован`})
    }
}