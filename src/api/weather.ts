import axios, { AxiosResponse, AxiosError } from 'axios';

export interface ApiWeatherResponse {
    location: string
    success: boolean
    error?: AxiosError
    result: WeatherResponse
}

export interface WeatherResponse {
    coord: {
        lat: number
        lon: number
    }
    name: string
    main: {
        temp: number     // kelvin
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

export async function getWeather(locations: string[], apiKey: string): Promise<ApiWeatherResponse[]> {
    const promises = locations.map(
        async location => {
            const url = weatherLocationQuery(location, apiKey);
            return axios.get<WeatherResponse>(url)
                .then((r: AxiosResponse<WeatherResponse>) => {
                    return <ApiWeatherResponse>{
                        location: location,
                        success: true,
                        result: r.data,
                    }
                })
                .catch((e: AxiosError) => {
                    return <ApiWeatherResponse>{
                        location: location,
                        success: false,
                        error: e
                    }
                })
        }
    );

    const responses = await axios.all(promises);
    return responses;
}

// http://api.openweathermap.org/data/2.5/weather?q=<LOCATION>&APPID=<API_KEY>
function weatherLocationQuery(location: string, apiKey: string): string {
    return `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}`;
}
