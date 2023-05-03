import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const blogUpdated = useRef(false)

  const sortBlogs = (blogs) => {
    setBlogs(blogs.sort((a,b) => b.likes - a.likes))
    blogUpdated.current = true
  }

  useEffect(() => {
    if(blogs && !blogUpdated.current) {
      blogService.getAll().then(blogs =>
        sortBlogs(blogs)
      )
    }
    blogUpdated.current = false
  }, [blogs])

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
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        console.log(returnedBlog)
        setBlogs(blogs.concat(returnedBlog))
        blogFormRef.current.toggleVisibility()
      })
  }

  const likeBlog = (id, blogObject) => {
    const index = blogs.findIndex(blog => blog.id === id)
    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        let newBlog = [...blogs]
        newBlog[index] = returnedBlog
        setBlogs(newBlog)
      })
  }

  const deleteBlog = (id) => {
    const newBlogs = blogs.filter(blog => blog.id !== id)
    blogService
      .remove(id)
      .then(setBlogs(newBlogs))
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )

  const logout = (event) => {
    event.preventDefault()
    blogService.setToken(null)
    setUser(null)
    localStorage.removeItem('loggedBlogappUser')
  }

  const logoutButton = () => (
    <button onClick={logout}>logout</button>
  )

  return (
    <div>

      <h1>bloglist app</h1>

      <Notification message={errorMessage}/>

      {!user && loginForm()}

      {user &&
        <div>
          <p>{user.name} logged in {logoutButton()}</p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog}></BlogForm>
          </Togglable>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} likeBlogHandler={likeBlog} deleteBlogHandler={deleteBlog}/>
          )}
        </div>
      }

    </div>
  )
}

export default App