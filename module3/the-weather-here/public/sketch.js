// Geo locate
let lat, lon;
if ('geolocation' in navigator) {
    console.log('geolocation is available');
    navigator.geolocation.getCurrentPosition(async position => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        document.getElementById('latitude').textContent = lat;
        document.getElementById('longitude').textContent = lon;
    });
} else {
    console.log('geolocation IS NOT available');
}

const button = document.getElementById('submit');
button.addEventListener('click', async event => {
    const mood = document.getElementById('mood').value;
    const data = {
        lat,
        lon,
        mood
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch('api/', options);
    const json = await response.json();
    console.log(json);

});


