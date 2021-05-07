const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikesOfMany = blogs => {
  return blogs.map(blog => blog.likes).reduce((total, likes) => total + likes, 0)
}

const mostFavourite = blogs =>
  blogs.reduce((favourite, current) =>
    favourite === null || current.likes > favourite.likes ? current : favourite, null
  )

const mostBlogs = blogs => {
  return _([...blogs])
    .countBy('author')
    .map((amount, name) => ({ author: name, blogs: amount }))
    .sort((a, b) => a.blogs - b.blogs)
    .last()
}

const mostLikes = blogs => {
  const authors = [...new Set(blogs.map(blog => blog.author))]
  const likes = authors.map(author => {
    let authorsBlog = blogs.filter(blog => blog.author === author)
    return {
      author, likes: authorsBlog
        .map(blog => blog.likes)
        .reduce((sum, item) => sum + item, 0)
    }
  })
  return likes.reduce((most, item) => (most.likes > item.likes) ? most : item)
}

module.exports = {
  dummy, totalLikesOfMany, mostFavourite, mostBlogs, mostLikes
}