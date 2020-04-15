import React from 'react'
import Country from './Country'


const CountryList = ({countries}) =>
{
  if(countries.length > 10)
  {
    return(<p>Too many matches. Specify another filter.</p>)
  }  

  else
  {
    return(countries.map(country => <Country key={country.name} country={country}/>))
  }

}

export default CountryList