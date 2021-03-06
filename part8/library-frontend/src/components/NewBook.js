import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const CREATE_BOOK = gql`
mutation createBook($title : String! , $author : String! , $published : Int! , $genres : [String!]!){
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
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


const NewBook = (props) => {
  const [title, setTitle] = useState('aaaaaaaaaa')
  const [author, setAuhtor] = useState('aaaaaaaaaaaa')
  const [published, setPublished] = useState('11111')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState(['a'])

  const [ createBook ] = useMutation(CREATE_BOOK , {
    refetchQueries: [  {query: ALL_BOOKS} ],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  }) 


  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    console.log('add book...')

    createBook({  variables: { title, author, published : Number(published) , genres } })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook