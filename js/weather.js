(function () {
  const OTTAWA_LAT = 45.4215;
  const OTTAWA_LON = -75.6971;
  const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${OTTAWA_LAT}&longitude=${OTTAWA_LON}&current_weather=true`;

  const weatherCodes = {
    0: { label: 'Clear Sky', icon: '☀️' },
    1: { label: 'Mostly Clear', icon: '🌤️' },
    2: { label: 'Partly Cloudy', icon: '⛅' },
    3: { label: 'Overcast', icon: '☁️' },
    45: { label: 'Foggy', icon: '🌫️' },
    48: { label: 'Icy Fog', icon: '🌫️' },
    51: { label: 'Light Drizzle', icon: '🌦️' },
    53: { label: 'Drizzle', icon: '🌦️' },
    55: { label: 'Heavy Drizzle', icon: '🌦️' },
    61: { label: 'Light Rain', icon: '🌧️' },
    63: { label: 'Rain', icon: '🌧️' },
    65: { label: 'Heavy Rain', icon: '🌧️' },
    71: { label: 'Light Snow', icon: '🌨️' },
    73: { label: 'Snow', icon: '🌨️' },
    75: { label: 'Heavy Snow', icon: '❄️' },
    80: { label: 'Light Showers', icon: '🌦️' },
    81: { label: 'Showers', icon: '🌧️' },
    82: { label: 'Heavy Showers', icon: '🌧️' },
    95: { label: 'Thunderstorm', icon: '⛈️' },
    96: { label: 'Thunderstorm & Hail', icon: '⛈️' },
    99: { label: 'Thunderstorm & Heavy Hail', icon: '⛈️' },
  };

  function getWeatherInfo(code) {
    return weatherCodes[code] || { label: 'Unknown', icon: '❓' };
  }

  async function loadWeather() {
    const container = document.getElementById('weather-widget');
    if (!container) return;

    container.innerHTML = '<p class="weather-loading">Loading climate data...</p>';

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const current = data.current_weather;
      const info = getWeatherInfo(current.weathercode);

      container.innerHTML = `
        <div class="weather-current">
          <span class="weather-icon">${info.icon}</span>
          <span class="weather-temp">${Math.round(current.temperature)}°C</span>
        </div>
        <div class="weather-details">
          <span class="weather-label">${info.label}</span>
          <span class="weather-wind">Wind: ${Math.round(current.windspeed)} km/h</span>
        </div>
        <div class="weather-location">📍 Ottawa, ON</div>
      `;
    } catch (error) {
      container.innerHTML = `
        <div class="weather-error">
          <span class="weather-error-icon">⚠️</span>
          <span>Climate data unavailable</span>
        </div>
      `;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWeather);
  } else {
    loadWeather();
  }
})();
