let timeoutArr = []

const notificationReducer = (state = '', action) => {

	switch (action.type) {

	case 'HIDE':
		return ''

	case 'SHOW':
		timeoutArr.forEach(element => clearTimeout(element))
		return action.data.notification
	default:
		return state
	}
}




export const setNotification = (notification, timeLimit) => {
	return async dispatch => {

		dispatch(({ type: 'SHOW', data: { notification } }))
		const timeoutId = setTimeout(() => { dispatch({ type: 'HIDE', data: { timeoutId } }) }, timeLimit * 1000)
		timeoutArr = timeoutArr.concat([timeoutId])
	}
}



export default notificationReducer