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

  const result = useQuery(ALL_AUTHORS, { pollInterval: 2000 })
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [changeYear] = useMutation(CHANGE_YEAR)


  if (result.loading) {
    return <div>loading...</div>
  }
  if (!props.show) {
    return null
  }

  const authors = result.data.allAuthors

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(name, typeof (Number(born)))
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
          <select onChange={({ target }) => setName(target.value)}
          >
            {authors.map(author => <option value={author.name}>{author.name}</option>)}
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



      <button onClick={() => console.log(name)}>aaa</button>

    </div>
  )
}

export default Authors
