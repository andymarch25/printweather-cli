import chalk from 'chalk';
import dedent from 'dedent';
import { icons } from './api.service.js'

const log = console.log;

const printError = (error) => {
    log(chalk.bgRed.white(' ERROR ') + ' ' + error);
}

const printSuccess = (message) => {
    log(chalk.bgGreenBright.black(' SUCCESS ') + ' ' + message);
}

const printHelp = () => {
    log(
        dedent`${chalk.bgBlue.black(' HELP ')}
        No parameters - weather display
        -s [CITY] to set city
        -t [API_KEY] to save the token
        -h to display help
        `
    );
}

const printWeather = (weather) => {

    const iconName = weather.weather[0].icon.replace(/\D/gm, "");
    const icon = icons[iconName];

    log(
        dedent`${chalk.bgYellow.black(` Weather in ${weather.name} `)}
        ${icon}  ${weather.weather[0].description}
        Temp: ${weather.main.temp.toFixed(0)}°C (feels like: ${weather.main.feels_like.toFixed(0)}°C)
        Humidity: ${weather.main.humidity}%
        Wind: ${weather.wind.speed} km/h
        `
    );
}

export { printError, printSuccess, printHelp, printWeather }