import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import App from '../App'

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

test('renders only title and author by default', () => {
  const { container } = render(<Blog blog={blog} user={user} handleAddLike={() =>
    App.handleAddLike} handleRemoveBlog={() => App.handleRemoveBlog} />)

  const lessInfo = container.querySelector('.lessInfo')
  const moreInfo = container.querySelector('.moreInfo')

  expect(lessInfo).toBeVisible()
  expect(moreInfo).not.toBeVisible()
})

test('renders all info after "show" button has been pressed', () => {
  const { container } = render(<Blog blog={blog} user={user} handleAddLike={() =>
    App.handleAddLike} handleRemoveBlog={() => App.handleRemoveBlog} />)

  const button = screen.getByText('view')
  userEvent.click(button)

  const lessInfo = container.querySelector('.lessInfo')
  const moreInfo = container.querySelector('.moreInfo')

  expect(lessInfo).not.toBeVisible()
  expect(moreInfo).toBeVisible()
})