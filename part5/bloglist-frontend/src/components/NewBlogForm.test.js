import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

const handleCreateBlog = jest.fn()
let component = null

beforeAll(() => {
  component = render( <NewBlogForm handleCreateBlog={handleCreateBlog} /> )
})

describe('<NewBlogForm />', () => {

  test('calls the supplied event handler with the right new blog information when the form is submitted', () => {
    const form = component.container.querySelector('.newBlogForm')
    const title = component.container.querySelector('[name="newBlogTitle"]')
    const author = component.container.querySelector('[name="newBlogAuthor"]')
    const url = component.container.querySelector('[name="newBlogUrl"]')
    fireEvent.change(title, {
      target: { value: 'test title' }
    })
    fireEvent.change(author, {
      target: { value: 'dummy author' }
    })
    fireEvent.change(url, {
      target: { value: 'dummyurl.to/somewhere' }
    })
    fireEvent.submit(form)

    expect(handleCreateBlog.mock.calls).toHaveLength(1)
    expect(handleCreateBlog.mock.calls[0][0]).toEqual({ title: 'test title', author: 'dummy author', url: 'dummyurl.to/somewhere' })

  })

})