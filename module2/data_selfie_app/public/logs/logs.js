getData();


$('#time').click(function() {
        sortData((a, b) => b.time - a.time);
});

$('#mood').click(function() {
    sortData((a, b) => {
        if (b.mood > a.mood) return -1;
        else return 1;
    });
});

async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {
        const root = document.createElement('p');
        const mood = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        const image = document.createElement('img');

        mood.textContent = `mood: ${item.vegetable}`;
        geo.textContent = `${item.lat}°, ${item.lon}°`;
        const dateString = new Date(item.timestamp).toLocaleString();
        data.textContent = dateString;
        image.src = item.image64;
        image.alt = "Someone is making a selfie";

        root.append(mood, geo, date, image);
        document.body.append(root);

    }

    console.log(data);
}