

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogsList) => blogsList.reduce((sum, blog) => sum + (blog.likes ?? 0), 0)

const favoriteBlog = (blogsList) => {
  let initialBlog = blogsList[0]
  if (initialBlog) {
    blogsList.forEach(blog => {
      if (blog.likes > initialBlog.likes) {
        initialBlog = blog
      } 
    })
    const {__v, _id, url, ...favBlog} = initialBlog
    return favBlog
  } else {
    return null
  }

}

const mostBlogs = (blogsList) => {
  const temp = []
  blogsList.forEach(blogList => {
    if(blogList.author){
      const result = temp.find(blog => blog.author === blogList.author)
      result ? result.blogs++ : temp.push({author:blogList.author, blogs: 1})
    }
  })

  let chosen = temp[0]
  temp.forEach(blogger => {
    if (blogger.blogs > chosen.blogs){
      chosen = blogger
    }
  })
  return chosen ?? null
}

const mostLikes = (blogsList) => {
  const temp = []
  blogsList.forEach(blogList => {
    if(blogList.author && blogList.likes){
      const result = temp.find(blog => blog.author === blogList.author)
      result ? result.likes += blogList.likes : temp.push({author:blogList.author, likes: blogList.likes})
    }
  })

  let chosen = temp[0]
  temp.forEach(blogger => {
    if (blogger.likes > chosen.likes){
      chosen = blogger
    }
  })
  return chosen ?? null
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

