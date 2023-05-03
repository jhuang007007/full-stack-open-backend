import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create new blog</h2>
      <p>Title:
        <input
          id='title'
          value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
        />
      </p>
      <p>Author:
        <input
          id='author'
          value={newAuthor}
          onChange={event => setNewAuthor(event.target.value)}
        />
      </p>
      <p>Url:
        <input
          id='url'
          value={newUrl}
          onChange={event => setNewUrl(event.target.value)}
        />
      </p>
      <button type="submit">post</button>
    </form>
  )
}

export default BlogForm