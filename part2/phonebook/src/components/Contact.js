import React from 'react'

const Contact = ({person , deletePerson}) => {
    return (
      <p>{person.name} {person.number} <button onClick={deletePerson}>delete</button></p>
    )
  }

export default Contact