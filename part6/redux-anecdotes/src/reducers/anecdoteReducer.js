/* eslint-disable no-case-declarations */
import anecdoteService from '../services/anecdotes'


const sortAnecdotes = anecdotes => {

	let a = anecdotes

	//Descendent Bubble-Sort O(n²)
	for (let i = 0; i < a.length - 1; i++) {

		for (let j = 0; j < a.length - i - 1; j++) {

			if (a[j].votes < a[j + 1].votes) {
				let temp = a[j]
				a[j] = a[j + 1]
				a[j + 1] = temp
			}
		}
	}
	return (a)
}


const anecdoteReducer = (state = [], action) => {

	console.log('state now: ', state)
	console.log('action', action)


	switch (action.type) {

	case 'VOTE':
		const id = action.data.id
		const anecdoteToChange = state.find(n => n.id === id)

		const changedAnecdote = {
			...anecdoteToChange,
			votes: anecdoteToChange.votes + 1
		}
		return sortAnecdotes(state.map(note => note.id !== id ? note : changedAnecdote))

	case 'ADD':
		return [...state, action.anecdote]

	case 'INIT':
		return action.anecdotes

	default:
		return state
	}
}

export const voteAnecdote = (id) => {


	return async dispatch => {

		const newAnecdote = await anecdoteService.vote(id)
		console.log(newAnecdote)
		dispatch({ type: 'VOTE', data: { id } })


	}
}

export const createAnecdote = (content) => {

	return async dispatch => {

		console.log(content)

		const newAnecdote = await anecdoteService.addAnecdote(content)
		console.log(newAnecdote)
		dispatch({ type: 'ADD', anecdote: newAnecdote })
	}

}

export const initializeAnecdotes = () => {

	return async dispatch => {

		const anecdotes = await anecdoteService.getAll()
		dispatch({ type: 'INIT', anecdotes })
	}

}


export default anecdoteReducer