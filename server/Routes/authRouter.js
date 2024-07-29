const { signup, login } = require('../Controlers/authControler')
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation')

const router = require('express').Router()

router.post("/login",loginValidation,login)

router.post("/signup",signupValidation,signup)

module.exports = {router} 




