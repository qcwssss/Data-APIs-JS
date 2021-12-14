// Geo locate
let lat, lon;
if ('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async position => {
    let lat, lon, weather, air;
    try {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      console.log(lat, lon);
      $('#latitude')[0].textContent = lat.toFixed(2);
      $('#longitude')[0].textContent = lon.toFixed(2);

      const api_url = `weather/${lat},${lon}`;
      const response = await fetch(api_url);
      const json = await response.json();
      console.log(json);

      weather = json.weather;
      air = json.air_quality.results[0].measurements[0];
      $('#summary')[0].textContent = weather.weather[0].main;
      $('#temperature')[0].textContent = weather.main.temp;

      $('#aq_parameter')[0].textContent = air.parameter;
      $('#aq_value')[0].textContent = air.value;
      $('#aq_unit')[0].textContent = air.unit;
      $('#aq_date')[0].textContent = air.lastUpdated;

      
    } catch (error) {
      console.log(error); 
      air = { value: -1 };
      $('#aq_value')[0].textContent = 'NO READING';

    }

    const data = {
      lat,
      lon,
      weather,
      air
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const db_response = await fetch('/api', options);
    const db_json = await db_response.json();
    console.log(db_json);

  });
} else {
  console.log('geolocation not available');
}