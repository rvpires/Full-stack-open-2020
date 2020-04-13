import React, { useState } from 'react'
import Phonebook from './components/Phonebook'
import AddForm from './components/AddForm'
import SearchFilter from './components/SearchFilter'


const App = (props) => {

  const [persons, setPersons] = useState(props.persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleSearch = (event) => setSearch(event.target.value)
  const handleNameInput = (event) => setNewName(event.target.value)
  const handleNumberInput = (event) => setNewNumber(event.target.value)

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

      <SearchFilter search={search} handleSearch={handleSearch}/>      
      
      <h2>add a new</h2>

      <AddForm 
          addName={addName} 
          newName={newName} 
          handleNameInput={handleNameInput} 
          newNumber={newNumber}
          handleNumberInput={handleNumberInput}
      /> 
         
      <h2>Numbers</h2>
      
      <Phonebook persons={persons} search={search}/>
    </div>
  )
}

export default App