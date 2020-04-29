import React, { useState } from 'react'
import PropTypes from 'prop-types'



const Blog = ({ blog, updateBlog, deleteBlog, user }) => {


	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}


	const [details, setDetails] = useState(false)
	const [buttonText, setButtonText] = useState('view')


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


	const likeBlog = async (event) => {
		event.preventDefault()
		const newBlog = blog
		newBlog.likes++
		updateBlog(newBlog)

	}

	const eraseBlog = async (event) => {
		event.preventDefault()
		deleteBlog(blog)

	}

	return (

		<div style={blogStyle}>

			<div>
				{blog.title} {blog.author} <button onClick={toggleDetails}>{buttonText}</button>
			</div>

			<div style={showWhenVisible}>
				{blog.url} <br />
				{blog.likes} <button onClick={likeBlog}>like</button><br />
				{blog.author}<br />
				<div style={showDelete} >
					<button onClick={eraseBlog}>delete</button></div>
			</div>
		</div>
	)
}

Blog.propTypes = {

	blog: PropTypes.object.isRequired,
	updateBlog: PropTypes.func.isRequired,
	deleteBlog: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
}

export default Blog
