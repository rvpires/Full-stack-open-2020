import React , { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const LoginForm = ({setToken}) =>
{
	const [ login , result ] = useMutation(LOGIN , {onError: (error) => setNotification(error.graphQLErrors[0].message)})
	const [username, setUsername] = useState('user1')
	const [password, setPassword] = useState('secret')
	const [notification, setNotification] = useState('')

	const handleSubmit = async (event) =>
	{
		event.preventDefault()
		login({ variables: { username, password } })

	}

	useEffect(() => {
		if(result.data)
		{
			console.log('-->', result.data)
      		const token = result.data.login.value
      		setToken(token)
      		localStorage.setItem('user-token', token)
		}
	} , [result.data]) // eslint-disable-line

	return(
		<div>
			<p>{notification}</p>
			<form onSubmit={handleSubmit}>
				<div>
				username:
				<input value={username} onChange={({target}) => setUsername(target.value)} />
				</div>
				<div>
				password:
				<input type="password" value={password} onChange={({target}) => setPassword(target.value)} />
				</div>
				<button type="submit">login</button>
				
				
				
			</form>
		</div>
	)
}

export default LoginForm