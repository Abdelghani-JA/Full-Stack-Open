import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title:'',author:'',url:'' })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
      .then(() => {
        setNewBlog({ title:'',author:'',url:'' })
      })
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create a new blog :</h2>
      <p>title: <input value={newBlog.title} onChange={({ target }) => setNewBlog({ ...newBlog, title:target.value })} /></p>
      <p>author: <input value={newBlog.author} onChange={({ target }) => setNewBlog({ ...newBlog, author:target.value })} /></p>
      <p>url: <input value={newBlog.url} onChange={({ target }) => setNewBlog({ ...newBlog, url:target.value })} /></p>
      <button type='submit' className='testAdd'>Add</button>
    </form>
  )
}


export default BlogForm