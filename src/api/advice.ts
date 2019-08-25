import axios from 'axios';

interface Advice {
    advice: string
    slip_id: string
}
interface Slip {
    slip: Advice
}

const demo: Slip = { slip: { advice: 'test advice', slip_id: '3' } };

// https://api.adviceslip.com/advice
function getRandom(): Promise<Array<Slip>> {
    return Promise.resolve(Array(demo));
}

// https://api.adviceslip.com/advice/{id}
function getIds(ids: number[]): Promise<Array<Slip>> {
    return Promise.resolve(Array(demo));
}

// https://api.adviceslip.com/advice/search/{query}
function getQuery(query: string): Promise<Array<Slip>> {
    return Promise.resolve(Array(demo));
}

export { getRandom, getIds, getQuery, Slip };