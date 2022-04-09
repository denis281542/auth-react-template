const User = require("./models/User")
const Role = require("./models/Role")
const bcrypt = require('bcryptjs')
const {validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { secret } = require("./config")

const generateAccessToken = (id, roles) => {
    const payload = {
        id, roles
    }
    return jwt.sign(payload, secret, { expiresIn: '24h'})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const {username, lastname, password, age} = req.body
            const candidate = await User.findOne({username})
            if(candidate) {
                return res.status(400).json({message: 'User exist'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({
                username: username,
                lastname: lastname,
                password: hashPassword,
                age: age,
                roles: [userRole.value]
            })
            await user.save()
            return res.status(200).json({message: 'success'})
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error'})
        }
    }
    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user) {
                return res.status(400).json({message: `Пользователь ${username} не зарегистрирован`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword) {
                return res.status(400).json({message: "Неверный пароль"})
            }
            
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error'})
        }
    } 
    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e);
        }
    }
    async deleteUser(req, res) { 
        try {
            const {id} = req.params
            const {username} = req.body
            const user = await User.findOne({username: id})
            user.deleteOne() 
            res.status(200).json({message: `Пользователь ${username} удален`})
        } catch (e) {
            console.log(e);
        }
    }
    async updateUser(req, res) { 
        try {
            const {id} = req.params
            const {lastname, age} = req.body
            const user = await User.findOneAndUpdate({username: id}, {lastname: '123', age: '77'}, {
                new: true
              })
            // user.deleteOne() 
            res.status(200).json({message: `${id  }`})
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new authController()