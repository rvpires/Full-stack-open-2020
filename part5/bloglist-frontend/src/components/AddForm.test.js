import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddForm from './AddForm'



describe('<AddForm />', () => {

	let component
	const mockSubmitForm = jest.fn()

	beforeEach(() => {

		component = render(<AddForm createBlog={mockSubmitForm} />)
	})


	test('Title and Author are rendered but details no', () => {

		const titleInput = component.container.querySelector('#title')
		const authorInput = component.container.querySelector('#author')
		const urlInput = component.container.querySelector('#url')

		const form = component.container.querySelector('form')

		fireEvent.change(titleInput, {
			target: { value: 'Test Title Input' }
		})

		fireEvent.change(authorInput, {
			target: { value: 'Test Author Input' }
		})

		fireEvent.change(urlInput, {
			target: { value: 'Test Url Input' }
		})

		fireEvent.submit(form)

		expect(mockSubmitForm.mock.calls).toHaveLength(1)
		expect(mockSubmitForm.mock.calls[0][0].title).toBe('Test Title Input' )
		expect(mockSubmitForm.mock.calls[0][0].author).toBe('Test Author Input' )
		expect(mockSubmitForm.mock.calls[0][0].url).toBe('Test Url Input' )








	})

})