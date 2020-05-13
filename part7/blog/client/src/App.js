import React, { useEffect } from 'react'
import Notification from './components/Notification'
import AddForm from './components/AddForm'
import LoginForm from './components/LoginForm'
import { useDispatch ,useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import { initBlogs } from './reducers/blogReducer'
import { setUser , logout } from './reducers/loginReducer'

const App = () => {

	const dispatch = useDispatch()
	let user = useSelector(state => state.user)

	useEffect(() => {dispatch(initBlogs())} , [dispatch])

	useEffect(() => {

		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))

		}
	}, [dispatch])


	if(!user)
	{
		return(
			<div>
				<h1>login into application</h1>
				<Notification />
				<LoginForm />
			</div>
		)
	}

	else
	{
		return(
			<div>
				<p>{user.username} logged in <button onClick={() => dispatch(logout())}>logout</button></p>
				<Notification />
				<h2>create new</h2>
				<AddForm />
				<BlogList />

			</div>
		)
	}
}

export default App