import React , { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import AnecdoteFilter from './components/AnecdoteFilter'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeAnecdotes())
	}, [dispatch])

	return (
		<div>
			<h1>Anecdotes</h1>
			<Notification />
			<AnecdoteFilter />
			<AnecdoteList />
			<AnecdoteForm />


		</div>
	)
}

export default App