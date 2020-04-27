const Blog = require('../models/blog')

const initialBlogs = [
	{
		'title': 'Blog Example 1',
		'author': 'Example Author 1',
		'url': 'www.example1.com',
		'likes': 10
	},
	{
		'title': 'Blog Example 2',
		'author': 'Example Author 2',
		'url': 'www.example2.com',
		'likes': 20
	}
]

const exampleUser =
{
	'username': 'user1',
	'name': 'user1',
	'password': 'user1'
}


const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb, exampleUser }