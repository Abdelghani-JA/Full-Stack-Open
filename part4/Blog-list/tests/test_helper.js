const Blog = require('../models/blog')

const initialBlogs = [
  {
    title:"How to lose weight ?",
    author:"Daniel kharakov",
    url:"https://www.example.com",
    likes:112,
  },
  {
    title:"Tips to improve your English",
    author:"Meriam louis",
    url:"https://www.example.com",
    likes:100
  },
  {
    title:"Keto diet",
    author:"Jhon vessil",
    url:"https://www.example.com",
    likes:34
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}
