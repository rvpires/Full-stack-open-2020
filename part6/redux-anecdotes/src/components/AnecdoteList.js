import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

	const dispatch = useDispatch()

	const anecdotes = useSelector(state => {

		let filteredAnecdotes = state.anecdotes.filter(anecdote =>{

			return(anecdote.content.includes(state.filter))

		})

		return (filteredAnecdotes)
	})

	return (<>{anecdotes.map(anecdote =>
		<div key={anecdote.id}>
			<div>
				{anecdote.content}
			</div>
			<div>
				has {anecdote.votes}
				<button onClick={() => {
					dispatch(voteAnecdote(anecdote.id))
					dispatch(showNotification(`You voted on ${anecdote.content}.`))
					setTimeout(() => { dispatch(hideNotification()) }, 5000)
				}}>vote</button>
			</div>
		</div>
	)}</>)
}

export default AnecdoteList
