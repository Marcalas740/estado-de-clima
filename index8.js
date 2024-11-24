document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeatherData(city);
    } else {
        showError('Por favor, ingrese el nombre de una ciudad.');
    }
});

function fetchWeatherData(city) {
    const apiKey = '21119dcbd73afbf70fc292fced797571'; // Reemplaza con tu clave de API de OpenWeatherMap
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=es`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                showWeatherData(data);
            } else {
                showError('Ciudad no encontrada. Inténtalo de nuevo.');
            }
        })
        .catch(() => showError('Error al conectar con la API.'));
}

function showWeatherData(data) {
    document.getElementById('error-message').classList.add('hidden');
    document.getElementById('weather-info').classList.remove('hidden');
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('temperature').textContent = data.main.temp;
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind-speed').textContent = data.wind.speed;
}

function showError(message) {
    document.getElementById('weather-info').classList.add('hidden');
    document.getElementById('error-message').classList.remove('hidden');
    document.getElementById('error-message').textContent = message;
}