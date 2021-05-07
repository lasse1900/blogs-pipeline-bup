import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const username = useField('username')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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

  const notify = (message, error) => {
    setNotification({ message, error })
    setTimeout(() => { setNotification({}) }, 4000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    const credentials = {
      username: username.value,
      password: password.value
    }

    try {
      // console.log('credentials', credentials)
      const user = await loginService.login(
        credentials
      )
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setUser(user)
      blogService.setToken(user.token)
      notify(`${username.value} logged in`, true)
      username.reset('')
      password.reset('')
    } catch (exception) {
      console.log('käyttäjätunnus tai salasana virheellinen')
    }
  }

  const omitReset = (hook) => {
    let {  ...hookWithoutReset } = hook
    // console.log('hookWitoutReset', JSON.stringify(hookWithoutReset))
    return hookWithoutReset
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const removeBlog = (removedBlog) => {
    const newBlogs = blogs.filter(blog => blog.id !== removedBlog.id)
    setBlogs(newBlogs)
  }

  if (user) {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification notification={notification} />
        <p>{`Logged in as ${user.name}`}</p>
        <br></br>
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          notify={notify}
        />
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <Blog key={blog.id} blog={blog} user={user} removeBlog={removeBlog} />
          ))}
        <br></br>
        <button onClick={() => handleLogout()}>logout</button>
      </div>
    )
  }

  return (
    <LoginForm className='loginform'
      username={omitReset(username)}
      password={omitReset(password)}

      handleSubmit={handleLogin}
    />
  )
}

export default App