const jwt = require('jsonwebtoken')

require('dotenv').config()
secretKey = process.env.SECRET_KEY
TOKEN = process.env.TOKEN
// Authenticate users
const authUser = async (req,res,next) => {
  const authHeader = req.headers.authorization
  if(!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ error: 'no token provided' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token,TOKEN)
    const { id, username, role } = decoded
    req.user = { id, username, role }
    next()
  } catch (error) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
}

module.exports = authUser