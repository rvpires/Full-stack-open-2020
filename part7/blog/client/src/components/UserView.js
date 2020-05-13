import React from 'react'
import { useSelector } from 'react-redux'
import lodash from 'lodash'
const UserView = () => {
	const blogs = useSelector(state => state.blogs)

	let a = lodash.uniqBy(blogs.map(blog => blog.user), e => e.id)

	a.forEach(user => {

		let count = 0

		blogs.forEach(blog => {

			if (blog.user.id === user.id) {
				count++
			}
		})

		user.blogCount = count

	})

	console.log(a)

	return (
		<div>
			<h1>Users</h1>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>blogs created</th>

					</tr>
					{a.map(a => {

						return (
							<tr key={a.id}>
								<td>{a.name}</td>
								<td>{a.blogCount}</td>

							</tr>
						)
					})}

				</tbody>





			</table>
		</div>
	)


}

export default UserView