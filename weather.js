#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js'
import { saveKeyValue } from './services/storage.service.js'
import { getWeather } from './services/api.service.js'

const saveToken = async (token) => {
    if(!token.length) {
        printError('Token not specified. Use flag -t [TOKEN] to specify.\nYou can get your own token here: https://openweathermap.org/ ')
        return;
    }
    try {
        await saveKeyValue('token', token);
        printSuccess('Token saved');
    } catch (err) {
        printError(err.message);
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('City not specified. Use flag -s [CITY] to specify')
        return;
    }
    try {
        await saveKeyValue('city', city);
        printSuccess('City saved');
    } catch (err) {
        printError(err.message);
    }
}

const getForecast = async () => {
    try {
        const weather = await getWeather();
        printWeather(weather);
    } catch (e) {
        if(e?.response?.status === 404) {
            printError('City not found')
        } else if (e?.response?.status === 401) {
            printError('Token not specified or wrong \nYou can get your own token here: https://openweathermap.org/')
        } else {
            printError(e.message)
        }
    }
}

const initCLI = async () => {
    const args = yargs(hideBin(process.argv)).argv;

    if(args.h) {
        return printHelp();
    }

    if (args.t) {
        return saveToken(args.t)
    }

    if (args.s) {
        return saveCity(args.s);
    }

    getForecast();
}

initCLI();
