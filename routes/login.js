const express = require('express')
const loginRouter = express.Router()

const login = require('../controller/login')

loginRouter.post('/', async (req,res) => {
    try {
        login(req,res)
    }
    catch (error) {
        console.log(error)
    }
})

module.exports = loginRouter