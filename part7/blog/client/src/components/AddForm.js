import React from 'react'
import { addBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from './Togglable'
const AddForm = () => {

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

		<Togglable buttonLabel={'add new blog'} ref={addFormRef}>
			<form onSubmit={createBlog}>
				<div>
					title:
					<input name="title" />
				</div>
				<div>
					author:
					<input
						name="author"
					/>
				</div>
				<div>
					url:
					<input
						name="url"
					/>
				</div>
				<button id="submitBlog" type="submit">create</button>

			</form>
		</Togglable>
	)
}


export default AddForm