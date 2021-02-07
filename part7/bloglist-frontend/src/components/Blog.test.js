import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let component = null
const blog = {
  title: 'Test blog',
  author: 'Test blog author',
  url: 'Test url',
  likes: 0
}

const handleAddLike = jest.fn()

beforeEach(() => {
  component = render(<Blog blog={blog} handleAddLike={handleAddLike} />)
})

describe('<Blog />', () => {

  test('renders blog title and author when the component is shrinked', () => {
    expect(component.container).toHaveTextContent(
      'Test blog'
    )
    expect(component.container).toHaveTextContent(
      'Test blog author'
    )
  })

  test('does not render url or likes when the component is shrinked', () => {
    expect(component.container).not.toHaveTextContent(
      'Test url'
    )
    expect(component.container).not.toHaveTextContent(
      'Likes'
    )
  })

  test('renders all fields when it is expanded by clicking the \'view\' button', () => {
    const btn = component.container.querySelector('.viewBlogButton')
    fireEvent.click(btn)
    expect(component.container).toHaveTextContent('Test blog')
    expect(component.container).toHaveTextContent('Test blog author')
    expect(component.container).toHaveTextContent('Test url')
    expect(component.container).toHaveTextContent('Likes: 0')
  })

  test('when \'like\' button is clicked twice, the event handler passed to the button is also called twice', () => {
    const viewBtn = component.container.querySelector('.viewBlogButton')
    fireEvent.click(viewBtn)
    const likeBtn = component.container.querySelector('.likeButton')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)
    expect(handleAddLike.mock.calls).toHaveLength(2)
  })

})