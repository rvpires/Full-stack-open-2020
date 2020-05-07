import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

	const dispatch = useDispatch()

	const addAnecdote = async (event) => {
		event.preventDefault()

		const content = event.target.anecdote.value

		//This line makes sure the form is cleared after submit.
		event.target.anecdote.value = ''

		dispatch(createAnecdote(content))
		dispatch(setNotification(`${content} added.`, 5))
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div><input name="anecdote" /></div>
				<button type='submit'>create</button>
			</form>
		</>
	)

}

export default AnecdoteForm