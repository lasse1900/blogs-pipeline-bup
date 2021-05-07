const blogs = [
  {
    _id: '5ce966f2788bae43aa8612a8',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 0,
    __v: 0,
    user: {
      id: '5ce67f8f16a32a300ce68d15',
      username: 'owner',
      name: 'owner'
    }
  },
  {
    _id: '5ce966f3788bae43aa8612aa',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 0,
    __v: 0,
    user: {
      id: '5ce663984a93f01ea59fb796',
      username: 'lasse',
      name: 'Lasse Mantere'
    }
  }
]

// const setToken = newToken => {
//   // token = `bearer ${newToken}`
// }

const getAll = () => {
  console.log('**** Mock-blogs *****')
  return Promise.resolve(blogs)
}

export default { getAll }