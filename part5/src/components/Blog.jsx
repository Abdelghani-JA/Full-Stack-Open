import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, getBlogs }) => {
  const [currentBlog, setCurrentBlog] = useState(blog)
  const [details, setDetails] = useState(false)
  const blogStyle = {
    border:'solid 2px black',
    margin:'5px',
    padding:'5px'
  }

  const handleLikes = async () => {
    try {
      const likedBlog = { ...currentBlog, user: currentBlog.user[0].id, likes: currentBlog.likes + 1 }
      const updatedBlog = await blogService.update(likedBlog, currentBlog.id)
      setCurrentBlog({ ...updatedBlog, user: currentBlog.user })
    } catch (error) {
      alert(error.message)
    }
  }

  const handleDelete = async () => {
    const confirm  = window.confirm(`Remove currentBlog: ${currentBlog.title} ?`)
    if (confirm) {
      try {
        await blogService.remove(currentBlog.id)
        getBlogs()
      } catch (error) {
        alert(error.message)
      }
    }
  }
  return (
    <div style={blogStyle} className='blogGlance'>
      {currentBlog.title}, {currentBlog.author} <button id='view' onClick={() => setDetails(!details)}> {details ? 'hide' : 'view'} </button>
      <div style={{ display: details ? '': 'none' }} className='blogDetails'>
        <p>source : {currentBlog.url}</p>
        <p>likes : {currentBlog.likes} <button onClick={handleLikes} className='likeButton' id='like'>like</button></p>
        <p>Created By: {currentBlog.user[0].name}</p>
        {currentBlog.user[0].username === user.username ? <button onClick={handleDelete} id='delete'>delete</button> : null}
      </div>
    </div>
  )
}

export default Blog