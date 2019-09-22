import { ApiKeys } from '../api-key';
import { getWeather, WeatherResponse } from '../api/weather';
const Table = require('cli-table');
const moment = require('moment');

export function weather(locations: string[], printJson: boolean): void {
    try {
        const key = ApiKeys.get('openweathermap.prod');

        weatherAsync(locations, key, printJson)
            .then(r => process.stdout.write(r))
            .catch((err: Error) => process.stderr.write(err.toString()));
    } catch (exp) {
        console.error(exp.message);
    }
}

async function weatherAsync(locations: string[], apiKey: string, printJson: boolean): Promise<string> {
    if (locations === undefined || locations.length === 0) {
        throw Error('invalid request, no locations found.');
    }

    const results = await getWeather(locations, apiKey);
    return printJson ? buildJson(results) : buildTable(results);
}

function buildJson(results: WeatherResponse[]): string {
    const obj = results.map(r => {
        const currTemp = kelvinToFahrenheit(r.main.temp);

        return {
            "name": r.name,
            "local_datetime": formatTime(r.timezone),
            "curr_temp": currTemp,
            "lat_long": `${r.coord.lat}/${r.coord.lon}`,
            "visibility": r.visibility,
            "wind_speed": r.wind.speed,
            "wind_angle": r.wind.deg,
        };
    });

    if (obj.length > 0) {
        return JSON.stringify(obj);
    } else {
        return '';
    }

}

function buildTable(results: WeatherResponse[]): string {
    const table = new Table({
        head: [
            'Location',
            'Local Date/Time',
            'Temp (°F)',
            'Lat/Long (°)',
            'Vis. (m)',
            'Wind Speed (m/s)',
            'Wind Angle (°)'
        ],
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
