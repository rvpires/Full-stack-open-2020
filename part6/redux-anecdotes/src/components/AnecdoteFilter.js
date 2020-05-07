import React from 'react'
import { filter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const AnecdoteFilter = () => {

	const dispatch = useDispatch()

	const handleChange = (event) => 
	{
		dispatch(filter(event.target.value))
	}

	const style = {
		marginBottom: 10
	}

	return (
		<div style={style}>
			filter <input onChange={handleChange} />
		</div>
	)

}

export default AnecdoteFilter