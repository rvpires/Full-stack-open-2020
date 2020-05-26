
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient , useSubscription , gql} from '@apollo/client'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const  BOOK_ADDED = gql`
  subscription
  {
    addBook
    {
      title, 
      author
      {
        name
      }
    }
  }
  `
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`${subscriptionData.data.addBook.title} by ${subscriptionData.data.addBook.author.name} was added. `)
    }
  })
  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
        />
      </div>
    )
  }

 

  return (
    <div>
      <button onClick={logout}>logout</button>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommendations</button>

      </div>

      <Authors
        show={page === 'authors'}
      />

     <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations
        show={page === 'recommend'}
      />


    </div>
  )
}

export default App



