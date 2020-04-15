import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'

function App() {

  const [countries , setCountries] = useState([])
  const [search , setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => setSearch(event.target.value)

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))


  return (
    <div>
      
      Country name <input value={search} onChange={handleSearch}/> 
      <CountryList countries={countriesToShow}/>   


    </div>
  );
}

export default App;


