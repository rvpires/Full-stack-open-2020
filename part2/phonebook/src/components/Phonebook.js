import React from 'react'
import Contact from './Contact'

const Phonebook = ({ persons , search }) =>
{

  const filteredSearch = persons.filter(persons => (persons.name).toLowerCase().includes(search.toLowerCase()))

  return(
    filteredSearch.map(persons => <Contact key={persons.name} name={persons.name} number={persons.number}/>)
  )
}

export default Phonebook