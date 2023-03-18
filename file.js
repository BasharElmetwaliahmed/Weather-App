const inputCountry=document.querySelector(`input[type='text']`)
const submitBtn=document.querySelector(`input[type='submit']`)
const weatherContainer=document.querySelector('.weather');
const handlerWeather=(weathernow)=>{
    console.log(weathernow)
  const html=`                <h1 class="city-name">${weathernow.name}</h1>
                <p class="weather-state">${weathernow.weather[0].main}</p>
                <p class="weather-detail">${weathernow.weather[0].description}</p>
                <h2 class="weather-degree">${weathernow.main.temp}&deg;</h2>
              <img src='https://openweathermap.org/img/w/${weathernow.weather[0].icon}.png' >
                <div class="min-max">
                    <div class="min">
                        <label >Min</label>
                        <P>${weathernow.main.temp_min}</P>
                    </div>
                
                    <div class="max">
                     <label >Min</label>
                        <P>${weathernow.main.temp_max}</P>
                    </div>

                </div>`
                weatherContainer.innerHTML=html
}
    const keys='be55ddac72d57b1dde9b9c16d6152025'
submitBtn.addEventListener('click',(e)=>{

    e.preventDefault();
        if(inputCountry.value==''){
      weatherContainer.innerHTML=`<h3 class=error>value mustn't be empty </h3>`;
      return
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCountry.value}&appid=${keys}`).then(respone=>{

    if(!respone.ok){
      throw new Error('City not found');
    }
      
    return respone.json()}).
    then(weather=>handlerWeather(weather)
    ).catch(err=>{
      let html=`<h3 class='error'>${err}</h3>`
      weatherContainer.innerHTML=html
    })
})
const geolocationPromise=function(){
  return new Promise (function(resolve,reject){
        navigator.geolocation.getCurrentPosition(resolve,reject)
  })
}
geolocationPromise().then(coordinates=>{

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&appid=${key}`)
  .then(respnse=>respnse.json())
  .then(weather=>handlerWeather(weather))

}).catch(e=>{
  weatherContainer.innerHTML=`<h3 class='error'>Make Allow to get your location to get weather</h3>`
})
.catch((err)=>console.log(err))