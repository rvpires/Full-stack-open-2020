let timeoutArr = []

const notificationReducer = (state = {}, action) => {

	switch (action.type) {

	case 'HIDE':
		return {}

	case 'SHOW':
		timeoutArr.forEach(element => clearTimeout(element))
		return { notification : action.data.notification , style : action.data.style }
	default:
		return state
	}
}




export const setNotification = (notification, timeLimit , style) => {
	return async dispatch => {

		dispatch(({ type: 'SHOW', data: { notification , style } }))
		const timeoutId = setTimeout(() => { dispatch({ type: 'HIDE' }) }, timeLimit * 1000)
		timeoutArr = timeoutArr.concat([timeoutId])
	}
}



export default notificationReducer