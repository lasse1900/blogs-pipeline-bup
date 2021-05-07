import React from 'react'
import blogService from '../services/blogs'
import Togglable from '../components/Togglable'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const BlogForm = ({ setBlogs, notify }) => {
  const author = useField('text')
  const title = useField('text')
  const url = useField('text')

  const addBlog = async event => {
    event.preventDefault()

    try {
      const response = await blogService.create({
        newObject: {
          title: title.value,
          author: author.value,
          url: url.value
        }
      })
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
      title.reset()
      author.reset()
      url.reset()
      notify(`a new blog ${response.title} successfully added`, true)
    } catch (exception) {
      notify(`${exception}`, false)
    }
  }

  const omitReset = (hook) => {
    let { ...hookWithoutReset } = hook
    return hookWithoutReset
  }

  return (
    <Togglable buttonLabel='add'>
      <div>
        <form onSubmit={event => addBlog(event)}>
          <div>
            author:
            <input {...omitReset(author)} />
          </div>
          <div>
            title:
            <input {...omitReset(title)} />
          </div>
          <div>
            url:
            <input {...omitReset(url)} />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </Togglable>
  )
}
BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
}

export default BlogForm