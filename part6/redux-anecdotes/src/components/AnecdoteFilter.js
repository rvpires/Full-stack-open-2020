import React from 'react'
import { filter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const AnecdoteFilter = (props) => {


	const handleChange = (event) =>
	{
		props.filter(event.target.value)
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

const mapDispatchToProps = { filter }

const ConnectedAnecdoteFilter = connect(null,mapDispatchToProps)(AnecdoteFilter)

export default ConnectedAnecdoteFilter