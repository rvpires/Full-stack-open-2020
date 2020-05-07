const filterReducer = (state = '', action) => {

	switch (action.type) {

		case 'SET_FILTER':
			return action.input

		default:
			return state
	}
}


export const filter = (input) => {
	return ({ type: 'SET_FILTER', input  })
}



export default filterReducer