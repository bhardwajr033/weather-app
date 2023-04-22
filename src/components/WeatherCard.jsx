import React, { Component } from "react";

import "./WeatherCard.css";

import DayCard from "./DayCard";
import HourCard from "./HourCard";

class WeatherCard extends Component {
  getTimeInAmpm(index, weatherData) {
    if (!weatherData.list) {
      return "12:AM";
    }
    const timeZoneOffset = weatherData.city.timezone * 1000;
    const date = new Date(
      new Date(weatherData.list[index].dt_txt).getTime() + timeZoneOffset
    );
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  getTempInCelsius(index, weatherData) {
    if (!weatherData.list) {
      return "27°C";
    }
    return parseInt(weatherData.list[index].main.temp - 273.15) + "°C";
  }

  getForecastPNG(index, weatherData) {
    if (!weatherData.list) {
      return `https://openweathermap.org/img/wn/01n@2x.png`;
    }
    return `https://openweathermap.org/img/wn/${weatherData.list[index].weather[0].icon}@2x.png`;
  }

  getDay(index, weatherData) {
    if (!weatherData.list) {
      return "Sun";
    }
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const timeZoneOffset = weatherData.city.timezone * 1000;
    const date = new Date(
      new Date(weatherData.list[index].dt_txt).getTime() + timeZoneOffset
    );
    return days[date.getDay()];
  }

  getTimeOfForecast(weatherData) {
    if (!weatherData.list) {
      return "1 Apr 12:00 PM";
    }

    const timeZoneOffset = weatherData.city.timezone * 1000;
    const date = new Date(
      new Date(weatherData.list[0].dt_txt).getTime() + timeZoneOffset
    );
    const day = date.getDate().toString();
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][date.getMonth()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours.toString() : "12";
    minutes = minutes < 10 ? "0" + minutes : minutes.toString();
    return day + " " + month + " " + hours + ":" + minutes + " " + ampm;
  }

  getIndexOfNoonTime(weatherData) {
    if (!weatherData.list) {
      return [8, 16, 24];
    }

    const { list } = weatherData;
    const timeZoneOffset = weatherData.city.timezone * 1000;

    return list.reduce((acc, forecast, index) => {
      const date = new Date(
        new Date(forecast.dt_txt).getTime() + timeZoneOffset
      );
      if (date.getHours() in [11, 12, 13]) {
        acc.push(index);
      }
      return acc;
    }, []);
  }

  render() {
    const { weatherData } = this.props;

    if (weatherData.city === "City Not Found") {
      return <div style={{ marginTop: "2rem" }}>City Not Found</div>;
    }

    const indexOfNoonTime = this.getIndexOfNoonTime(weatherData);

    return (
      <React.Fragment>
        <section className="todays-weather">
          <div className="city">
            <p className="name">{weatherData.city.name}</p>
            <p className="temp">{this.getTempInCelsius(0, weatherData)}</p>
            <p className="time">{this.getTimeOfForecast(weatherData)}</p>
          </div>
          <div className="forecast-img">
            <img src={this.getForecastPNG(0, weatherData)} />
          </div>
        </section>
        <section className="hourly-weather">
          {Array.from({ length: 3 }, (_, index) => {
            return (
              <HourCard
                key={"Hour_Card" + index.toString()}
                temp={this.getTempInCelsius(index, weatherData)}
                forecastPng={this.getForecastPNG(index, weatherData)}
                time={this.getTimeInAmpm(index, weatherData)}
              />
            );
          })}
        </section>
        <section className="days-weather">
          {Array.from({ length: 3 }, (_, index) => {
            return (
              <DayCard
                key={"Day_Card" + index.toString()}
                temp={this.getTempInCelsius(
                  indexOfNoonTime[index],
                  weatherData
                )}
                forecastPng={this.getForecastPNG(
                  indexOfNoonTime[index],
                  weatherData
                )}
                dayOfWeek={this.getDay(indexOfNoonTime[index], weatherData)}
              />
            );
          })}
        </section>
      </React.Fragment>
    );
  }
}

export default WeatherCard;
