import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleAddLike, handleRemoveBlog }) => {
  const [showInfo, setShowInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideContent = { display: showInfo ? 'none' : '' }
  const showContent = { display: showInfo ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div style={hideContent}>
        {blog.title} {blog.author}
        <button onClick={() => setShowInfo(true)}>view</button>
      </div>
      <div style={showContent}>
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setShowInfo(false)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={handleAddLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {user.username === blog.user.username &&
          <button onClick={handleRemoveBlog}>remove</button>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleAddLike: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired
}

export default Blog