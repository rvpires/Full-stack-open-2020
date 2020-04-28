import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStyle, setNotificationSyle] = useState('error')


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


  const sendNotification = (text, style) =>
  {
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

      sendNotification('Credentials are wrong' , 'error')
    }


  }

  const createNewBlog = async (event) => {
    
    event.preventDefault()

    try
    {
      const newBlog = 
      {
        'title' : title,
        'author' : author,
        'url' : url
      }

      const result = await blogService.create(newBlog)
      setTitle('')
      setAuthor('')
      setUrl('')

      setBlogs(blogs.concat(result)) 
      sendNotification(`New blog ${newBlog.title} by ${newBlog.author} was created successfuly.` , 'success')

    }
    catch(exception)
    {
      sendNotification('Could not add blog.' , 'error')
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
        <Notification message={notificationMessage} style={notificationStyle}/>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in <button onClick={logOut}>logout</button></p>

      <h2>create new</h2>
      <Notification message={notificationMessage} style={notificationStyle}/>

      <form onSubmit={createNewBlog}>
        <div>
          title:
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>


      </form>

      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}

    </div>
  )
}

export default App