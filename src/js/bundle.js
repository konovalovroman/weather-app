/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/weather-api.js":
/*!***************************************!*\
  !*** ./src/js/modules/weather-api.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WeatherAPI)
/* harmony export */ });
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_weather_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/weather-api */ "./src/js/modules/weather-api.js");


window.addEventListener('DOMContentLoaded', () => {

    const api = new _modules_weather_api__WEBPACK_IMPORTED_MODULE_0__["default"]();
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
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map