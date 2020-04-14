import React from 'react'
import Country from './Country'

const CountryList = ({ countries , search }) =>
{
  const countriesNames = countries.map(countries => countries.name)

  const filteredCountries = countriesNames.filter(countriesNames => countriesNames.toLowerCase().includes(search.toLowerCase()))
  
  if(filteredCountries.length > 10)
  {
    return(<p>Too many matches. Specify another filter.</p>)
  }

  else if(filteredCountries.length === 1)
  {
    const found = countries.find(element => element.name.toLowerCase() === filteredCountries.join().toLowerCase())
    return(<Country country={found}/>)
  }

  else
  {
    return(filteredCountries.map(name => <p key={name}> {name}</p>))
  }
  
  

}

export default CountryList