import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const BlogList = () => {

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const blogs = useSelector(state => state.blogs)

	return (
		<div>
			{blogs.map(blog => {

				let link = `/blogs/${blog.id}`

				return (
					<div key={blog.id} style={blogStyle}>
						<Link to={link}> {blog.title} by {blog.author}</Link>
					</div>


				)
			})}
		</div>
	)

}

export default BlogList