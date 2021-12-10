getData();

const selfies = [];

document.getElementById('time').addEventListener('click', event => {
    console.log("time clicked");
    sortData((a, b) => b.time - a.time);
    console.log("is it sort?");

});

document.getElementById('mood').addEventListener('click', event => {
    sortData((a, b) => {
        if (b.mood > a.mood) return -1;
        else return 1;
    });
});

function sortData(compare) {
    console.log("button clicked, is it sort?");

    for (let item of selfies) {
        item.elt.remove();
        console.log("remove");

    }
    selfies.sort(compare);
    for (let item of selfies) {
        document.body.append(item.elt);
        console.log("append");
    }
}

async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {
        const root = document.createElement('p');
        const mood = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        const image = document.createElement('img');

        mood.textContent = `mood: ${item.mood}`;
        geo.textContent = `${item.lat}°, ${item.lon}°`;
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;
        image.src = item.image64;
        image.alt = "Someone is making a selfie";

        root.append(mood, geo, date, image);
        
        // sort
        selfies.push({ elt: root, time: item.timestamp, mood: item.mood });
        document.body.append(root);

    }

    console.log(data);
}