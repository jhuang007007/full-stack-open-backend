import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<Blogform />', () => {
  const mockHandler = jest.fn()

  let container

  beforeEach(() => {
    container = render(
      <BlogForm createBlog={mockHandler} />
    ).container
  })

  test('when new blog is created, event handler is called', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('post')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})