import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification , hideNotification} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

	const dispatch = useDispatch()

	const addAnecdote = async (event) => {
		event.preventDefault()

		const content = event.target.anecdote.value


		//This line makes sure the form is cleared after submit.
		event.target.anecdote.value = ''

		dispatch(createAnecdote(content))		

		dispatch(showNotification(`${content} added.`))
		setTimeout(() => {dispatch(hideNotification())}, 5000)

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