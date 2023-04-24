import { useState } from "react"

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeButton = () => (
    <button>like</button>
  )
  
  return (
    <div style={blogStyle}>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>details</button>
      </div>
      <div style={showWhenVisible}>
        <p>likes: {blog.likes} {likeButton()}</p>
        <p>{blog.url}</p>
        <p>posted by {blog.user.username}{!blog.user.username && user.name}</p>
        <button onClick={toggleVisibility}>hide details</button>
      </div>
    </div>
)}

export default Blog