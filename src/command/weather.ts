import * as moment from 'moment';
import { ApiKeys } from '../api-key';
import { ApiWeatherResponse, getWeather } from '../api/weather';
const Table = require('cli-table');

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

    const sortedResults = results.sort((a, b) => (a.location > b.location) ? 1 : -1)

    const success = sortedResults.filter(r => r.success === true)


    const failure = sortedResults.filter(r => r.success === false);
    failure.forEach(f => {
        console.error(`Location "${f.location}" not found.`);
    });

    return printJson ? buildJson(success) : buildTable(success);
}

function buildJson(results: ApiWeatherResponse[]): string {
    const obj = results.map(r => {
        const currTemp = kelvinToFahrenheit(r.result.main.temp);
        const now = moment.utc();

        return {
            "name": r.location,
            "local_datetime": formatTime(now, r.result.timezone),
            "curr_temp": currTemp,
            "lat_long": `${r.result.coord.lat}/${r.result.coord.lon}`,
            "visibility": r.result.visibility,
            "wind_speed": r.result.wind.speed,
            "wind_angle": r.result.wind.deg,
        };
    });

    if (obj.length > 0) {
        return JSON.stringify(obj);
    } else {
        return '';
    }

}

function buildTable(results: ApiWeatherResponse[]): string {
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
        const currTemp = kelvinToFahrenheit(r.result.main.temp);
        const now = moment.utc()

        table.push(
            [
                r.location,
                formatTime(now, r.result.timezone),
                currTemp,
                `${r.result.coord.lat}/${r.result.coord.lon}`,
                r.result.visibility,
                r.result.wind.speed,
                r.result.wind.deg,
            ]
        );
    });

    return table.toString();
}

function formatTime(now: moment.Moment, timezoneInSecs: number): string {
    const timezoneInHours = timezoneInSecs / 3600;
    return now
        .add(timezoneInHours, 'hours')
        .format('ll/h:mm:ss a');
}

function kelvinToFahrenheit(value: number): number {
    return Number.parseFloat((value * 9 / 5 - 459.67).toFixed(2));
}
