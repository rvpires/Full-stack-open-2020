import React from 'react'
import { updateBlog, deleteBlog , addComment } from '../reducers/blogReducer'
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

	const showDelete = { display: blog.user.username === user.username ? '' : 'none' }

	const randomId = () =>
	{
		return(Math.round(Math.random()*1000))
	}

	const handleSubmit = async (event) =>
	{
		event.preventDefault()
		const comment = event.target.comment.value
		dispatch(addComment(blog.id , comment))
		event.target.comment.value = ''



	}

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
			<div>
				<h2>comments</h2>
				<ul>
					{blog.comments.map(comment => <li key={randomId()}>{comment}</li>)}
				</ul>
				<form onSubmit={handleSubmit}>
					<input name='comment'/>
					<button>add comment</button>
				</form>

			</div>

		</div>
	)
}



export default Blog
