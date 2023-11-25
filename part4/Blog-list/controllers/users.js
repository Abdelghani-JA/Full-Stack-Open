const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {user:0})
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const userToSave = req.body
  if (!(userToSave.password && userToSave.password.length >= 3)){
    return res.status(400).json({ error: "invalid password"})
  }
  const { username, name, password } = userToSave
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  res.json(savedUser)
})


module.exports = usersRouter
