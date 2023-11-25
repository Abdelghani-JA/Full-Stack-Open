const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { info, error } = require('./utils/logger')
const { unknownEndpoint, errorHandler } = require('./utils/middleware')
const config = require('./utils/config')
const mongoose = require('mongoose')
const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)
  .then(() => info("Connected to MongoDB"))
  .catch(() => error("Connection to MongoDB failed !"))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(unknownEndpoint)
app.use(errorHandler)


module.exports = app