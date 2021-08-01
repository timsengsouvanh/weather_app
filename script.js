const cityname = document.getElementById('city-name')
const currentweather = document.getElementById('currentweather')
const maxtemp = document.getElementById('max-temp')
const mintemp = document.getElementById('min-temp')
const day1temp = document.getElementById('day1temp')
const day2temp = document.getElementById('day2temp')
const day3temp = document.getElementById('day3temp')
const day4temp = document.getElementById('day4temp')
const day5temp = document.getElementById('day5temp')
const day1name = document.getElementById('day1name')
const day2name = document.getElementById('day2name')
const day3name = document.getElementById('day3name')
const day4name = document.getElementById('day4name')
const day5name = document.getElementById('day5name')
const day1icon = document.getElementById('day1icon')
const day2icon = document.getElementById('day2icon')
const day3icon = document.getElementById('day3icon')
const day4icon = document.getElementById('day4icon')
const day5icon = document.getElementById('day5icon')
const weathericon = document.querySelector('img')
const btn = document.querySelector('button')
let input = document.querySelector('input')

const daysss = [
    null,
    day1icon,
    day2icon,
    day3icon,
    day4icon,
    day5icon,
]

const ktoc = (val) => {
    return Math.round((val-273)*10/10) + '°C'
}

const whatday = (unixtime) => {
var i = 0;
var data = { list: [unixtime] };

var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; 
var dayNum = new Date(unixtime * 1000).getDay();
var result = days[dayNum];
return result
}



const chooseWeatherIcon = (weathercon) => {
    if (weathercon === "Clear"){
         weathericon.src = '../weather_app/1163623-weather/png/039-sun.png'
    }
    else if (weathercon === "Haze"){
        weathericon.src = '../weather_app/1163623-weather/png/017-foog.png'
    }

    else if (weathercon === "Clouds"){
        weathericon.src = '../weather_app/1163623-weather/png/001-cloud.png'
    }
    else if (weathercon === "Rain"){
        weathericon.src = '../weather_app/1163623-weather/png/003-rainy.png'
    }
}
const chooseWeatherIcon1 = (num, weathercon) => {
    let res = daysss[num]

    if (weathercon === "Clear"){
         res.src = '../weather_app/1163623-weather/png/039-sun.png'
    }
    else if (weathercon === "Haze"){
        res.src = '../weather_app/1163623-weather/png/017-foog.png'
    }

    else if (weathercon === "Clouds"){
        res.src = '../weather_app/1163623-weather/png/001-cloud.png'
    }
    else if (weathercon === "Rain"){
        res.src = '../weather_app/1163623-weather/png/003-rainy.png'
    }
}

const getWeatherData = async(city) => {
    let response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=a7b91f774ee25e3ed253d83efa758862', {mode: "cors"})
    let weatherdata = await response.json()
    console.log(weatherdata)

    let lat = weatherdata.coord.lat
    let lon = weatherdata.coord.lon
    let responseOneCall = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude={part}&appid=a7b91f774ee25e3ed253d83efa758862')
    let oneCallData = await responseOneCall.json()
    console.log(oneCallData)

    cityname.innerText = weatherdata.name
    currentweather.innerText = ktoc(weatherdata.main.temp)
    maxtemp.innerText = 'H' + ': ' + ktoc(weatherdata.main.temp_max)
    mintemp.innerText = 'L' + ': ' + ktoc(weatherdata.main.temp_min)
    let weathercon = weatherdata.weather[0].main
    chooseWeatherIcon(weathercon)
    console.log(weathercon)

    let weathercon1 = oneCallData.daily[1].weather[0].main
    let weathercon2 = oneCallData.daily[2].weather[0].main
    let weathercon3 = oneCallData.daily[3].weather[0].main
    let weathercon4 = oneCallData.daily[4].weather[0].main
    let weathercon5 = oneCallData.daily[5].weather[0].main

    chooseWeatherIcon1(1, weathercon1)
    chooseWeatherIcon1(2, weathercon2)
    chooseWeatherIcon1(3, weathercon3)
    chooseWeatherIcon1(4, weathercon4)
    chooseWeatherIcon1(5, weathercon5)
    

    day1temp.innerText = ktoc(oneCallData.daily[1].temp.day)
    day2temp.innerText = ktoc(oneCallData.daily[2].temp.day)
    day3temp.innerText = ktoc(oneCallData.daily[3].temp.day)
    day4temp.innerText = ktoc(oneCallData.daily[4].temp.day)
    day5temp.innerText = ktoc(oneCallData.daily[5].temp.day)
    
    day1name.innerText = whatday(oneCallData.daily[1].dt)
    day2name.innerText = whatday(oneCallData.daily[2].dt)
    day3name.innerText = whatday(oneCallData.daily[3].dt)
    day4name.innerText = whatday(oneCallData.daily[4].dt)
    day5name.innerText = whatday(oneCallData.daily[5].dt)
}

getWeatherData('london')



btn.addEventListener('click', () => {
    return getWeatherData(input.value)
})

