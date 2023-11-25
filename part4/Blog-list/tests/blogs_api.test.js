const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

const getToken = async () => {
  const user = {
    username: "adel",
    password: process.env.TEST_USER_PWD
  }
  const result = await api
    .post('/api/login')
    .send(user)
    .expect(200)
  return {token: result.body.token, user}
}

beforeEach( async () => {
  await Blog.deleteMany({})
  const dbUsers = await User.find({})
  for (let i = 0 ; i < 3 ; i++) {
    const blog = new Blog({...helper.initialBlogs[i], user:[dbUsers[i]._id]})
    const blogResult =  await blog.save()
    await User.findByIdAndUpdate(dbUsers[i]._id, { blogs:[blogResult._id]})
  }
}, 100000)

test('all blogs are returned, and as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .then(response => {
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
}, 100000)

test('identifier property of the blog posts is named id', async () => {
  const blogs = (await api.get('/api/blogs')).body
  blogs.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
}, 100000)

test('making an HTTP POST request successfully creates a new blog post', async () => {
  const tokenData =  await getToken()
  const token = tokenData.token
  const newBlog = {
    title:"must know Jest matchers",
    author:"Abdelghani ja",
    url:"https://www.example.com",
    likes:89
  }
  //if the token is taken successfully we put it in Auth header with the new blog
  await api
    .post('/api/blogs')
    .auth(token, { type: 'bearer' })
    .send(newBlog)
    .expect(201)

  const blogsLatest = (await helper.blogsInDb()).map(blog => {delete blog.id; return blog})
  expect(blogsLatest).toHaveLength(helper.initialBlogs.length + 1)
  //finding the id of the blog creator, and verify if it inserted correctly in the blog document
  userId = (await User.find({})).find(userDb => userDb.username === tokenData.user.username )._id
  expect(blogsLatest).toContainEqual({...newBlog, user: [userId]})

}, 100000)

test('likes property is missing from the request, it will default to the value 0', async () => {
  const tokenData =  await getToken()
  const token = tokenData.token
  const newBlog = {
    title:"A blog that lacks likes property",
    author:"Abdelghani ja",
    url:"https://www.example.com",
  }
  await api
  .post('/api/blogs')
  .auth(token, { type: 'bearer' })
  .send(newBlog)
  .expect(201)

  const blogsLatest = await helper.blogsInDb()
  const savedBlog = blogsLatest.find(blog => blog.title === newBlog.title)
  expect(savedBlog.likes).toBe(0)

}, 100000)

test('title and url property are missing from the request', async () => {
  const tokenData =  await getToken()
  const token = tokenData.token
  const newBlog = {
    author:"Abdelghani ja",
    likes:88
  }
  await api
    .post('/api/blogs')
    .auth(token, { type: 'bearer' })
    .send(newBlog)
    .expect(400)
    .then(res => {
      const errorMsg = res.body.error.startsWith('Blog validation failed')
      expect(errorMsg).toBe(true)
    })

}, 100000)

test('deleting a single blog post resource, if its (id and owner) are valid', async () => {
  const tokenData =  await getToken()
  const token = tokenData.token
  const firstBlog = (await helper.blogsInDb())[1] // this blog belongs to the user with username 'adel'

  await api
  .delete(`/api/blogs/${firstBlog.id}`) //token is not provided
  .expect(401)

  await api
  .delete(`/api/blogs/${firstBlog.id}`)
  .auth(token, { type: 'bearer' })
  .expect(204)

  const updatedBlogs = (await helper.blogsInDb()).map(blog => blog.id)
  expect(updatedBlogs).toHaveLength(helper.initialBlogs.length - 1)
  expect(updatedBlogs).not.toContain(firstBlog.id)

  await api
  .delete(`/api/blogs/${firstBlog.id}`) //giving the same id of previously deleted blog
  .auth(token, { type: 'bearer' })
  .expect(400)
}, 100000)

test('update the number of likes for a blog post', async () => {
  const tokenData =  await getToken()
  const token = tokenData.token
  const firstBlog = (await helper.blogsInDb())[1] // this blog belongs to the user with username 'adel'
  firstBlog.likes++

  await api
  .put(`/api/blogs/${firstBlog.id}`)
  .auth(token, { type: 'bearer' })
  .send(firstBlog)
  .expect(204)

  const updatedFirstBlog = (await helper.blogsInDb())[1]
  expect(updatedFirstBlog).toEqual(firstBlog)
}, 100000)

test('adding a blog fails with the proper status code 401 Unauthorized if a token is not provided', async () => {
  const firstBlog = (await helper.blogsInDb())[1] // this blog belongs to the user with username 'adel'
  await api
  .delete(`/api/blogs/${firstBlog.id}`) 
  .expect(401)
  //the blog is still in DB , nothing changed
  const updatedBlogs = (await helper.blogsInDb()).map(blog => blog.id)
  expect(updatedBlogs).toHaveLength(helper.initialBlogs.length)
  expect(updatedBlogs).toContain(firstBlog.id)

}, 100000)

afterAll(async () => {
  await mongoose.connection.close()
}, 100000)
