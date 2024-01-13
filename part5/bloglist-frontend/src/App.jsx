import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [credentials, setCredentials] = useState({ username:'', password:'' })
  const [notificationBar, setNotificationBar] = useState({ message:'', status:'' })
  const togglableRef = useRef()

  const getBlogs = () => {
    blogService.getAll()
      .then(tosortBlogs => {
        tosortBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
        setBlogs(tosortBlogs)
      })
  }
  useEffect(() => {
    const token = window.localStorage.getItem('loggedBlogsUser')
    if(token){
      const user = JSON.parse(token)
      getBlogs()
      setUser(user)
      blogService.setToken(user.token)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const hideNotification = () => {
    setTimeout(() => {
      setNotificationBar({ message:'', status:'' })
    }, 2500)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setCredentials({ username:'', password:'' })
      getBlogs()
      setNotificationBar({ message:'logged in', status:'success' })
      hideNotification()
    } catch(error) {
      setCredentials({ username:'', password:'' })
      setNotificationBar({ message:error.response.data.error, status:'error' })
      hideNotification()
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsUser')
    blogService.setToken(null)
    setUser(null)
    setBlogs([])
    setNotificationBar({ message:'logged out', status:'success' })
    hideNotification()
  }

  const createBlog = async (newBlog) => {
    togglableRef.current.handleVisibility()
    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat([ { ...savedBlog, user: [{ name:user.name, username: user.username }] }]))
      setNotificationBar({ message:'blog added successfully', status:'success' })
      hideNotification()
    } catch(error){
      setNotificationBar({ message:error.response.data.error, status:'error' })
      hideNotification()
    }
  }

  const blogsForm = () => {
    return (
      <div style={{ width:'500px' }}>
        <h2>Blogs</h2>
        <p>{user ? user.name + ' logged in' : ''} <input value='Logout' type="button" onClick={handleLogout} id='logout' /></p>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} user={user} getBlogs={getBlogs}/>)}
        <Togglable buttonLabel="New blog" ref={togglableRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
      </div>
    )
  }

  return (
    <>
      <Notification notificationBar={notificationBar} />
      {
        !user
          ? <LoginForm handleLogin={handleLogin} handleCredentials={{ credentials, setCredentials }} />
          : blogsForm()
      }
    </>
  )
}

export default App