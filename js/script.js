document.addEventListener('DOMContentLoaded', function() {
    const citySelect = document.getElementById('citySelect');

    // Function to fetch and populate cities
    function fetchCities() {
        const apiUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&sort=-population&minPopulation=1000000'; // Sorting by population in descending order and setting a minimum population
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '7414bf5d69mshc0d89f4f5aa69f5p1c83d1jsn5b26167ba19d', // Replace with your RapidAPI key
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        };

        fetch(apiUrl, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const cities = data.data;
                if (!cities || cities.length === 0) {
                    throw new Error('No cities found in the response.');
                }
                cities.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city.city;
                    option.textContent = `${city.city}, ${city.country}`; // Including country for better clarity
                    citySelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching cities:', error);
                alert(`Error fetching cities: ${error.message}. Please check the console for details.`);
            });
    }

    // Fetch cities on page load
    fetchCities();

    citySelect.addEventListener('change', function() {
        const city = this.value;
        const apiKey = 'f724bc89879e4d018efffb3cc55796ed'; // Replace with your Weatherbit API key
        const apiUrl = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const weatherDescription = data.data[0].weather.description;
                const temperature = data.data[0].temp;
                document.getElementById('currentWeather').innerText = 
                    `Current weather in ${city}: ${weatherDescription}, ${temperature}°C`;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                document.getElementById('currentWeather').innerText = 
                    `Error fetching weather data: ${error.message}`;
            });
    });
});
