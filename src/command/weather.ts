import { ApiKeys } from '../api-key';
import { getWeather, kelvinToFahrenheit, WeatherResponse } from '../api/weather';
const Table = require('cli-table');

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
    console.log(results);
    return buildTable(results)
}

function buildTable(results: WeatherResponse[]): string {
    const table = new Table({
        head: ['Location', 'Current', 'Min/Max'],
    });

    results.forEach(r => {
        const currTemp = kelvinToFahrenheit(r.main.temp);
        const maxTemp = kelvinToFahrenheit(r.main.temp_max);
        const minTemp = kelvinToFahrenheit(r.main.temp_min);
        // const msg = `${r.name} ${minTemp}/${currTemp}/${maxTemp}`;

        table.push(
            [r.name, currTemp, `${minTemp}/${maxTemp}`]
        );
    });


    return table.toString();
}