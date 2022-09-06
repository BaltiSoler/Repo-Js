const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const ciudad = document.querySelector('#city');
const pais = document.querySelector('#country');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (ciudad.value === '' || pais.value === '') {
        showError('Por favor. Completa ambos campos');
        return;
    }

    callAPI(ciudad.value, pais.value);
})

function callAPI(city, country){
    const apiId = '41d1d7f5c2475b3a16167b30bc4f265c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;

    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            if (dataJSON.cod === '404') {
                showError('Ciudad no encontrada...');
            } else {
                clearHTML();
                showWeather(dataJSON);
            }
        })
        .catch(error => {
            console.log(error);
        })
}

function showWeather(data){
    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;

    const degrees = kelvinToCentigrade(temp);
    const minimo = kelvinToCentigrade(temp_min);
    const maximo = kelvinToCentigrade(temp_max);

    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <br>
        <h2>${degrees}°C</h2>
        <p>Max: ${maximo}°C</p>
        <p>Min: ${minimo}°C</p>
    `;

    result.appendChild(content);
}

function showError(message){
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function kelvinToCentigrade(temp){
    return parseInt(temp - 273.15);
}

function clearHTML(){
    result.innerHTML = '';
}
