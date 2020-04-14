import React , {useState} from 'react'


const Country = ({country}) =>
{
  const [details, setDetails] = useState(false)

  const showDetails = () =>
  {
    setDetails(!details)
  }

  if(details === true)
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
  
        <img src={country.flag} height={200} alt={'country flag'}></img>
        <p><button onClick={showDetails}>hide</button></p>
  
      </div>
    )
  }

  else
  {
    return(<p>{country.name} <button onClick={showDetails}>details</button></p>)
  }
}


 


export default Country