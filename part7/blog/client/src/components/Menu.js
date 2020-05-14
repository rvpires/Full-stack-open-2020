import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import './Menu.css'

const Menu = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const history = useHistory()

	return (
		<div className='menu'>
			<div >
				<Link to='/blogs' className="link">blogs</Link>
				<Link to='/users' className="link">users</Link>
			</div>

			<div className='logout'>
				logged in as {user.username}< br />
				<button className ='logOutButton' onClick={() => {
					dispatch(logout())
					history.push('/')
				}}>logout</button>

			</div>

		</div>

	)

}

export default Menu