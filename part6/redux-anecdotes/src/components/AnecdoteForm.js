import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {


	const addAnecdote = async (event) => {
		event.preventDefault()

		const content = event.target.anecdote.value

		//This line makes sure the form is cleared after submit.
		event.target.anecdote.value = ''

		props.createAnecdote(content)
		props.setNotification(`${content} added.`, 5)
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

const mapStateToProps = (state) => {
	return {
		anecdotes: state.anecdotes
	}
}

const mapDispatchToProps = {
	createAnecdote,
	setNotification
}

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm