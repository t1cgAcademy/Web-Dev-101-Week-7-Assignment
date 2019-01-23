import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import Titles from './components/Titles';
import Weather from './components/Weather';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      windSpeed: undefined,
      img: '',
      error: undefined
    };
  }

  convertToF = temp => {
    // F=((K-273.15)*1.8)+32
    return ((temp - 273.15) * 1.8 + 32).toFixed(1);
  };

  convertToC = temp => {
    // C=K-273.15
    return (temp - 273.15).toFixed(1);
  };

  // Get weather API call
  getWeather = async e => {
    e.preventDefault();

    const city = e.target.city.value;
    const country = e.target.country.value;

    const API_KEY = '83b3230d3a1dd3a3d0bc41c4bf85c437';
    try {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
      );
      const data = await api_call.json();
      this.setState({ data: data });
      console.log('Our api data', data);

      if (city && country) {
        this.setState({
          temperature:
            this.convertToF(data.main.temp) +
            '°F, ' +
            this.convertToC(data.main.temp) +
            '°C',
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          windSpeed: data.wind.speed + ' mph',
          img: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
          error: ''
        });
      } else {
        this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          windSpeed: undefined,
          error: 'Please enter values'
        });
      }
    } catch (error) {
      console.log('An error occurred: ', error);
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        windSpeed: undefined,
        error: this.state.data.message
      });
    }
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    windSpeed={this.state.windSpeed}
                    img={this.state.img}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
