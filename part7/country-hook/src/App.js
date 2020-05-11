import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    
    if(name)
    {
      axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
    .then(response => {
      setCountry(response)})
    .catch((error) => {
      console.log(error.message)
      setCountry(null)})
    }

  } , [name])

  return country
}

const Country = ({ country }) => {

  if (!country) {
    return (
      <div>
        not found...
      </div>  )
    }

  

  let data = country.data[0]

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {data.capital} </div>
      <div>population {data.population}</div> 
      <img src={data.flag} height='100' alt={`flag of ${data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('portugal')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App