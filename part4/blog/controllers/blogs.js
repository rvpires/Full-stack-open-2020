const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async (request, response) => {
    
	const blogs = await Blog.find({}).populate('user' , {username : 1 , name : 1})    
	response.json(blogs.map(blog => blog.toJSON()))
  
})

blogRouter.post('/', async (request, response) => {
	
	const user = await User.findById(request.body.user)

	
	const blog = new Blog({
		'title': request.body.title,
		'author': request.body.author,
		'url': request.body.url,
		'likes': request.body.likes,
		'user' : user.id
	})

	user.toJSON()

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog.id)
	await user.save()
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
