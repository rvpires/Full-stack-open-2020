import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const loginReducer = (state = null,  action) => {

	console.log(action)
	switch(action.type)
	{
	case 'LOGIN':
		return action.data.user

	case 'LOGOUT':
		return null

	case 'SET':
		return action.data.user

	default:
		return state
	}
}



export const login = (username , password) =>
{
	return async dispatch => {

		try
		{
			const user = await loginService.login({ username, password })
			window.localStorage.setItem('loggedUser', JSON.stringify(user))
			dispatch({ type : 'LOGIN' , data : { user } })
			dispatch(setNotification(`Welcome ${user.name}.`, 5, 'success'))

		}
		catch(exception)
		{
			dispatch(setNotification('Credentials are wrong', 5, 'error'))
		}

	}
}

export const logout = () =>
{
	window.localStorage.removeItem('loggedUser')
	return({ type : 'LOGOUT' })
}

export const setUser = (user) =>
{
	return({ type : 'SET' , data : { user } })

}



export default loginReducer



