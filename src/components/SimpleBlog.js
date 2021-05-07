import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className='MyBlog'>
      {blog.title} {blog.author}
    </div>
    <div className="Likes">
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog