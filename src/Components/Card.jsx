import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Card.css";

function Card() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const ApiKey = "b392a1355ff06efd74c78c6fcf5e5fcc";

  const getWeatherData = async () => {
    if (!city) {
      alert("Please enter a city name");
      return;
    }

    const apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`;

    try {
      const response = await fetch(apiLink);
      const data = await response.json();

      if (data.cod === "404") {
        alert("City not found!");
      } else {
        setWeatherData(data); // store API response in state
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="container">
      {/* Search Bar */}
      <div className="searchCont">
        <input
          type="text"
          className="input-box"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <FaSearch onClick={getWeatherData} style={{ cursor: "pointer" }} />
      </div>

      {/* Weather Data */}
      <div className="weatherData">
        <img
          src={
            weatherData
              ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
              : "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"
          }
          alt="weatherIcon"
        />
        <h1 className="weather-degree">
          {weatherData ? `${weatherData.main.temp}°C` : "24°C"}
        </h1>
        <p className="weather-city">
          {weatherData ? weatherData.name : "Berlin"}
        </p>
      </div>

      <div className="weather-footer">
        <div className="humidity">
          <span className="hum-icon"></span>
          <p className="hum-text">
            {weatherData ? `${weatherData.main.humidity}%` : "11%"}
          </p>
          <p>Humidity</p>
        </div>

        <div className="wind-speed">
          <span className="wind-icon"></span>
          <p className="wind-text">
            {weatherData ? `${weatherData.wind.speed} km/h` : "11 km/h"}
          </p>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
