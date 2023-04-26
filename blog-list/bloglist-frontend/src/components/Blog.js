import { useState } from "react"

const Blog = ({ blog, likeBlogHandler, deleteBlogHandler }) => {
  const [visible, setVisible] = useState(false)
  const [newLikes, setNewLikes] = useState(blog.likes)
  
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
    <button onClick={likeBlog}>like</button>
  )

  const likeBlog = (event) => {
    event.preventDefault()
    setNewLikes(newLikes + 1)

    likeBlogHandler(blog.id, 
      {
        user: blog.user.id,
        title: blog.title,
        author: blog.author,
        likes: newLikes + 1,
        url: blog.url
      })
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    deleteBlogHandler(blog.id)
  }
  
  return (
    <div style={blogStyle}>

      <h1>
        {blog.title} {blog.author}
      </h1>

      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>details</button>
      </div>

      <div style={showWhenVisible}>
        <p>likes: {newLikes} {likeButton()}</p>
        <p>{blog.url}</p>
        <p>posted by {blog.user.name}</p>
        <button onClick={toggleVisibility}>hide details</button>
        <button onClick={deleteBlog}>delete blog</button>
      </div>
      
    </div>
)}

export default Blog