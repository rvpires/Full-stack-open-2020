import React, { useEffect } from 'react'
import Notification from './components/Notification'
import AddForm from './components/AddForm'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import { initBlogs } from './reducers/blogReducer'
import { setUser, logout } from './reducers/loginReducer'
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory } from 'react-router-dom'
import UserView from './components/UserView'
import User from './components/User'
const App = () => {

	const dispatch = useDispatch()
	let user = useSelector(state => state.user)

	useEffect(() => { dispatch(initBlogs()) }, [dispatch])

	useEffect(() => {

		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))

		}
	}, [dispatch])


	if (!user) {
		return (
			<div>
				<h1>login into application</h1>
				<Notification />
				<LoginForm />
			</div>
		)
	}

	else {
		return (
			<div>
				<h1>Blogs</h1>
				<p>{user.username} logged in <button onClick={() => dispatch(logout())}>logout</button></p>

				<Router>
					<Switch>
						<Route path='/users/:id'>
							<User />
						</Route>
						<Route path='/users'>
							<UserView />
						</Route>


						<Route path='/'>
							<div>
								<Notification />
								<h2>create new</h2>
								<AddForm />
								<BlogList />

							</div>
						</Route>

					</Switch>
				</Router>
			</div>

		)
	}
}

export default App