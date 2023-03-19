const savedMode = localStorage.getItem('mode');

// Define a function to toggle between light mode and dark mode
function toggleMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
	const mode = body.classList.contains('dark-mode') ? 'dark' : 'light';
	localStorage.setItem('mode', mode);
}

if (savedMode === 'dark') {
document.body.classList.add('dark-mode');
}

fetch('https://api.openweathermap.org/data/2.5/weather?q=Ottawa,CA&appid=a985024787d5a53c45cb72e1c7de94f0&units=metric')
    .then(response => response.json())
    .then(data => {
	// Display the current time in the local timezone
      const timeElement = document.getElementById('time');
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'America/Toronto' };
      const currentTime = new Date().toLocaleDateString('en-CA', options);
      const temperature = data.main.temp;
      timeElement.textContent = `${currentTime} EST,  ${temperature}°C`;
});
	
document.addEventListener('DOMContentLoaded', function() {
  //This function is called after the browser has loaded the web page
  //add listener to buttons
  document.getElementById('toggle-button').addEventListener('click', toggleMode)
})
