import React from 'react'
import { useSelector } from 'react-redux'
import lodash from 'lodash'
import { Link } from 'react-router-dom'

const UserView = () => {

	const blogs = useSelector(state => state.blogs)

	let uniqueUsers = lodash.uniqBy(blogs.map(blog => blog.user), e => e.id)

	uniqueUsers.forEach(user => {

		let count = 0

		blogs.forEach(blog => {

			if (blog.user.id === user.id) {
				count++
			}
		})

		user.blogCount = count

	})



	return (
		<div>
			<h1>Users</h1>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>blogs created</th>

					</tr>
					{uniqueUsers.map(user => {

						const link = `/users/${user.id}`

						return (
							<tr key={user.id}>
								<td><Link to={link}>{user.name}</Link></td>
								<td>{user.blogCount}</td>

							</tr>
						)
					})}

				</tbody>





			</table>
		</div>
	)


}

export default UserView