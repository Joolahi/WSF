const userRouter = require('express').Router()
const { createUser} = require('../controller/users')

userRouter.post('/', async (req, res) => {
    try {
        createUser(req, res)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

module.exports = userRouter