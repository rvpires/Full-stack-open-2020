import React, { useState , useEffect} from 'react'
import AddForm from './components/AddForm'
import SearchFilter from './components/SearchFilter'
import personService from './services/persons'
import Contact from './components/Contact'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personService.getAll().then(response => setPersons(response))
  }, [])

  const handleSearch = (event) => setSearch(event.target.value)
  const handleNameInput = (event) => setNewName(event.target.value)
  const handleNumberInput = (event) => setNewNumber(event.target.value)

  const addName = (event) => {

    event.preventDefault()
    var names = persons.map(persons => persons.name)
 
    if (names.includes(newName) === true)
    {
      if(window.confirm(`${newName} is already added to phonebook. Want to update number?`))
      {
        var person = persons.find(element => element.name === newName)
        var newPerson = {...person , number : newNumber}

        personService.updatePerson(newPerson).then(response => 
          {setPersons(persons.map(person => person.id === newPerson.id ? response : person))})
      }     
    }


    else
    {
      var newObject = {name : newName , number: newNumber}

        personService.addPerson(newObject)
          .then(response => {
            setPersons(persons.concat(response))
            setNewName('')
            setNewNumber('')
          })  
    }
  }

  const deletePerson = (id) =>
  {
    const name = persons.find(element => element.id === id).name

    if(window.confirm(`Delete ${name}?`))
    {
       personService.deletePerson(id)
       setPersons(persons.filter(element => element.id !== id))
    }
  }


  const filteredSearch = persons.filter(persons => (persons.name).toLowerCase().includes(search.toLowerCase()))


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
      {filteredSearch.map(person => <Contact key={person.id} person={person} deletePerson={() => deletePerson(person.id)}/>)}    
  </div>
  )
}

export default App