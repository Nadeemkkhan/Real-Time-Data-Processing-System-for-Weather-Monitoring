const express = require('express');
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const cron = require('node-cron');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = '5431c115f998f0b1c5f96af2028accde';
const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Initialize database
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run("CREATE TABLE weather (city TEXT, temp REAL, feels_like REAL, main TEXT, dt INTEGER)");
});

// Endpoint to fetch weather data
app.get('/weather', async (req, res) => {
  try {
    const results = await Promise.all(cities.map(async city => {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      const data = response.data;
      return {
        city,
        main: data.weather[0].main,
        temp: (data.main.temp - 273.15).toFixed(2),
        feels_like: (data.main.feels_like - 273.15).toFixed(2),
        dt: data.dt
      };
    }));
    
    // Save data to database
    db.serialize(() => {
      const stmt = db.prepare("INSERT INTO weather VALUES (?, ?, ?, ?, ?)");
      results.forEach(result => {
        stmt.run(result.city, result.temp, result.feels_like, result.main, result.dt);
      });
      stmt.finalize();
    });

    const alertThresholds = {
      temperature: 35
    };

    const alerts = results.filter(result => result.temp > alertThresholds.temperature);
    alerts.forEach(alert => {
      console.log(`Alert! Temperature in ${alert.city} is ${alert.temp} °C`);
    });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Schedule daily weather summary
cron.schedule('0 0 * * *', () => {
  db.serialize(() => {
    cities.forEach(city => {
      db.get(`
        SELECT 
          city, 
          AVG(temp) as avg_temp, 
          MAX(temp) as max_temp, 
          MIN(temp) as min_temp, 
          MAX(main) as dominant_condition 
        FROM weather 
        WHERE city = ? 
        AND dt >= strftime('%s', 'now', 'start of day')
      `, [city], (err, row) => {
        if (!err) {
          console.log(`Daily summary for ${city}:`, row);
        }
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
