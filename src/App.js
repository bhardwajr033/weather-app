import React, { Component } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";

class App extends Component {
  state = {
    weatherData: {
      city: {
        name: "Delhi",
      },
    },
  };

  handleSearch = (event) => {
    if (event.key === "Enter") {
      const cityName = event.target.value.trim();
      if (!cityName) {
        return;
      }
      this.getWeatherData(cityName);
    }
  };

  getWeatherData(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=10cd0b66f76e308bc422e9e3dcbc1832`;
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject("error 404");
        }
      })
      .then((data) => {
        this.setState({ weatherData: data });
      })
      .catch((err) => {
        const cityNotFound = {city: "City Not Found"}
        this.setState({ weatherData: cityNotFound });
      });
  }

  componentDidMount(){
    this.getWeatherData("delhi");
  }

  render() {
    return (
      <React.Fragment>
        <SearchBar handleSearch={this.handleSearch} />
        <WeatherCard weatherData={this.state.weatherData} />
      </React.Fragment>
    );
  }
}

export default App;
