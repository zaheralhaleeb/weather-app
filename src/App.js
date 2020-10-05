import React, { Component } from 'react';
 import Weather from './components/Weather';
 import Form from './components/Form';

import './App.css';

const API_KEY ='7c267a5ffe5520fdcf57c5dff3751060'
//  http://api.openweathermap.org/data/2.5/weather?q=cairo,egypt&appid=e36ed364400282e43250b6c4c0274d44
class App extends Component {
  state= {
    temperature:'',
    city:'',
    country:'',
    humidity:'',
    description:'',
    speed:'',
    error:''
  }

  getWeather =async (e)=>{
    e.preventDefault()
    const city =e.target.elements.city.value;

    const country =e.target.elements.country.value;
     
      const api =await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`)

     const data = await api.json();
     

    if(city && country){

      this.setState({
        temperature:data.main.temp,
        city:data.name,
        country:data.sys.country,
        humidity:data.main.humidity,
        description:data.weather[0].description,
        speed:data.wind.speed,
        error:''
      })
    }
    else{
  this.setState({
    temperature:'',
    city:'',
    country:'',
    humidity:'',
    description:'',
    speed:'',
    error:'Please enter Information'
  })
  }

  }

  render(){ 
     return (
    <div className="wrapper">
      <div className='form-container'>
       <Form getWeather={this.getWeather}/>
      <Weather
      temperature={this.state.temperature}
      city={this.state.city}
      country={this.state.country}
      humidity={this.state.humidity}
      description={this.state.description}
      speed={this.state.speed}
      error= {this.state.error}
  
      />
    </div>
    </div>
  );
}

}

export default App;
