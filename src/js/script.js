import WeatherAPI from './modules/weather-api';

window.addEventListener('DOMContentLoaded', () => {

    const api = new WeatherAPI();
    const storage = window.localStorage;
    const weatherList = loadList();

    storage.setItem('weatherList', weatherList);
    console.log(storage.getItem('weatherList').split(','));


    function loadList() {
        if (storage.getItem('weatherList')) {
            return storage.getItem('weatherList').split(',');
        } else {
            return [];
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
        elem.innerHTML = `    
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


    //loadList(weatherList);
    console.log(weatherList);
    printList(weatherList);
    onSearch();






});