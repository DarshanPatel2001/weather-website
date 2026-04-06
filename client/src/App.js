import React, { useState } from 'react';
import axios from 'axios';

function WeatherApp() {
  // 1. We define our "State" variables
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  // 2. The function to call YOUR backend
  const fetchWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
      setWeatherData(response.data); // Updating the "Source of Truth"
    } catch (error) {
      alert("City not found!");
    }
  };

  return (
    <div className="app-container">
      <input 
        type="text" 
        placeholder="Search city..." 
        onChange={(e) => setCity(e.target.value)} 
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {/* 3. Conditional Rendering (The "Googler" way) */}
      {weatherData && (
        <div className="weather-card">
          <h1>{weatherData.location}</h1>
          <p>{weatherData.temp}°C</p>
          <p>{weatherData.condition}</p>
        </div>
      )}
    </div>
  );
}
// Add a third state variable
const [loading, setLoading] = useState(false);

const fetchWeather = async () => {
    setLoading(true); // 1. Start the spinner
    try {
      const response = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
      setWeatherData(response.data);
    } catch (error) {
      alert("City not found!");
    }
    setLoading(false); // 2. Stop the spinner (whether it worked or failed)
};

// In your return()
<button onClick={fetchWeather} disabled={loading}>
  {loading ? "Searching..." : "Get Weather"}
</button>
export default WeatherApp;