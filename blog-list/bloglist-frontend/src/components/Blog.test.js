import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'this is a test blog title',
    author: 'and this is a test blog author',
    url: 'url.com',
    user: {
      username:'testusername',
      name: 'test'
    }
  }

  const user = {
    username:'testusername',
    name: 'test'
  }
  const mockHandler = jest.fn()

  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog} user={user} likeBlogHandler={mockHandler}/>
    ).container
  })

  test('renders blog', () => {
    const element = container.querySelector('.blog')
    expect(element).toBeDefined()
  })

  test('does not render URL or number of likes by default', () => {
    const element = container.querySelector('.details')
    expect(element).toHaveStyle('display: none')
  })

  test('after clicking the details button, likes and url are shown', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('details')
    await user.click(button)

    const div = container.querySelector('.details')
    expect(div).not.toHaveStyle('display: none')
  })

  test('after clicking like button twice, the event handler the component received as props is called twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

