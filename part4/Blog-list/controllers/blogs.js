const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {blogs:0})
  response.json(blogs)
})

blogsRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  if(!body.likes){
    body.likes = 0
  }
  const blog = new Blog({...request.body, user: user._id})
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)

})


blogsRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {
  const blogId = request.params.id
  const user = request.user
  const blog = await Blog.findById(blogId)
  if ( blog ) {
    if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndDelete(blogId)
      for (let i = 0; i < user.blogs.length ; i++) {
        if (user.blogs[i].toString() === blogId){
          user.blogs.splice(i, 1)
          break
        }
      }
      await user.save()
      response.status(204).end()
    } else {
      response.status(403).end() 
    }
  } else {
    response.status(400).end()
  }
})

blogsRouter.put('/:id', tokenExtractor, userExtractor, async (request, response) => {
  const blogId = request.params.id
  const reqBlog = request.body
  const blog = await Blog.findById(blogId)
  const user = request.user
  
  if ( blog ) {
    if (blog.user.toString() === user._id.toString()) {
      const updatedBlog = await Blog.findByIdAndUpdate(blogId, reqBlog, { new: true, context: 'query' })
      response.status(204).json(updatedBlog)
    } else {
      response.status(403).end() 
    }
  } else {
    response.status(400).end()
  }
})



module.exports = blogsRouter