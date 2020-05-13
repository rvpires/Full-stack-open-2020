/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
const sortBlogs = blogs => {

	const orderFunction = (a, b) => {
		if (a.likes > b.likes) {
			return -1
		}
		if (a.likes < b.likes) {
			return 1
		}

		return 0
	}

	return (blogs.sort(orderFunction))
}

const blogReducer = (state = [], action) => {

	console.log('state', state)

	switch (action.type) {

	case 'INIT':
		return action.data.blogs

	case 'UPDATE':
		let newBlogs = state.filter(blog => blog.id !== action.data.newBlog.id)
		return sortBlogs(newBlogs.concat(action.data.newBlog))

	case 'DELETE':
		return state.filter(blog => blog.id !== action.data.blog.id)

	case 'ADD':

		return sortBlogs([...state, action.data.newBlog])

	default:
		return state

	}
}


export const initBlogs = () => {
	return async dispatch => {

		const blogs = await blogService.getAll()
		dispatch(({ type: 'INIT', data: { blogs: sortBlogs(blogs) } }))
	}
}

export const updateBlog = (blog) => {
	return async dispatch => {

		try
		{
			const newBlog = await blogService.update(blog)
			dispatch({ type: 'UPDATE', data: { newBlog } })
			dispatch(setNotification(`${newBlog.title} by ${newBlog.author} updated successfuly.`, 5, 'success'))


		}
		catch (exception)
		{
			dispatch(setNotification('Could not update blog.' , 5, 'error'))
		}
		const newBlog = await blogService.update(blog)
		dispatch({ type: 'UPDATE', data: { newBlog } })
	}

}

export const deleteBlog = (blog, user) => {
	return async dispatch => {

		try
		{
			blogService.setToken(user.token)
			await blogService.deleteBlog(blog)
			dispatch({ type: 'DELETE', data: { blog } })
			dispatch(setNotification(`${blog.title} by ${blog.author} deleted successfuly.`, 5, 'success'))


		}
		catch(exception)
		{
			dispatch(setNotification('Could not delete blog.' , 5, 'error'))
		}


	}
}

export const addBlog = (blog, user) => {
	return async dispatch => {

		try
		{
			blogService.setToken(user.token)
			const newBlog = await blogService.create(blog)
			dispatch({ type: 'ADD', data: { newBlog } })
			dispatch(setNotification(`${newBlog.title} by ${newBlog.author} added successfuly.`, 5, 'success'))


		}
		catch(exception)
		{
			dispatch(setNotification('Could not add blog.' , 5, 'error'))
		}

	}
}

export default blogReducer
