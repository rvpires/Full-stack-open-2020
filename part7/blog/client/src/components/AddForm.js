import React from 'react'
import { addBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from './Togglable'

const AddForm = () => {

	const noBorders =
	{
		border : 'none'
	}

	const bottomBorder =
	{
		borderTop : 'none',
		borderRight : 'none',
		borderLeft : 'none',
		borderColor : 'black',
		borderWidth : '1px'

	}


	const dispatch = useDispatch()
	const addFormRef = React.createRef()
	const user = useSelector(state => state.user)

	const createBlog = async (event) => {
		event.preventDefault()
		addFormRef.current.toggleVisibility()

		const newBlog = {
			'title': event.target.title.value,
			'author': event.target.author.value,
			'url': event.target.url.value
		}

		dispatch(addBlog(newBlog, user))
		event.target.title.value = ''
		event.target.author.value = ''
		event.target.url.value = ''
	}


	return (
		<div>

			<Togglable buttonLabel={'add new blog'} ref={addFormRef}>
				<form onSubmit={createBlog}>
					<div>
						<input style={bottomBorder} name="title" placeholder="title"/>
					</div>
					<div>
						<input style={bottomBorder} name="author" placeholder="author" />
					</div>
					<div>
						<input style={bottomBorder} name="url" placeholder="url"/>
					</div>
					<button id="submitBlog" type="submit" style={noBorders}>create</button>

				</form>
			</Togglable>

		</div>

	)
}


export default AddForm