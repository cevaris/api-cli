import axios from 'axios';

// https://api.adviceslip.com/advice
function getRandom(): Promise<Object> {
    return Promise.resolve({});
}

// https://api.adviceslip.com/advice/{id}
function getIds(ids: number[]): Promise<Object> {
    return Promise.resolve({});
}

// https://api.adviceslip.com/advice/search/{query}
function getQuery(query: string): Promise<Object> {
    return Promise.resolve({});
}

export { getRandom, getIds, getQuery };