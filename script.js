feather.replace()
const apiKey = '863242cfb2b1d357e6093d9a4df19a4b';
let button = document.getElementById('button');
let search = document.getElementById('search');
let currentTime = document.getElementById('currentTime');
let currentTemp = document.getElementById('currentTemp');
let currentCity = document.getElementById('currentCity');
let mainLocation = document.getElementById('location');
let situation = document.getElementById('situation');
let o3data = document.getElementById('o3data');
let codata = document.getElementById('codata');
let no2data = document.getElementById('no2data');
let so2data = document.getElementById('so2data');
let aqiSituation = document.getElementById('aqiSituation');
let airQualityIndex = document.getElementById('airQualityIndex');
let sunRiseTime = document.getElementById('sunRiseTime');
let sunSetTime = document.getElementById('sunSetTime');
let humidityValue = document.getElementById('humidityValue')
let pressureValue = document.getElementById('pressureValue');
let visibilityValue = document.getElementById("visibilityValue");
let feelLikeValue = document.getElementById('feelLikeValue');
let currentTempIcon = document.getElementById("currentTempIcon");
let second = document.getElementById('second');
let rowForForecast = document.getElementById('rowForForecast');
let rightSecond = document.getElementById('rightSecond');
let dataToBeShown = document.getElementById('dataToBeShown');

// SHOWING THE WEAHER BETWEEN THREE HOURS
showForecast = async (url) => {
    response = await fetch(url);
    data = await response.json();
    // console.log(data)
    let str = ''
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    for (let i = 0; i < data.list.length; i = i + 8) {
        d = new Date(data.list[i].dt_txt)
        let month = months[d.getMonth()]
        let day = days[d.getDay()]
        date = d.getDate();
        link = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
        if (data.list[i].weather[0].icon == '01d') {
            link = "./icons/sunny.png"
        }
        str += `
        <tr>
            <td>
                <div> 
                <img src =${link} alt='image'>  
                <span>${data.list[i].main.temp}°C</span>
                </div>
            </td>
            <td>
                <p>${date} ${month}</p>
            </td>
            <td>
                <p>${day}</p>
            </td>
        </tr>`
    }
    let str2 = ''
    // console.log('starting');
    for (i = 0; i < 8; i++) {
        dateForTime = new Date(data.list[i].dt_txt).toLocaleTimeString();
        // console.log(data.list[i])
        // console.log(dateForTime)
        // console.log(data.list[i].weather[0].icon)
        link = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
        if (data.list[i].weather[0].icon === '01d') {
            link = "./icons/sunny.png"
        }
        str2 += `
        <div class="swiper-slide">
                <div class="card js-tilt forecastItem" >
                            <div>${data.list[i].weather[0].description}</div>
                                <div id="weather">
                                    <div>
                                        <h1>${data.list[i].main.temp}</h1>
                                        <img id="currentTempIcon" src=${link} alt="img">
                                    </div>
                                </div>
                            <hr>
                            <div>&nbsp;</div>
                            <div class="currentDetails">
                                <div>
                                    <ion-icon name="time-outline"></ion-icon> 
                                    <span>At : ${dateForTime} </span>
                                </div>
                            </div>

                </div>
        </div>
    `
    }
    rowForForecast.innerHTML = str;
    dataToBeShown.innerHTML = str2;
}
// SHOWING THE AQI 
showAQI = async (url) => {
    aqi = await fetch(url);
    aqiRes = await aqi.json();
    so2data.innerText = aqiRes.list[0].components.so2
    codata.innerText = aqiRes.list[0].components.co
    no2data.innerText = aqiRes.list[0].components.no2
    o3data.innerText = aqiRes.list[0].components.o3
    let so2 = Number.parseFloat(aqiRes.list[0].components.so2)
    let no2 = Number.parseFloat(aqiRes.list[0].components.no2)
    let pm10 = Number.parseFloat(aqiRes.list[0].components.pm10)
    let pm2_5 = Number.parseFloat(aqiRes.list[0].components.pm2_5)
    let o3 = Number.parseFloat(aqiRes.list[0].components.o3)
    let co = Number.parseFloat(aqiRes.list[0].components.co)
    let isGood = false
    let isFair = false;
    let isModerate = false;
    let isPoor = false;
    let veryPoor = false;
    let aqiSit = 'none';

    // console.log('no2', no2)
    // console.log('pm2_5', pm2_5)
    // console.log('pm10', pm10)
    // console.log('o3', o3)
    // console.log('co', co)
    // console.log('so2', so2)

    airQualityIndex.innerText = "Air Quality Index (" + aqiRes.list[0].main.aqi + ")";
    let url2 = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}&appid=${apiKey}`;
    showForecast(url2);
}

// SHOWING THE WEATHER CORRESPONDING TO THE USER CITY
shwoWeather = (obj) => {
    currentTemp.innerText = obj.main.temp + "°C"
    mainLocation.innerText = obj.name;
    currentCity.innerText = obj.name + ` ${obj.sys.country}`
    situation.innerText = obj.weather[0].description;
    sunRise = obj.sys.sunrise;
    sunSet = obj.sys.sunset;
    let date = new Date(sunRise * 1000);
    let timestr = date.toLocaleTimeString();
    sunRiseTime.innerText = timestr + " AM";

    date = new Date(sunSet * 1000);
    timestr = date.toLocaleTimeString();
    sunSetTime.innerText = timestr + " PM";
    humidityValue.innerText = obj.main.humidity + "%"
    pressureValue.innerText = obj.main.pressure + "hPa"
    visibilityValue.innerText = obj.visibility + "m"
    feelLikeValue.innerText = obj.main.feels_like + "%"
    link = `https://openweathermap.org/img/w/${obj.weather[0].icon}.png`;
    if (obj.weather[0].icon == '01d') {
        link = "./icons/sunny.png"
    }
    currentTempIcon.src = link;
    showAQI(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${obj.coord.lat}&lon=${obj.coord.lon}&appid=${apiKey}`);

}

// GETTING THE URL AND FETCHING THE RESPONSE
getWeather = async (url) => {
    // console.log(url);
    res = await fetch(url);
    data = await res.json();
    // console.log(data);
    shwoWeather(data);
}

button.addEventListener('click', () => {
    city = search.value;
    // console.log(city);
    url1 = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`
    getWeather(url1)
})

let city = 'MUMBAI';
url1 = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`
getWeather(url1, city)
search.value = city;

setInterval(() => {
    let date = new Date();
    let day = date.getDay();
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    day = dayNames[day - 1];
    let hours = date.getHours();
    let minutes = date.getMinutes()
    let amPm = (hours > 12) ? 'PM' : "AM";
    if (hours > 12) {
        hours -= 12;
    }
    currentTime.innerHTML = `${day} ${hours}:${minutes} ${amPm}`;
}, 1000);

const tilt = $('.js-tilt').tilt();

var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 10,
        stretch: 0,
        depth: 150,
        modifier: 1,
        slideShadows: true,
        loop: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
});

var typed = new Typed('#logoText', {
    strings: ['Weather?', 'Humidity?', 'AirQuality?', 'Forecasting?', 'Visibility?','Pressure?',''],
    typeSpeed: 100,
    loop: true,
});
