let getWeatherData = function(){
    fetch('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=a7b91f774ee25e3ed253d83efa758862', {mode: "cors"})
        .then(function(res){
            return res.json()
        })
        .then(function(res){
            console.log(res)
        })
}

getWeatherData()