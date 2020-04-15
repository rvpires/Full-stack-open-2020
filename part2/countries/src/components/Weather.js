import React , {useState , useEffect} from 'react'
import axios from 'axios'
const Weather = ({city}) =>
{
    const [weather , setWeather] = useState()
    
    const apiKey = process.env.REACT_APP_API_KEY
      const queryString = 'http://api.weatherstack.com/current?access_key=' + apiKey + '&query=' +city + '&units=m'


    useEffect(() => {     
      
        axios
          .get(queryString)
          .then(response => {
            setWeather(response.data)
          })
      }, [])

      if(weather === undefined)
      {
          return(<p>Loading weather..</p>)
      }

      else
      {
        return(<>
                <h2>Weather in {city}</h2>        
                <p>Temperature : {weather.current.temperature}</p>
                <img src={weather.current.weather_icons} height={75} alt={'weather'}></img> 
                <p>Wind: {weather.current.wind_speed} km/h {weather.current.wind_dir}</p>
               </>
        
        )    
      }



}


export default  Weather