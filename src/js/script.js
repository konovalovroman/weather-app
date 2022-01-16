window.addEventListener('DOMContentLoaded', () => {

    class WeatherAPI {

    _apiKey = 'cd8a7d99a022a62768e0c560e03df096';

        getRecourses = async (url) => {
            let res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }

            return await res.json();
        }

        getWeatherInCurrentCity = async (cityName) => {
            const res = await this.getRecourses(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${this._apiKey}&lang=ru`);
            return this.transformWeatherObject(res);
        } 

        transformWeatherObject = (res) => {
            return {
                cityName: res.city.name,
                country: res.city.country,
                temperature: this.kelvinToCelsius(res.list[0].main.temp),
                pressure: res.list[0].main.pressure,
                weather: res.list[0].weather[0].main,
                description: res.list[0].weather[0].description
            }
        }

        kelvinToCelsius = (kelvin) => {
            return Math.floor(kelvin - 273);
        }
    }


    const api = new WeatherAPI();
    const storage = window.localStorage;
    const weatherList = [];
   // api.getWeatherInCurrentCity('кейптаун').then(console.log);

   storage.setItem('weatherList', weatherList);
    // console.log(storage.getItem('weatherList').split(','));

  
   function loadList(weatherList) {
       if (storage.getItem('weatherList')) {
        weatherList = storage.getItem('weatherList').split(',');
       }
   }

   function addToList(weatherObj) {
    console.log(weatherObj);
    weatherList.push(weatherObj.cityName);
    saveList();
    printList(weatherList);
}

   function saveList() {
    storage.setItem('weatherList', weatherList);
   }

   function onSearch() {
       document.querySelector('.search-btn').addEventListener('click', () => {
        const result = document.querySelector('.input-form').value;
        if (result) {
            document.querySelector('.input-form').value = '';       
            api.getWeatherInCurrentCity(result).then(addToList);
        }       
       });
   }

 

   function printList(weatherList) {
        removeElements();
        weatherList.forEach((item) => {
     api.getWeatherInCurrentCity(item).then(makeList);
        });
   }

   function makeList(weatherObj) {
    document.querySelector('.weather-list').appendChild(getListItemElement(weatherObj));
   }

   function getListItemElement(weatherObj) {
       const elem = document.createElement('div');
       elem.classList.add('weather-list-item');
       elem.innerHTML =    `    
            <div class="buttons">
                <div class="info-btn"></div>
                <div class="close-btn"></div>
            </div>
            <div class="weather-icon">
                <img src="../resources/images/weather-icons/${weatherObj.weather}.png" width="80" height="80" alt="">
            </div>
            <div class="description">${weatherObj.description}</div>
            <div class="temperature"> ${weatherObj.temperature} ℃</div>
            <div class="city-name">${weatherObj.cityName}</div>
        `;

        return elem;
   }

   function removeElements() {
        document.querySelectorAll('.weather-list-item').forEach(item => item.remove());
   }

   function infoDeleteButtons() {
       document.querySelectorAll('.weather-list-item').forEach(item => {
           item.addEventListener('mouseenter', (e) => {
               document.querySelectorAll('.buttons').forEach(elem => {
                elem.style.visibility = 'visible';
               });
           });
       });
   }

   loadList(weatherList);
   printList(weatherList);
   onSearch();
   infoDeleteButtons();






   console.log(WeatherAPI._apiKey);

















});