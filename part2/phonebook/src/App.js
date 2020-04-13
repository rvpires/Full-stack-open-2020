import React, { useState } from 'react'
import Phonebook from './components/Phonebook'


const App = (props) => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [search, setSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSearch = (event) => {

    setSearch(event.target.value)

  }

  const handleNameInput = (event) => {

    setNewName(event.target.value)

  }

  const handleNumberInput = (event) => {

    setNewNumber(event.target.value)

  }

  const addName = (event) => {

    event.preventDefault()
    var names = persons.map(persons => persons.name)
 
    if (names.includes(newName) === true)
    {
      var message = `${newName} is already added to phonebook`
      window.alert(message)      
    }

    else
    {
      var newObject = {name : newName , number: newNumber}
      setPersons(persons.concat(newObject))
      setNewName('')
      setNewNumber('')
    }
  }




  return (
    <div>
      <h2>Phonebook</h2>
      
      <div>filter shown with <input value={search} onChange={handleSearch}/></div>


      <h2>add a new</h2>

      
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameInput}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberInput}/></div>
        <div><button type="submit">add</button></div>
    </form>

     
      <h2>Numbers</h2>
      <Phonebook persons={persons} search={search}/>
    </div>
  )
}

export default App


