const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')




blogRouter.get('/', async (request, response) => {

	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs.map(blog => blog.toJSON()))

})

blogRouter.post('/', async (request, response) => {

	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	if (!request.token || !decodedToken.id) {

		return response.status(401).json({ error: 'token missing or invalid' })
	}

	const user = await User.findById(decodedToken.id)

	const blog = new Blog({
		'title': request.body.title,
		'author': request.body.author,
		'url': request.body.url,
		'likes': request.body.likes,
		'user': user.id,
		'comments': request.body.comments
	})

	user.toJSON()

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog.id)
	await user.save()
	response.status(201).json(savedBlog.toJSON())

})


blogRouter.delete('/:id', async (request, response) => {
	
	const blog = await Blog.findById(request.params.id)

	if(!blog)
	{
		response.status(400).json({ error: 'blog not found' })
	}	
	
	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}	

	let userId = blog.user.toString()

	if (decodedToken.id !== userId) {
		return response.status(401).json({ error: 'user not authorized to delete blog' })
	}

	else {

		const user = await User.findById(decodedToken.id)
		user.toJSON()

		await Blog.findByIdAndDelete(request.params.id)
		user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id)
		await user.save()
		response.sendStatus(204)
	}


})


blogRouter.put('/:id', async (request, response) => {

	const blog =
	{
		'title': request.body.title,
		'author': request.body.author,
		'url': request.body.url,
		'likes': request.body.likes,
		'comments' : request.body.comments
	}

	const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.status(200).json(savedBlog.toJSON())

})

blogRouter.post('/:id/comments', async (request, response) => {

	let newBlog = await Blog.findById(request.params.id)

	newBlog.comments = [...newBlog.comments , request.body.comment]

	const savedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
	response.status(200).json(savedBlog.toJSON())
})




module.exports = blogRouter
