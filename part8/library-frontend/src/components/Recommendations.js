import React, { useState, useEffect } from 'react'
import { gql, useQuery, useLazyQuery } from '@apollo/client'

const USER = gql`
	query{
		me
		{
		  username,
		  favouriteGenre
		}		
	  }	`

const FILTERED_BOOKS = gql`
		
	query findBooksByGenre($genreToSearch : String!)
	{
		allBooks(genre: $genreToSearch)
		{
			title,
		 	genres,
			author
			{
				name
			},
			published		  
		}		  
	}`

const ALL_BOOKS = gql`
	query
	{
	  allBooks{
		title, 
		author
		{
		  name
		}, 
		published,
		genres
	  }
	}`

const Recommendations = (props) => {

	console.log(props)


	const [user, setUser] = useState(null)
	const userData = useQuery(USER)
	const [getBooks, result] = useLazyQuery(FILTERED_BOOKS) 


	useEffect(() => {

		if (userData.data) {
			setUser(userData.data)
		}

	}, [userData.data])


	useEffect(() => {
		if (user) {
			getBooks({ variables: { genreToSearch: user.me.favouriteGenre } })
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	if (!props.show) {
		return null
	  }

	if (!user) {
		//console.log(user)
		return (<div>authenticating...</div>)
	}

	/*getBooks({variables : {genreToSearch : user.me.favouriteGenre}})

	
	if (result.loading)  {
		return <div>loading...</div>
	}*/

	if (!result.data) {
		return (<div>fetching data...</div>)
	}

	console.log(result.data.allBooks)

	return (
		<div>
			<h1>Recommendations</h1>
			<div>
				books in your favourite genre <b>{user.me.favouriteGenre}</b>
			</div>
			<div>
				<table>
					<tbody>
						<tr>
							<th></th>
							<th>
								author
            				</th>
							<th>
								published
           					 </th>
						</tr>
						{result.data.allBooks.map(a =>
							<tr key={a.title}>
								<td>{a.title}</td>
								<td>{a.author.name}</td>
								<td>{a.published}</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>


		</div>)

}


export default Recommendations