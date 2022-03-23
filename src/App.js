import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('') 
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`successfully logged in as ${user.name}`)
      setMessageType('notification')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    } catch (exception) {
      setMessage('wrong username or password')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    setMessage(`logged out`)
      setMessageType('notification')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      await blogService.create(newBlog)
      setBlogs(blogs.concat(newBlog))
      setMessage(`an new blog ${newTitle} by ${newAuthor} added`)
      setMessageType('notification')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (exception) {
      setMessage('invalid blog information, title and author are required')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }
    
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} type={messageType} />

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
      <Notification message={message} type={messageType} />

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      
      <h2>create new</h2>
      
      <form onSubmit={handleNewBlog}>
        <div>
          title:
            <input
              type="text"
              value={newTitle}
              name="Title"
              onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
              type="text"
              value={newAuthor}
              name="Author"
              onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
              type="text"
              value={newUrl}
              name="Url"
              onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App