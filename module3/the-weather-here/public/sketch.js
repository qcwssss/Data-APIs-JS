// Geo locate
let lat, lon;
if ('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition( async position => {
    try {

    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lat, lon);
    document.getElementById('latitude').textContent = lat.toFixed(2);
    document.getElementById('longitude').textContent = lon.toFixed(2);

    const api_url = `weather/${lat},${lon}`;
    const response = await fetch(api_url);
    const json = await response.json();
    console.log(json);

    const weather = json.weather;
    const air = json.air_quality.results[0].measurements[0];
    $('#summary')[0].textContent = weather.weather[0].main;
    $('#temperature')[0].textContent = weather.main.temp;

    $('#aq_parameter')[0].textContent = air.parameter;
    $('#aq_value')[0].textContent = air.value;
    $('#aq_unit')[0].textContent = air.unit;
    $('#aq_date')[0].textContent = air.lastUpdated;
    } catch(error) {
      console.log(error);
      air = { value: -1 };
      $('#aq_value')[0].textContent = 'NO READING';

    }

  });
} else {
  console.log('geolocation not available');
}

// Handle button presses, submit data to database.
const button = document.getElementById('checkin');
button.addEventListener('click', async event => {
  const data = { lat, lon };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const response = await fetch('/api', options);
  const json = await response.json();
  console.log(json);
});