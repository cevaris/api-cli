import axios, { AxiosResponse, AxiosError } from 'axios';

interface Advice {
    advice: string
    slip_id: string
}

interface Slip {
    slip: Advice
}

interface Slips {
    slips: Advice[]
}

interface SlipResponse {
    id: number
    success: boolean
    error?: Error
    advice: Advice
}

const ADVICE_API_RANDOM = 'https://api.adviceslip.com/advice';
const ADVICE_API_BY_ID =
    (id: number) => `https://api.adviceslip.com/advice/${id}`;
const ADVICE_API_QUERY =
    (query: string) => `https://api.adviceslip.com/advice/search/${query}`;

async function getRandom(): Promise<SlipResponse[]> {
    const response = await axios.get<Slip>(ADVICE_API_RANDOM);

    let slipResponse: SlipResponse;

    if (response.data) {
        slipResponse = <SlipResponse>{
            id: parseInt(response.data.slip.slip_id),
            success: true,
            advice: response.data.slip
        };
    } else {
        slipResponse = <SlipResponse>{
            success: false,
            error: Error(`Failed to seek Advice because ${JSON.stringify(response.data)}.`),
        };
    }

    return Array(slipResponse);
}

async function getIds(ids: number[]): Promise<SlipResponse[]> {
    const promises: Promise<SlipResponse>[] =
        ids.map(async (id) => {
            try {
                const r = await axios.get<Slip>(ADVICE_API_BY_ID(id));
                if (r.data && r.data.slip) {
                    return <SlipResponse>{
                        id: id,
                        success: true,
                        advice: r.data.slip
                    };
                }
                else {
                    return <SlipResponse>{
                        id: id,
                        success: false,
                        error: new Error(`failed to hydrate ${id}`)
                    };
                }
            } catch (e) {
                return <SlipResponse>{
                    id: id,
                    success: false,
                    error: e
                };
            }
        });

    const responses: SlipResponse[] = await axios.all(promises);
    return responses;
}

async function getQuery(query: string): Promise<SlipResponse[]> {
    const response = await axios.get<Slips>(ADVICE_API_QUERY(query));
    if (response.data.slips) {
        return response.data.slips.map(s => {
            return <SlipResponse>{
                id: parseInt(s.slip_id),
                success: true,
                advice: s
            }
        })
    } else {
        throw new Error(`Failed to search for Advice containing ${query}\n${JSON.stringify(response.data)}.`);
    }
}

export { Advice, getRandom, getIds, getQuery, Slip, SlipResponse };