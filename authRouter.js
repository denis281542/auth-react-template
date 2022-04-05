const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require('express-validator')
const authMiddleWare = require('./middleware/authMiddleWare')

router.post('/registration', [
    check('username', 'Имя не может быть пустым').notEmpty(),
    check('password', 'Пароль не может меньше 4 и больше 10 символов ').isLength({
        min: 4,
        max: 10
    }),
], controller.registration)
router.post('/login', controller.login)
router.delete('/delete', controller.deleteUser)
router.get('/users', controller.getUsers)
router.put('/user', controller.updateUser)


module.exports = router