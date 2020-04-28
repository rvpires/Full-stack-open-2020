import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import AddForm from './components/AddForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStyle, setNotificationSyle] = useState('error')

  const addFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])


  const sendNotification = (text, style) => {
    setNotificationSyle(style)
    setNotificationMessage(text)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)

  }

  const handleLogin = async (event) => {

    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

    }
    catch (exception) {

      sendNotification('Credentials are wrong', 'error')
    }


  }

  const createBlog = async (blog) => {

    try {     
      addFormRef.current.toggleVisibility()
      const result = await blogService.create(blog)
      setBlogs(blogs.concat(result))
      sendNotification(`New blog ${blog.title} by ${blog.author} was created successfuly.`, 'success')

    }
    catch (exception) {
      sendNotification('Could not add blog.', 'error')
    }

  }

  const logOut = () => {

    window.localStorage.removeItem('loggedUser')
    setUser(null)


  }




  if (user === null) {
    return (
      <div>
        <h1>login into application</h1>
        <Notification message={notificationMessage} style={notificationStyle} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsername={({ target }) => setUsername(target.value)}
          handlePassword={({ target }) => setPassword(target.value)}
        />
      </div>
    )
  }

  return (
    <div>
      
      <h2>blogs</h2>

      <p>{user.username} logged in <button onClick={logOut}>logout</button></p>
      <h2>create new</h2>
      <Notification message={notificationMessage} style={notificationStyle} />

      <Togglable buttonLabel={'add new blog'} ref={addFormRef}>
        <div>
          <AddForm createBlog={createBlog}
          />
        </div>
      </Togglable>

      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}

    </div>
  )
}

export default App