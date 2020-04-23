const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    
	const blogs = await Blog.find({})    
	response.json(blogs.map(blog => blog.toJSON()))
  
})

blogRouter.post('/', async (request, response) => {
	
	const blog = new Blog(request.body)
	const savedBlog = await blog.save()
	response.status(201).json(savedBlog.toJSON())

})


blogRouter.delete('/:id' , async (request , response) =>{

	await Blog.findByIdAndDelete(request.params.id)
	response.sendStatus(204)
})


blogRouter.put('/:id' , async (request , response) =>{

	const blog = 
	{
		'title': request.body.title,
		'author': request.body.author,
		'url': request.body.url,
		'likes': request.body.likes
	}

	const savedBlog = await Blog.findByIdAndUpdate(request.params.id , blog, { new: true })
	response.status(200).json(savedBlog.toJSON())

})

module.exports = blogRouter
