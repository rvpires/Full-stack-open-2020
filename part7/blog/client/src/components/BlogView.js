import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogView = () => {

	const id = useParams().id

	const blogs = useSelector(state => state.blogs)
	const blog = blogs.find(blog => blog.id === id)


	return (
		<Blog blog={blog} />
	)


}

export default BlogView