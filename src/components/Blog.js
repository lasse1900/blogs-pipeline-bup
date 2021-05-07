import React, { useState } from 'react'
import blogService from '../services/blogs'
import '../index.css'

const Blog = ({ blog, removeBlog, user }) => {
  const [hidden, setVisible] = useState(false)

  const blogOwner = blog.author === user.username
  const buttonShow = { display: blogOwner ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!hidden)
  }

  if (!hidden) {
    return (<div className='blogStyle' onClick={toggleVisibility}>
      {blog.title} {blog.author}
    </div>)
  }

  const like = async () => {
    blog.likes += 1
    try {
      blogService.update(blog.id, blog)
    } catch (error) {
      console.log('error', error)
    }
  }

  const remove = async () => {
    if (window.confirm(`remove blog ${blog.title}? by ${blog.author}`)) {
      try {
        removeBlog(blog)
        await blogService.remove(blog.id)
      } catch (error) {
        console.log('error', error)
      }
    }
  }


  return (
    <div className='blogStyle'>
      <div className='toggle' onClick={toggleVisibility}>
        {blog.title}
        <br />
        <a href={blog.url}>{blog.url}</a>
        <br />{blog.likes} - likes <button onClick={like}>like</button>
        <br /> added by: {blog.author}
        <br /> <button style={buttonShow} onClick={remove}>remove</button>
      </div>
    </div>
  )
}

export default Blog