import React, { useState, useEffect } from 'react'
import { gql, useQuery, useSubscription } from '@apollo/client'


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

const BOOK_ADDED = gql`
  subscription
  {
    addBook
    {
      title, 
      author
      {
        name
      },
      published

    }
  }
  `




const Books = (props) => {

  const result = useQuery(ALL_BOOKS)

  const [books, setBooks] = useState(null)

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])


  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {

      setBooks(books.concat(subscriptionData.addBook))
    }
  })


  if (!props.show) {
    return null
  }

  if (result.loading || !books) {
    return <div>loading...</div>
  }

  let genres = []

  result.data.allBooks.forEach(book => {

    book.genres.forEach(genre => {

      if (!genres.includes(genre)) {
        genres = genres.concat(genre)
      }
    })
  })


  const filterClicked = (event) => {
    event.preventDefault()
    setBooks(result.data.allBooks)
    let genre = event.target.name
    if (genre !== 'ALL') {
      setBooks(result.data.allBooks.filter(book => book.genres.includes(genre)))
    }


  }


  return (
    <div>
      <h2>books</h2>

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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        {genres.map(genre => <button key={genre} name={genre} onClick={filterClicked}>{genre}</button>)}
        <button name="ALL" onClick={filterClicked}>ALL</button>
      </div>
    </div>
  )
}

export default Books