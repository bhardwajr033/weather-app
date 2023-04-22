import React, { Component } from 'react';

class DayCard extends Component {
    render() {
        const {temp , forecastPng , dayOfWeek} = this.props;
        return (
            <div className="day-card">
            <p className="temp">
              {temp}
            </p>
            <div className="forecast-img">
              <img src={forecastPng} />
            </div>
            <p className="day">
              {dayOfWeek}
            </p>
          </div>
        );
    }
}
 
export default DayCard;