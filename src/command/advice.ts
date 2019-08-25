import { getIds, getQuery, getRandom, Slip } from '../api/advice';


async function adviceAsync(ids: string[], query: string): Promise<void> {
    let promise: Promise<Array<Slip>>;
    if (ids) {
        const validIds = _validateIds(ids);
        promise = getIds(validIds);
    } else if (query) {
        promise = getQuery(query);
    } else {
        promise = getRandom();
    }

    try {
        const response: Array<Slip> = await promise;
        console.log(`Response: ${response.map(s => s.slip.advice)}`);
        return Promise.resolve();
    } catch (err) {
        return Promise.reject(err);
    }
}

function advice(ids: string[], query: string): void {
    if (ids && query) {
        throw Error('invalid request, use either query or ids');
    }

    adviceAsync(ids, query)
        .catch((err) => console.error(err));
}

function _validateIds(rawIds: string[]): number[] {
    return rawIds
        .map((id) => {
            const parsedNumber = Number(id);
            if (isNaN(parsedNumber)) {
                throw Error(`${id} is not a number`);
            } else {
                return parsedNumber;
            }
        });
}

export { advice, _validateIds };