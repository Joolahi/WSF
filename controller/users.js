const User = require('../models/user')
const brycpt = require('bcryptjs')

const  createUser = async (req, res) => {
    const { name, email, password, passwordConfirm} = req.body
    console.log(name,email,password,passwordConfirm)
    const registeredUser = await User.findOne({email})
    if(registeredUser) {
        res.status(400).json({message: 'User already exists'})
    }

    if(password !== passwordConfirm)
    {
        res.status(400).json({message: 'Passwords do not match'})
    }

    const saltRounds = 10
    const passwordAdd = await brycpt.hash(password, saltRounds)
    const user = new User({
        name,  
        email,
        password: passwordAdd,
        passwordConfirm: passwordAdd,
      
    })
    await user.save()
    res.status(200).json({user})
}

module.exports = {createUser}