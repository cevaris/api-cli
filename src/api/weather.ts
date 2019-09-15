import axios, { AxiosResponse, AxiosError } from 'axios';


export interface WeatherResponse {
    coord: {
        lat: number
        lon: number
    }
    name: string
    main: {
        temp: number     // kelvin
        temp_min: number // kelvin
        temp_max: number // kelvin
    }
    wind: {
        speed: number    // meter/sec
        deg: number
    }
    sys: {
        sunrise: number  // unix epoch
        sunset: number   // unix epoch
        country: string
    }
    timezone: number     // offset in seconds
    visibility: number   // meters
}

export async function getWeather(locations: string[], apiKey: string): Promise<WeatherResponse[]> {
    const promises: Promise<void | AxiosResponse<WeatherResponse>>[] = locations.map(
        async location => {
            const url = weatherLocationQuery(location, apiKey);
            return axios.get<WeatherResponse>(url)
                .catch((r: AxiosError) => console.error(`${location} not found`));
        }
    );

    const responses = await axios.all(promises);
    const results: WeatherResponse[] = responses
        .filter(x => x !== undefined)
        .map((r: (void | AxiosResponse)) => {
            if (r && r.data) {
                return r.data;
            }
        });
    return results;
}

// http://api.openweathermap.org/data/2.5/weather?q=<LOCATION>&APPID=<API_KEY>
function weatherLocationQuery(location: string, apiKey: string): string {
    return `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}`;
}

function kelvinToFahrenheit(value: number): number {
    return value * 9 / 5 - 459.67;
}

