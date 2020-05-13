import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}


const getAll = async () => {
	const  response = await axios.get(baseUrl)
	return response.data
}

const create = async newObject => {
	const config = {
		headers: { Authorization: token }
	}

	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}


const update = async newObject =>
{
	const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
	return response.data
}

const deleteBlog = async blog =>
{
	const config = { headers: { Authorization: token } }

	const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
	return response.data
}

const addComment = async (id ,newComment) =>
{
	const response = await axios.post(`${baseUrl}/${id}/comments`, { comment : newComment })
	return response.data


}

export default { getAll , create, setToken, update, deleteBlog , addComment}