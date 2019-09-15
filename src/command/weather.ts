import { ApiKeys } from '../api-key';
import { getWeather } from '../api/weather';
import { strict } from 'assert';

export function weather(locations: string[]): void {
    try {
        const key = ApiKeys.get('openweathermap.prod');
        console.log(key);
        console.log(locations);

        weatherAsync(locations, key)
            .then(r => process.stdout.write(r.join("\n")))
            .catch((err: Error) => process.stderr.write(err.toString()));
    } catch (exp) {
        console.error(exp.message);
    }
}

async function weatherAsync(locations: string[], apiKey: string): Promise<string[]> {
    if (locations === undefined || locations.length === 0) {
        throw Error('invalid request, missing locations');
    }

    const results = await getWeather(locations, apiKey);
    console.log(results);

    return Promise.resolve(['']);
}