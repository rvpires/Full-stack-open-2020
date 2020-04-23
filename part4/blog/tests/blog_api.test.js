const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')



beforeEach(async () => {

	await Blog.deleteMany({})
	const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
	const promises = blogObjects.map(blog => blog.save())
	await Promise.all(promises)	

})

test('blogs are returned as json', async () => {

	await api.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)	

})

test('blogs are all returned', async () => {

	const response = await api.get('/api/blogs')	
	expect(response.body).toHaveLength(helper.initialBlogs.length)

})


test('verify that id is defined' , async () => {

	const response = await api.get('/api/blogs')
	const blogs = response.body

	blogs.forEach(blog => expect(blog.id).toBeDefined())
})


test('verify that POST a blog works' , async () => {

	const newBlog = {
		'title': 'BlogTest',
		'author': 'AuthorTest',
		'url': 'www.example1.com',
		'likes': 0
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
	
	
	const blogs = await api.get('/api/blogs')
	
	expect(blogs.body.length).toBe(helper.initialBlogs.length + 1)

	const matchBlog = blogs.body.find(blog => blog.title === newBlog.title)
	delete(matchBlog.id)

	expect(matchBlog).toEqual(newBlog)
})


test('POST a blog with no likes specificed inserts blog with zero likes' , async () => {

	const newBlog = {
		'title': 'BlogTest',
		'author': 'AuthorTest',
		'url': 'www.example1.com'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogs = await api.get('/api/blogs')
	console.log(blogs.body)
	expect(blogs.body.length).toBe(helper.initialBlogs.length + 1)
	const matchBlog = blogs.body.find(blog => blog.title === newBlog.title)

	expect(matchBlog.likes).toEqual(0)

})

test('POST a blog without title and url outputs 404' , async () => {

	const newBlog = {
		'author': 'AuthorTest',
		'likes' : 10
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

})



afterAll(() => {
	mongoose.connection.close()
})