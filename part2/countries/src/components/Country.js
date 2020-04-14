import React from 'react'

const Country = ({country}) =>
{

  return(
    <div>
      <h1>{country.name}</h1>
      <p>Capital City: {country.capital}</p>
      <p>Population: {country.population}</p>

      <h1>Languages</h1>
      <ul>
        {country.languages.map(languages => <li key={languages.name}>{languages.name}</li>)}
      </ul>

      <img src={country.flag} height={200} alt={'country flag picture'}></img>


    </div>
  )
}


export default Country