import React from 'react'
import Weather from './Weather'

const CountryDetails = ({country}) =>
{
  return(
    <div>
        <h1>{country.name}</h1>
        <p>Capital City: {country.capital}</p>
        <p>Population: {country.population}</p>
  
        <h2>Spoken Languages</h2>
        <ul>
          {country.languages.map(languages => <li key={languages.name}>{languages.name}</li>)}
        </ul>
  
        <img src={country.flag} height={200} alt={'country flag'}></img> 
        <Weather city={country.capital}/> 
      </div>

  )
}

export default CountryDetails