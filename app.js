const api = {
    base: "http://api.openweathermap.org/data/2.5/",
    units: "metric",
    key: "d4e81c522daba38624f1eb933fb1d0d5"
}
const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
        fetchResults(searchBox.value);
    }
});

function fetchResults(query) {
    fetch(`${api.base}weather?q=${query}&units=${api.units}&appid=${api.key}`)
        .then(weather =>  weather.json())
        .then(weatherData => {
            let city = document.querySelector(".location .city");
            city.textContent = (`${weatherData.name}, ${weatherData.sys.country}`);

            let current = new Date();
            let date = document.querySelector(".location .date");
            date.textContent = formatedDate(current);

            let temp = document.querySelector(".current .temp");
            temp.innerHTML = (`${Math.round(weatherData.main.temp)}<span>°c</span>`);

            let weather_el = document.querySelector(".weather");
            weather_el.textContent = (weatherData.weather[0].main);

            let hilow = document.querySelector(".hi-low");
            hilow.textContent = (`${Math.round(weatherData.main.temp_min)}°c / ${Math.round(weatherData.main.temp_max)}°c`);
        });
}

function formatedDate(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return (`${day} ${date} ${month} ${year}`);
}