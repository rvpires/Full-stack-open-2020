import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const BlogList = () => {

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'none',
		marginBottom: 5,

	}
	
	const linkStyle =
	{
		color : 'black',
		fontSize : '20px',
		fontWeight : 'bold'
	}
	const blogs = useSelector(state => state.blogs)

	return (
		<div>
			{blogs.map(blog => {

				let link = `/blogs/${blog.id}`

				return (
					<div key={blog.id} style={blogStyle}>
						<Link style={linkStyle} to={link}> {blog.title} by {blog.author}</Link>
					</div>


				)
			})}
		</div>
	)

}

export default BlogList