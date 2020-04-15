import React, { useState } from 'react'
import CountryDetails from './CountryDetails'

const Country = ({ country }) => {
  const [details, setDetails] = useState(false)

  const showDetails = () => 
  {
    setDetails(!details)
  }

  if (details === false) 
  {
    return (<p>{country.name} <button onClick={showDetails}>show</button></p>)

  }

  else if (details === true) 
  {
    return (<><p>{country.name} <button onClick={showDetails}>hide</button></p>
      <CountryDetails country={country} /></>)

  }
}

export default Country