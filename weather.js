async function getWeather() {
    const country = document.getElementById("countryInput").value.trim();

    if (!country) {
        alert("Please enter a country name");
        return;
    }
    
    // const apiKey = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}&units=metric`;
    let apiKey = "341637e84ecbcd5e3d35f6ed1f2f4677"
let apiUrl= "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
let url = `${apiUrl}${country}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 401) {
            document.getElementById("result").innerHTML = "❌ Invalid API Key!";
            return;
        }

        if (data.cod == "404") {
            document.getElementById("result").innerHTML = "❌ Country not found!";
            return;
        }

        document.getElementById("result").innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        console.log(error);
        document.getElementById("result").innerHTML = "Network Error!";
    }
}
