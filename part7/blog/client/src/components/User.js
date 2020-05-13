import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'



const User = () => {

	const user = useSelector(state => state.user)
	const blogs = useSelector(state => state.blogs)
	const id = useParams().id
	const userBlogs = blogs.filter(blog => blog.user.id === id)

	console.log(blogs)


	if(!user)
	{
		return null
	}


	return (
		<div>
			<h1>{user.name}</h1>
			<h2>added blogs</h2>
			<ul>
				{userBlogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
			</ul>
		</div>
	)



}

export default User