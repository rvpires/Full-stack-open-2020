import React, { useState } from 'react'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'


const Blog = ({ blog }) => {


	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}


	const [details, setDetails] = useState(false)
	const [buttonText, setButtonText] = useState('view')
	const user = useSelector(state => state.user)

	const dispatch = useDispatch()

	const toggleDetails = () => {
		if (details === true) {
			setDetails(false)
			setButtonText('view')
		}

		else if (details === false) {
			setDetails(true)
			setButtonText('hide')
		}
	}

	const showWhenVisible = { display: details ? '' : 'none' }
	const showDelete = { display: blog.user.username === user.username ? '' : 'none' }
	//const showDelete = {display : ''}
	const likeBlog = async (event) => {
		event.preventDefault()
		const newBlog = blog
		newBlog.likes++
		dispatch(updateBlog(newBlog))
	}

	const eraseBlog = async (event) => {
		event.preventDefault()
		dispatch(deleteBlog(blog, user))

	}


	return (
		<div className='Blog' style={blogStyle}>

			<div>
				{blog.title} {blog.author} <button onClick={toggleDetails}>{buttonText}</button>
			</div>

			<div className='togglableContent' style={showWhenVisible}>
				{blog.url} <br />
				{blog.likes} <button onClick={likeBlog}>like</button><br />
				{blog.author}<br />
				<div style={showDelete} >
					<button onClick={eraseBlog}>delete</button></div>
			</div>
		</div>
	)
}



export default Blog
