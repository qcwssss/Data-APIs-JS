function setup() {
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(320, 240);

    let lat, lon;
    const button = document.getElementById('submit');
    button.addEventListener('click', async event => {
        const mood = document.getElementById('mood').value;        
        // load image to base64
        video.loadPixels();
        console.log(video.elt);
        // save(video, 'myImage.png');

        const image64 = video.canvas.toDataURL();                
        const data = { lat, lon, mood, image64 };
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

        // var base64Data = image64.replace(/^data:image\/png;base64,/, "");

        // require("fs").writeFile(mood + ".png", base64Data, 'base64', function(err) {
        //     console.log(err);
        // });
        // file_put_contents('img.png', base64_decode(image64));
    });


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

}