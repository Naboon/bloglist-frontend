import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'
import App from '../App'

test('renders only title and author by default', () => {
  const blog = {
    title: 'Test Engineering',
    author: 'Gerhard Berger',
    url: 'http://greatblogs.com/gberger/testing',
    likes: 234,
    user: {
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }

  const user = {
    username: 'mluukkai',
    name: 'Matti Luukkainen'
  }

  const { container } = render(<Blog blog={blog} user={user} handleAddLike={() => App.handleAddLike} handleRemoveBlog={() => App.handleRemoveBlog} />)

  const lessInfo = container.querySelector('.lessInfo')
  const moreInfo = container.querySelector('.moreInfo')

  expect(lessInfo).toBeVisible()
  expect(moreInfo).not.toBeVisible()
})