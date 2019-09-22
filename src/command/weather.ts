import { ApiKeys } from '../api-key';
import { getWeather, WeatherResponse } from '../api/weather';
const Table = require('cli-table');
const moment = require('moment');

export function weather(locations: string[]): void {
    try {
        const key = ApiKeys.get('openweathermap.prod');

        weatherAsync(locations, key)
            .then(r => process.stdout.write(r))
            .catch((err: Error) => process.stderr.write(err.toString()));
    } catch (exp) {
        console.error(exp.message);
    }
}

async function weatherAsync(locations: string[], apiKey: string): Promise<string> {
    if (locations === undefined || locations.length === 0) {
        throw Error('invalid request, no locations found');
    }

    const results = await getWeather(locations, apiKey);
    return buildTable(results)
}

function buildTable(results: WeatherResponse[]): string {
    const table = new Table({
        head: ['Location', 'Local Date/Time', 'Temp (°F)', 'Lat/Long (°)', 'Vis. (m)', 'Wind Speed (m/s)', 'Wind Angle (°)'],
    });

    results.forEach(r => {
        const currTemp = kelvinToFahrenheit(r.main.temp);

        table.push(
            [
                r.name,
                formatTime(r.timezone),
                currTemp,
                `${r.coord.lat}/${r.coord.lon}`,
                r.visibility,
                r.wind.speed,
                r.wind.deg,
            ]
        );
    });

    return table.toString();
}

function formatTime(timezoneInSecs: number): string {
    const timezoneInHours = timezoneInSecs / 3600;
    return moment()
        .utc()
        .add(timezoneInHours, 'hours')
        .format('ll/h:mm:ss a');
}

function kelvinToFahrenheit(value: number): number {
    return Number.parseFloat((value * 9 / 5 - 459.67).toFixed(2));
}
