import React from 'react'
import { updateBlog, deleteBlog, addComment } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import gestures from '../images/gestures.png'

const Blog = ({ blog }) => {

	const user = useSelector(state => state.user)

	const dispatch = useDispatch()
	const history = useHistory()


	if (!blog) {
		return null
	}


	const likeBlog = async (event) => {
		event.preventDefault()
		const newBlog = blog
		//newBlog.user = newBlog.user.id
		newBlog.likes++
		dispatch(updateBlog(newBlog))
	}

	const eraseBlog = async (event) => {
		event.preventDefault()
		dispatch(deleteBlog(blog, user))
		history.push('/blogs')

	}


	console.log(blog.user , user )
	const showDelete = { display: blog.user.id === user.id ? '' : 'none' }

	const randomId = () => {
		return (Math.round(Math.random() * 1000))
	}



	const handleSubmit = async (event) => {
		event.preventDefault()
		const comment = event.target.comment.value
		dispatch(addComment(blog.id, comment))
		event.target.comment.value = ''



	}

	console.log('ssssssssssssssssssss' , blog, user)


	return (
		<div>
			<h1>{blog.title} by {blog.author}</h1>
			<div>
				<a href={blog.url}>{blog.url}</a> <br />
				{blog.likes} likes. <img src={gestures} onClick={likeBlog}></img><br />
				added by {user.name}<br />
				<div style={showDelete} >
					<button onClick={eraseBlog}>delete</button>
				</div>
			</div>
			<div>
				<h2>comments</h2>
				<ul>
					{blog.comments.map(comment => <li key={randomId()}>{comment}</li>)}
				</ul>
				<form onSubmit={handleSubmit}>
					<input name='comment' />
					<button>add comment</button>
				</form>

			</div>

		</div>
	)
}



export default Blog
