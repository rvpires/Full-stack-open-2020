import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification , hideNotification} from '../reducers/notificationReducer'
 

const AnecdoteForm = () => {

	const dispatch = useDispatch()

	const addAnecdote = (event) => {
		event.preventDefault()
		dispatch(createAnecdote(event.target.anecdote.value))
		dispatch(showNotification(`${event.target.anecdote.value} added.`))

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