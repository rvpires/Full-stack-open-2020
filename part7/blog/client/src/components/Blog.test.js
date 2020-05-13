import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render , fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Togglable />', () => {
	let component
	const blog = {
		title: 'Title Example',
		author: 'Author Example',
		url: 'www.example.com',
		likes: 0,
		user: { username: 'admin' }
	}


	const mockDelete = jest.fn()
	const mockUpdate = jest.fn()

	const user = { username: 'admin' }

	beforeEach(() => {

		component = render(
			<Blog blog={blog} deleteBlog={mockDelete} updateBlog={mockUpdate} user={user} />
		)
	})


	test('Title and Author are rendered but details no', () => {


		expect(component.container).toHaveTextContent(
			'Title Example'
		)

		expect(component.container).toHaveTextContent(
			'Author Example'
		)

		const div = component.container.querySelector('.togglableContent')

		expect(div).toHaveStyle('display: none')

	})

	test('Click button shows details' , () => {

		const button = component.getByText('view')
		const div = component.container.querySelector('.togglableContent')


		fireEvent.click(button)


		expect(div).not.toHaveStyle('display: none')

	})

	test('Like button is pressed twice' , () => {

		const button = component.getByText('like')
		fireEvent.click(button)
		fireEvent.click(button)
		expect(mockUpdate.mock.calls).toHaveLength(2)

	})
})


