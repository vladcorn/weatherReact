import React from "react";

const Weather = props => (
        <div>
            {  props.city &&
            <div>
                <p>Temperature <i className="fas fa-thermometer-half"></i> : {props.temp} °C</p>
                <p>City <i className="fas fa-city"></i> : {props.city}, {props.country}</p>
                <p>Pressure <i className="fas fa-long-arrow-alt-down"></i> <i className="fas fa-align-right"></i>: {props.pressure}</p>
                <p>Sunrise <i className="fas fa-sun"></i> : {props.sunrise}</p>
                <p>Sunset <i className="far fa-sun"></i> : {props.sunset}</p>
            </div>
            }
            <p>{props.error}</p>
        </div>
    );

export default Weather;