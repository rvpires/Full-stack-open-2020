import React from 'react'
import { Link , useHistory } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'
import { useDispatch , useSelector }  from 'react-redux'

const Menu = () =>
{
	const padding = {
		paddingRight: 5
	}

	const style = {
		background : '#9f9f9f',
		paddingTop : 15,
		paddingBottom : 15

	}

	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const history = useHistory()

	return(
		<div style={style}>
			<Link to='/blogs' style={padding}>blogs</Link>
			<Link to='/users' style={padding}>users</Link>

			{user.username} logged in <button onClick={() => {
				dispatch(logout())
				history.push('/')
			}
			}>logout</button>
		</div>
	)

}

export default Menu