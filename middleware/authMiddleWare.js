module.exports = (req, res, next) => {
    if(req.method === "OPTIONS") {
        next()
    }

    try {

    } catch (e) {
        console.log(e)
        return res.status(400).json({message: `Ошибка: ${e}`})
    }
}