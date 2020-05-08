import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

	const anecdotes = props.anecdotes.filter(anecdote => anecdote.content.includes(props.filter))

	return (<>{anecdotes.map(anecdote =>
		<div key={anecdote.id}>
			<div>
				{anecdote.content}
			</div>
			<div>
				has {anecdote.votes}
				<button onClick={() => {
					props.voteAnecdote(anecdote.id)
					props.setNotification(`You voted on ${anecdote.content}.`, 5)
				}}>vote</button>
			</div>
		</div>
	)}</>)
}

const mapStateToProps = (state) => {
	return {
		anecdotes: state.anecdotes,
		filter: state.filter
	}
}

const mapDispatchToProps = {
	voteAnecdote,
	setNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
