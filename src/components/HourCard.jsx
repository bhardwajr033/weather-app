import React, { Component } from "react";

class HourCard extends Component {
  state = {};
  render() {
    const { temp, forecastPng, time } = this.props;

    return (
      <div className="hour-card">
        <p className="temp">{temp}</p>
        <div className="forecast-img">
          <img src={forecastPng} />
        </div>
        <p className="time">{time}</p>
      </div>
    );
  }
}

export default HourCard;
