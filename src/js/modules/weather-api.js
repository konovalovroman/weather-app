export default class WeatherAPI {

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