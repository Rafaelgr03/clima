document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'ea72bde68ab80546388d948c118b80a4'; // API Key como string

    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === '404') {
                    alert('Ciudad no encontrada');
                } else {
                    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
                    document.getElementById('temperature').textContent = `Temperatura: ${data.main.temp}°C`;
                    document.getElementById('description').textContent = `Clima: ${data.weather[0].description}`;
                    document.getElementById('weatherResult').style.display = 'block';

                    // Cambiar el fondo según el clima
                    const weatherCondition = data.weather[0].main.toLowerCase(); // Obtener la condición principal del clima

                    // Restablecer la clase del cuerpo
                    document.body.className = '';

                    // Añadir clase según el clima
                    if (weatherCondition.includes('clear')) {
                        document.body.classList.add('sunny');
                    } else if (weatherCondition.includes('rain')) {
                        document.body.classList.add('rainy');
                    } else if (weatherCondition.includes('cloud')) {
                        document.body.classList.add('cloudy');
                    } else if (weatherCondition.includes('snow')) {
                        document.body.classList.add('snow');
                    }
                }
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('Por favor, ingresa una ciudad.');
    }
});
