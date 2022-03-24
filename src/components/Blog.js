import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [showInfo, setShowInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showLess = { display: showInfo ? 'none' : '' }
  const showMore = { display: showInfo ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div style={showLess}>
        {blog.title} {blog.author}
        <button onClick={() => setShowInfo(true)}>view</button>
      </div>
      <div style={showMore}>
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setShowInfo(false)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog