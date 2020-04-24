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

const initialUsers = [
	{
		'username' : 'user1',
		'name' : 'username2',
		'password' : '123456789'
	},
	{
		'username' : 'user2',
		'name' : 'username2',
		'password' : '987654321'
	}
]

const blogsInDb = async () => {
	const notes = await Blog.find({})
	return notes.map(note => note.toJSON())
}

module.exports = {initialBlogs, blogsInDb , initialUsers}