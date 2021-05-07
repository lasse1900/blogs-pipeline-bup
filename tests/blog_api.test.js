const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

describe('blogs are returned', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('test valid id exists', () => {
  test('test that id is defined', async () => {
    const response = await api
      .get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('try to add a blog without likes count', () => {
  test('blog without likes count', async () => {

  })

  describe('use PUT to edit likes of a blog ', () => {
    test('amount of likes is updated', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updateBlog = {
        likes: blogToUpdate.likes + 1
      }

      await api.put(`/api/blogs/${blogToUpdate.id}`).send(updateBlog)
      const updatedBlog = await Blog.findById(blogToUpdate.id)
      expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})