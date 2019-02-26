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

  // Convert temp to F
  convertToF = temp => {
    // F=((K-273.15)*1.8)+32
  };

  // Convert temp to C
  convertToC = temp => {
    // C=K-273.15
  };

  // Get weather API call
  getWeather = async e => {
    e.preventDefault();

    // Get city and country values
    // const city =
    // const country =

    const API_KEY = 'YOUR_API_KEY HERE';
    try {
      // Programatically define your URL so we're not always getting London, UK
      // Similar to how we put API_KEY in the URL
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=London,UK&appid=${API_KEY}`
      );
      const data = await api_call.json();
      this.setState({ data: data });
      console.log('Our api data', data);

      // if (city && country) {
      // Dig into data object and set corresponding state
      // } else {
      // Set state of everything to undefined, and set state of error to an error message
      // }
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
