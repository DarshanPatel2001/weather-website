const express = require('express');
const axios = require('axios');
const cors = require('cors');


require('dotenv').config(); // This loads our secret key

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3001' // Only allow your specific frontend
}));

// The "Route" - This is our API Contract
app.get('/api/weather', async (req, res) => {
    const city = req.query.city;

    // Guard Clause: If no city, stop here.
    if (!city) {
        return res.status(400).json({ message: "City name is required" });
    }

    try {
        // Fetching from OpenWeatherMap
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: process.env.WEATHER_API_KEY,
                units: 'metric' // We want Celsius
            }
        });

        // PIE Principle: Send only what the user needs
        const cleanData = {
            location: response.data.name,
            temp: response.data.main.temp,
            condition: response.data.weather[0].main
        };

        res.json(cleanData);

    } catch (error) {
        // Professional Error Handling
        res.status(404).json({ message: "City not found or API error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});