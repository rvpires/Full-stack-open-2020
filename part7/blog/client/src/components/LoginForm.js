import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import './LoginForm.css'
import loginIcon from '../images/interface.png'
const LoginForm = () => {


	const dispatch = useDispatch()

	const handleLogin = async (event) => {

		event.preventDefault()
		const username = event.target.username.value
		const password = event.target.password.value
		dispatch(login(username, password))
	}

	return (
		<div className="login-form">
			<img src={loginIcon}></img>
			<form onSubmit={handleLogin}>
				<div>
					<input type="text" name="username" placeholder="username"/>
				</div>
				<div>
					<input	type="password"	name="password" placeholder="password"/>
				</div>
				<button className='submit-button' id="login-button" type="submit">login</button>
			</form>

		</div>

	)
}

export default LoginForm