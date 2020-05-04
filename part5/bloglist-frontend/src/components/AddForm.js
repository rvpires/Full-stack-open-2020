import React, { useState } from 'react'

const AddForm = ({ createBlog }) => {

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlog = async (event) => {
		event.preventDefault()
		const newBlog = {
			'title': title,
			'author': author,
			'url': url
		}


		createBlog(newBlog)

		setTitle('')
		setAuthor('')
		setUrl('')

	}


	return (
		<form onSubmit={addBlog}>
			<div>
				title:
				<input
					id="title"
					type="text"
					value={title}
					name="Title"
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>
			<div>
				author:
				<input
					id="author"
					type="text"
					value={author}
					name="Author"
					onChange={({ target }) => setAuthor(target.value)}
				/>
			</div>
			<div>
				url:
				<input
					id="url"
					type="text"
					value={url}
					name="Url"
					onChange={({ target }) => setUrl(target.value)}
				/>
			</div>
			<button id="submitBlog" type="submit">create</button>

		</form>


	)
}


export default AddForm