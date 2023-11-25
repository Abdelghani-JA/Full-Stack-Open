const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')


loginRouter.post('/', async (req, res) => {
  const toToken = req.body
  if ((!toToken.username && toToken.password)){
    return res.status(400).json({error: "invalid credentials"})
  }

  const userInDb = await User.findOne({username:toToken.username})

  const passwordCorrect = userInDb === null
  ? false
  : await bcrypt.compare(toToken.password, userInDb.passwordHash)

  if (!passwordCorrect) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const token = jwt.sign({username: userInDb.username, id:userInDb._id}, process.env.SECRET)
  res.json({token})
})



module.exports = loginRouter