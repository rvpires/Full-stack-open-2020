import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

const LoginForm = () => {


	const dispatch = useDispatch()

	const handleLogin = async (event) => {

		event.preventDefault()
		const username = event.target.username.value
		const password = event.target.password.value
		dispatch(login(username, password))
	}

	return (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input type="text" name="username"/>
			</div>
			<div>
				password
				<input	type="password"	name="password"/>
			</div>
			<button id="login-button" type="submit">login</button>
		</form>
	)
}

export default LoginForm