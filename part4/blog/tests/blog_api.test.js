const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const helper = require('./test_helper')


describe('retreiving blogs is correct', () => {

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

})


describe('add blogs works', () => {

	beforeEach(async () => {

		await Blog.deleteMany({})
		const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
		const promises = blogObjects.map(blog => blog.save())
		await Promise.all(promises)	
		
	})

	test('verify that POST a blog works' , async () => {

		

		let users = await api.get('/api/users').expect(200)

		const newBlog = {
			'title': 'BlogTest',
			'author': 'AuthorTest',
			'url': 'www.example1.com',
			'likes': 0,
			'user' : users.body[0].id
		}



	
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		
		
		const blogs = await api.get('/api/blogs')
		
		expect(blogs.body.length).toBe(helper.initialBlogs.length + 1)
	
		const matchBlog = blogs.body.find(blog => blog.title === newBlog.title)
	
		expect(matchBlog.title).toEqual(newBlog.title)
		expect(matchBlog.author).toEqual(newBlog.author)

	})
	
	
	test('POST a blog with no likes specificed inserts blog with zero likes' , async () => {
	
		let users = await api.get('/api/users').expect(200)

		const newBlog = {
			'title': 'BlogTest',
			'author': 'AuthorTest',
			'url': 'www.example1.com',
			'user' : users.body[0].id
		}
	
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)
	
		const blogs = await api.get('/api/blogs')
		expect(blogs.body.length).toBe(helper.initialBlogs.length + 1)
		const matchBlog = blogs.body.find(blog => blog.title === newBlog.title)
	
		expect(matchBlog.likes).toEqual(0)
	
	})
	
	test('POST a blog without title and url outputs 404' , async () => {
	
		let users = await api.get('/api/users').expect(200)

		const newBlog = {
			'author': 'AuthorTest',
			'url': 'www.example1.com',
			'likes': 0,
			'user' : users.body[0].id
		}
	
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)
	
	})
})

describe('delete and update existing blogs works', () => {

	beforeEach(async () => {

		await Blog.deleteMany({})
		const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
		const promises = blogObjects.map(blog => blog.save())
		await Promise.all(promises)	
		
	})

	test('delete a valid blog' , async () => {

		let blogs = await api.get('/api/blogs')
		
		await api
			.delete(`/api/blogs/${blogs.body[0].id}`)
			.expect(204)
	
		blogs = await api.get('/api/blogs')
		expect(blogs.body.length).toBe(helper.initialBlogs.length - 1)
	})
	
	
	test('delete a invalid blog does not change anything' , async () => {
	
		let blogs = await api.get('/api/blogs')
		
		await api
			.delete('/api/blogs/nonvalidid')
			.expect(400)
	
		blogs = await api.get('/api/blogs')
		expect(blogs.body.length).toBe(helper.initialBlogs.length)
	})
	
	test('update an existing blog is successful' , async () => {
	
		let blogs = await api.get('/api/blogs').expect(200)
	
		let newBlogId = blogs.body[0].id
	
		let newBlog = {
			'title': 'test title',
			'author': 'test author',
			'url': 'test url',
			'likes': 5,
			'id' : newBlogId
		}	
	
		await api.put(`/api/blogs/${newBlogId}`).send(newBlog).expect(200)	
	
		blogs = await api.get('/api/blogs').expect(200)
	
		expect(blogs.body.find(element => element.id === newBlogId)).toEqual(newBlog)
	
	})


})

describe('update user information', () => {


	beforeEach(async () => {

		await User.deleteMany({})
		const userObjects = helper.initialUsers.map(user => new User(user))
		const promises = userObjects.map(user => user.save())
		await Promise.all(promises)	
		
	})

	test('default users are added correctly' , async () => {

		let users = await api.get('/api/users').expect(200)
		expect(users.body.length).toBe(helper.initialUsers.length)
	})

	test('user with shorter username than allowed length is not added' , async () => {

		const newUser = {

			'username' : 'r',
			'name' : 'Rodrigo',
			'password' : '123456789'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body.error).toBeDefined()

	})

	test('user with shorter password than allowed length is not added' , async () => {

		const newUser = {

			'username' : 'rvp',
			'name' : 'Rodrigo',
			'password' : '12'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body.error).toBeDefined()

	})


	








})





afterAll(() => {
	mongoose.connection.close()
})