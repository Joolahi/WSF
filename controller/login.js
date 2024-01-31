const jwt = require('jsonwebtoken')
const brycpt = require('bcryptjs')
const User = require('../models/user')

require('dotenv').config()
const TOKEN =  process.env.TOKEN
const JWT_EXPIRES_IN = process.env.EXPIRES
const login = async (req, res) => {
    const {name, password} = req.body
    const user = await User.findOne({name})

    const passwordCorrect = user === null ? false : await brycpt.compare(password, user.passwordConfirm)

    if(!(user && passwordCorrect)) {
        return res.status(401).json({error: 'Invalid username or password'})
    }

    const userForToken = {
        name: user.name,
        id: user._id
    }
    
    console.log(TOKEN)
    const token = jwt.sign(userForToken, TOKEN, {expiresIn: JWT_EXPIRES_IN})

    res.status(200).send({token, name: user.name, id: user._id})

}

module.exports = login