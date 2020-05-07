const notificationReducer = (state = '', action) => {

	switch (action.type) {

		case 'HIDE':
			return ''

		case 'SHOW':
			return action.data.text
		default:
			return state
	}
}


export const showNotification = (text) => {
	return ({ type: 'SHOW', data: { text } })
}

export const hideNotification = () => {
	return ({ type: 'HIDE', data: {} })
}



export default notificationReducer