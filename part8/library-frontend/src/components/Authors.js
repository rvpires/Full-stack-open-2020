import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'


const ALL_AUTHORS = gql`
query
{
  allAuthors{
    name,
    born, 
    bookCount
  }
}`

const CHANGE_YEAR = gql`
mutation changeYear($name : String! , $setBornTo : Int!){
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) 
  {
    name,
    born
  }
}


`

const Authors = (props) => {

  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [changeYear] = useMutation(CHANGE_YEAR, {
    refetchQueries: [  {query: ALL_AUTHORS} ]})


  if (result.loading) {
    return <div>loading...</div>
  }
  if (!props.show) {
    return null
  }

  const authors = result.data.allAuthors

  const handleSubmit = (event) => {
    event.preventDefault()
    changeYear({ variables: { name, setBornTo: Number(born) } })
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthday year</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <select onChange={({ target }) => setName(target.value)}>
            {authors.map(author => <option key={author.name} value={author.name}>{author.name}</option>)}
          </select>
        </div>
        <div>
          year
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">submit</button>

      </form>
    </div>
  )
}

export default Authors
