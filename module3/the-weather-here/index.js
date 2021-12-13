const express = require('express');
const Datastore = require('nedb');
// const fetch = require('node-fetch');
// import fetch from 'node-fetch';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();

const app = express();
app.listen(3000, () => console.log('Starting server: http://localhost:3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

app.get('/weather/:latlon', async (request, response) => {
    const API_KEY = process.env.API_KEY;

    console.log(request.params);
    const latlon = request.params.latlon.split(',');
    let lat = latlon[0]; 
    const lon = latlon[1];
    console.log(latlon);
    console.log(lat, lon);

    const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
    // api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid={API key}
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    response.json(json);
});