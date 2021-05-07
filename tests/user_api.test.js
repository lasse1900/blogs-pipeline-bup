const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', name:'head', password: 'secret' })
    await user.save()
  })

  test('creation fails as status 400 - only one root', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      'username': 'root',
      'name': 'Tommi Peranto',
      'password': 'pallo'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })


  test('creation fails at status 400 if password < 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      'username': 'Olli',
      'name': 'Olli',
      'password': 'am'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'lasse',
      name: 'Lasse Mantere',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

})

afterAll(() => {
  mongoose.connection.close()
})