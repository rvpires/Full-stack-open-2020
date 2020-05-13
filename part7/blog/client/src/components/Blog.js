import React from 'react'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'


const Blog = ({ blog }) => {

	const user = useSelector(state => state.user)

	const dispatch = useDispatch()

	if(!blog)
	{
		return null
	}


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

	console.log(blog.user , user)
	const showDelete = { display: blog.user.username === user.username ? '' : 'none' }

	return(
		<div>
			<h1>{blog.title} by {blog.author}</h1>
			<div>
				<a href={blog.url}>{blog.url}</a> <br />
				{blog.likes} <button onClick={likeBlog}>like</button><br />
				added by {blog.user.name}<br />
				<div style={showDelete} >
					<button onClick={eraseBlog}>delete</button></div>
			</div>

		</div>
	)


	/*eturn (
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
	)*/
}



export default Blog
