const lodash = require('lodash')

const totalLikes = (blogs) => {
	return blogs.reduce(((sum, blog) => sum + blog.likes), 0)
}

const favouriteBlog = (blogs) => {
	/*const likes = (blogs.map(blog => blog.likes))
	console.log(lodash.sortBy(blogs, [function(o) { return o.likes }])[0])
	return(blogs.find(blog => blog.likes === Math.max(...likes)))*/

	return (lodash.maxBy(blogs, 'likes'))

}

const mostBlogs = (blogs) =>
{
	const authors = lodash.uniq(blogs.map(element => element.author))
	const totals = []

	authors.forEach(author => {

		var totalBlogs = 0

		blogs.forEach(blog => {

			if (blog.author === author) 
			{
				totalBlogs++
			}
		})

		totals.push({ 'author': author, blogs: totalBlogs })

	})

	return(lodash.maxBy(totals, 'blogs'))

}

const mostLikes = (blogs) => 
{
	const authors = lodash.uniq(blogs.map(element => element.author))
	const totals = []

	authors.forEach(author => {

		var totalLikes = 0

		blogs.forEach(blog => {

			if (blog.author === author) 
			{
				totalLikes = totalLikes + blog.likes
			}
		})

		totals.push({ 'author': author, likes: totalLikes })

	})

	return(lodash.maxBy(totals, 'likes'))

}

module.exports = { totalLikes, favouriteBlog, mostBlogs ,mostLikes}