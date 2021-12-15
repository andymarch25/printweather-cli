import axios from "axios";
import { getKeyValue } from "./storage.service.js"

const icons = {
    '01': '☀️',
    '02': '⛅',
    '03': '☁️',
    '04': '☁️',
    '09': '🌨️',
    '10': '🌦️',
    '11': '🌩️',
    '13': '❄️',
    '50': '🌫️',
}

const getWeather = async (city) => {

    const token = process.env.TOKEN ?? await getKeyValue('token');
    const city_ = process.env.CITY ?? city ?? await getKeyValue('city');

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city_,
            appid: token,
            units: 'metric',
            lang: 'en'
        }
    });

    return data;
}

export { getWeather, icons };